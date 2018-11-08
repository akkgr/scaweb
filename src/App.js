import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import AppContext from './app-context'
import './app.css'
import { Layout, Spin, notification } from 'antd'
import OrgTreeNodes from './Views/OrgTreeNodes'
import PrivateRoute from './Components/PrivateRouter'
import Login from './Views/Login'
import MyMenu from './Components/MyMenu'
import MyBreadcrumb from './Components/MyBreadcrumb'

const jwtDecode = require('jwt-decode')
const { Header, Content, Footer } = Layout

class App extends React.Component {
  constructor(props) {
    super(props)
    this.selectNode = this.selectNode.bind(this)
    this.showMessage = this.showMessage.bind(this)
    this.showLoading = this.showLoading.bind(this)
    this.logout = this.logout.bind(this)
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

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = jwtDecode(token)
      this.setState(prevState => ({
        context: {
          ...prevState.context,
          user: {
            isAuthenticated: true,
            token: token,
            ...decoded
          }
        }
      }))
    }
  }

  selectNode(nodes) {
    this.setState(prevState => ({
      context: {
        ...prevState.context,
        selectedNodes: nodes
      }
    }))
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

  logout() {
    this.setState(
      prevState => ({
        context: {
          ...prevState.context,
          user: {
            isAuthenticated: false
          }
        }
      }),
      () => localStorage.removeItem('token')
    )
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
            <MyMenu user={this.state.context.user} logout={this.logout} />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <MyBreadcrumb context={this.state.context} />
            <Spin spinning={this.state.loading} size="large">
              <div style={{ background: '#fff', padding: 24, minHeight: 480 }}>
                <Switch>
                  <PrivateRoute
                    path="/tree"
                    isAuthenticated={this.state.context.user.isAuthenticated}
                    component={OrgTreeNodes}
                  />
                  <Route path="/login" component={Login} />
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
