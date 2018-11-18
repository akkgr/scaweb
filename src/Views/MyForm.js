import React from 'react'
import { withRouter } from 'react-router-dom'

function MyForm({ match }) {
  return <div>{match.params.obj}</div>
}

export default withRouter(MyForm)
