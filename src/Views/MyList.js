import React from 'react'
import { withRouter } from 'react-router-dom'
import { Table } from 'antd'

function MyList({ match }) {
  return <div>{match.params.obj}</div>
}

export default withRouter(MyList)
