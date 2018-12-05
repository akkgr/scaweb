import React from 'react'
import { withRouter } from 'react-router-dom'
import { Table, Button, Input, Form } from 'antd'
import AppContext from './../app-context'
import './MyList.css'

class MyList extends React.Component {
  constructor(props) {
    super(props)
    this.handleEdit = this.handleEdit.bind(this)
    this.state = {
      columns: [],
      data: [],
      selectedId: ''
    }
  }

  componentDidMount() {
    this.context.showLoading(true)
    const url =
      process.env.REACT_APP_API_URL + '/' + this.props.match.params.obj
    fetch(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + this.context.user.token
      }
    })
      .then(response => Promise.all([response, response.json()]))
      .then(([response, json]) => {
        this.context.showLoading(false)
        if (!response.ok) {
          throw new Error(json.message)
        }
        this.setState({
          columns: json.columns,
          data: json.data
        })
      })
      .catch(exception => {
        this.context.showLoading(false)
        this.context.showMessage('error', 'sca', exception.message)
      })
  }

  handleEdit() {
    const url = '/' + this.props.match.params.obj + '/' + this.state.selectedId
    this.props.history.push(url)
  }

  render() {
    const columns = this.state.columns.map(item => {
      return {
        title: item.title,
        dataIndex: item.key,
        filters: [],
        onFilter: (value, record) => record[item.key].indexOf(value) === 0,
        sorter: (a, b) => a[item.key] > b[item.key]
      }
    })

    return (
      <>
        <Form layout="inline">
          <Form.Item>
            <Input.Search style={{ width: window.innerWidth - 230 }} />
          </Form.Item>
          <Form.Item>
            <Button shape="circle" icon="plus" style={{ color: 'green' }} />
          </Form.Item>
          <Form.Item>
            <Button
              shape="circle"
              icon="edit"
              style={{ color: 'blue' }}
              disabled={this.state.selectedId.length === 0}
              onClick={this.handleEdit}
            />
          </Form.Item>
          <Form.Item>
            <Button
              shape="circle"
              icon="minus"
              style={{ color: 'red' }}
              disabled={this.state.selectedId.length === 0}
            />
          </Form.Item>
        </Form>
        <Table
          size="small"
          rowKey="_id"
          columns={columns}
          dataSource={this.state.data}
          rowClassName={(record, index) =>
            record._id === this.state.selectedId ? 'selected' : ''
          }
          onRow={(selectedRow, selectedIndex) => {
            return {
              onClick: () => {
                this.setState({ selectedId: selectedRow._id })
              }
            }
          }}
        />
      </>
    )
  }
}

export default withRouter(MyList)
MyList.contextType = AppContext
