import React from 'react'
import { withRouter } from 'react-router-dom'

import AppContext from './../app-context'

class MyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: [],
      data: []
    }
  }

  componentDidMount() {
    this.context.showLoading(true)
    const url =
      process.env.REACT_APP_API_URL +
      '/' +
      this.props.match.params.obj +
      '/' +
      this.props.match.params.id
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
          fields: json.fields,
          data: json.data
        })
      })
      .catch(exception => {
        this.context.showLoading(false)
        this.context.showMessage('error', 'sca', exception.message)
      })
  }

  render() {
    const { match } = this.props
    return <div>{match.params.obj}</div>
  }
}

export default withRouter(MyForm)
MyForm.contextType = AppContext
