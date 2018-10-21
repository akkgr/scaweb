import React from 'react'

import { Layout, Menu } from 'antd'

const { Header } = Layout

class MyHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          className="myheader">
          <Menu.Item key="1" className="logo">
            SCA
          </Menu.Item>
          <Menu.Item key="2">nav 1</Menu.Item>
          <Menu.Item key="3">nav 2</Menu.Item>
          <Menu.Item key="4" style={{ float: 'right' }}>
            User
          </Menu.Item>
        </Menu>
      </Header>
    )
  }
}

export default MyHeader
