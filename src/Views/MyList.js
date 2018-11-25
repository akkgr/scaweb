import React from 'react'
import { withRouter } from 'react-router-dom'
import { Table } from 'antd'
import AppContext from './../app-context'

class MyList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [],
      data: []
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
        onFilter: (value, record) => record[item.key].indexOf(value) === 0,
        sorter: (a, b) => a[item.key] > b[item.key]
      }
    })

    return <Table columns={columns} dataSource={this.state.data} />
  }
}

export default withRouter(MyList)
MyList.contextType = AppContext
