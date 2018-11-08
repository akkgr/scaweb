import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import AppContext from './../app-context'

const jwtDecode = require('jwt-decode')
const FormItem = Form.Item
const url = 'http://localhost:5000/api/token'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class LoginForm extends React.Component {
  static contextType = AppContext

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.context.showLoading(true)
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: values.userName,
            password: values.password
          })
        })
          .then(response => Promise.all([response, response.json()]))
          .then(([response, json]) => {
            if (!response.ok) {
              throw new Error(json.error || json.message)
            }
            this.context.showLoading(false)
            localStorage.setItem('token', json.token)
            const decoded = jwtDecode(json.token)
            this.context.user = {
              isAuthenticated: true,
              token: json.token,
              ...decoded
            }
            let { from } = this.props.location.state || {
              from: { pathname: '/' }
            }
            this.props.history.push(from)
          })
          .catch(exception => {
            this.context.showLoading(false)
            this.context.showMessage('error', 'sca', exception.message)
          })
      }
    })
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form

    // Only show error after a field is touched.
    const userNameError =
      isFieldTouched('userName') && getFieldError('userName')
    const passwordError =
      isFieldTouched('password') && getFieldError('password')
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}>
            Log in
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const Login = Form.create()(LoginForm)
export default Login
