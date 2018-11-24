import React from 'react'
import { withRouter } from 'react-router-dom'
import { Table } from 'antd'

function MyList({ match }) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length
    }
  ]

  const data = []

  const onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter)
  }

  return <Table columns={columns} dataSource={data} onChange={onChange} />
}

export default withRouter(MyList)
