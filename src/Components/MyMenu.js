import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'

function MyMenu(props) {
  const { user, logout } = props
  const SubMenu = Menu.SubMenu
  let userItem
  let menu1
  let menu2
  let menu3
  if (user.isAuthenticated) {
    userItem = (
      <SubMenu
        style={{ float: 'right' }}
        title={
          <span className="submenu-title-wrapper">
            <Icon type="user" />
            {user.fullname}
          </span>
        }>
        <Menu.Item key="3" onClick={logout}>
          Έξοδος
        </Menu.Item>
      </SubMenu>
    )
    menu1 = (
      <Menu.Item key="2">
        <Link to="/tree" className="nav-text">
          <Icon type="cluster" />
          Οργανόγραμμα
        </Link>
      </Menu.Item>
    )
    menu2 = (
      <Menu.Item key="4">
        <Link to="/menu" className="nav-text">
          <Icon type="bars" />
          Μενού
        </Link>
      </Menu.Item>
    )
    menu3 = (
      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="setting" />
            Διαχείρηση
          </span>
        }>
        <Menu.Item key="5">
          <Link to="/users" className="nav-text">
            <Icon type="team" />
            Χρήστες
          </Link>
        </Menu.Item>
      </SubMenu>
    )
  } else {
    userItem = (
      <Menu.Item key="3" style={{ float: 'right' }}>
        <Link to="/login" className="nav-text">
          <Icon type="user" />
          Σύνδεση
        </Link>
      </Menu.Item>
    )
    menu1 = ''
    menu2 = ''
    menu3 = ''
  }

  return (
    <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
      <Menu.Item key="1">
        <Link to="/" className="nav-text">
          <Icon type="home" />
          Home
        </Link>
      </Menu.Item>
      {menu1}
      {menu2}
      {menu3}
      {userItem}
    </Menu>
  )
}

export default MyMenu
