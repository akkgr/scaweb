import React from 'react'
import { Switch, Route, Link, withRouter } from 'react-router-dom'
import AppContext from './app-context'
import './app.css'
import { Layout, Menu, Breadcrumb, Icon, Spin, notification } from 'antd'
import OrgTreeNodes from './Views/OrgTreeNodes'

const { Header, Content, Footer } = Layout

class App extends React.Component {
  constructor(props) {
    super(props)
    this.selectNode = this.selectNode.bind(this)
    this.showMessage = this.showMessage.bind(this)
    this.showLoading = this.showLoading.bind(this)
    this.state = {
      loading: false,
      context: {
        user: {},
        selectedNodes: [],
        selectNode: this.selectNode,
        showMessage: this.showMessage,
        showLoading: this.showLoading
      }
    }
  }

  selectNode(nodes) {
    this.setState({
      context: {
        user: {},
        selectedNodes: nodes,
        selectNode: this.selectNode,
        showMessage: this.showMessage,
        showLoading: this.showLoading
      }
    })
    if (nodes[0] && nodes[0].appObject) {
      this.props.history.push(nodes[0].appObject)
    }
  }

  showMessage(type, message, description) {
    notification[type]({
      message: message,
      description: description
    })
  }

  showLoading(b) {
    this.setState({
      loading: b
    })
  }

  render() {
    return (
      <AppContext.Provider value={this.state.context}>
        <Layout className="layout">
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}>
              <Menu.Item key="1">
                <Link to="/" className="nav-text">
                  <Icon type="home" />
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              {this.state.context.selectedNodes.reverse().map(item => {
                return (
                  <Breadcrumb.Item key={item.id}>
                    {item.node.title}
                  </Breadcrumb.Item>
                )
              })}
            </Breadcrumb>
            <Spin spinning={this.state.loading} size="large">
              <div style={{ background: '#fff', padding: 24, minHeight: 480 }}>
                <Switch>
                  <Route path="/" component={OrgTreeNodes} />
                </Switch>
              </div>
            </Spin>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Social Care Actions ©2018 Created by Cinnamon
          </Footer>
        </Layout>
      </AppContext.Provider>
    )
  }
}

export default withRouter(App)
