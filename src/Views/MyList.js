import React from 'react'
import { withRouter } from 'react-router-dom'
import { Table, Button, Input } from 'antd'
import AppContext from './../app-context'
import './MyList.css'

class MyList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [],
      data: [],
      selectedRow: {},
      selectedIndex: ''
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
        <div className="toolBar">
          <Input.Search />
          <Button
            shape="circle"
            icon="plus"
            style={{ color: 'green' }}
            disabled={this.state.selectedIndex.length === 0}
          />
          <Button
            shape="circle"
            icon="edit"
            style={{ color: 'blue' }}
            disabled={this.state.selectedIndex.length === 0}
          />
          <Button
            shape="circle"
            icon="minus"
            style={{ color: 'red' }}
            disabled={this.state.selectedIndex.length === 0}
          />
        </div>
        <Table
          size="small"
          rowKey="_id"
          columns={columns}
          dataSource={this.state.data}
          rowClassName={(record, index) =>
            index === this.state.selectedIndex ? 'selected' : ''
          }
          onRow={(selectedRow, selectedIndex) => {
            return {
              onClick: () => {
                this.setState({ selectedRow, selectedIndex })
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
