import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import AppContext from './app-context'
import './app.css'
import { Layout, Spin, notification } from 'antd'
import Nodes from './Views/Nodes'
import PrivateRoute from './Components/PrivateRouter'
import Login from './Views/Login'
import MyMenu from './Components/MyMenu'
import MyBreadcrumb from './Components/MyBreadcrumb'
import Menu from './Views/Menu'
import Main from './Views/Main'
import MyList from './Views/MyList'
import MyForm from './Views/MyForm'

const jwtDecode = require('jwt-decode')
const { Header, Content } = Layout

class App extends React.Component {
  constructor(props) {
    super(props)
    this.selectNode = this.selectNode.bind(this)
    this.showMessage = this.showMessage.bind(this)
    this.showLoading = this.showLoading.bind(this)
    this.logout = this.logout.bind(this)

    const token = localStorage.getItem('token')
    const path = localStorage.getItem('nodes')
    let user = {}
    let nodes = []

    if (token) {
      const decoded = jwtDecode(token)
      if (decoded.exp < new Date().valueOf() / 1000) {
        localStorage.removeItem('token')
        localStorage.removeItem('nodes')
      } else {
        user = {
          isAuthenticated: true,
          token: token,
          ...decoded
        }
      }
    }

    if (path) {
      nodes = JSON.parse(path)
    }

    this.state = {
      loading: false,
      context: {
        user: user,
        selectedNodes: nodes,
        selectNode: this.selectNode,
        showMessage: this.showMessage,
        showLoading: this.showLoading
      }
    }
  }

  selectNode(nodes) {
    localStorage.setItem('nodes', JSON.stringify(nodes))
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
          selectedNodes: [],
          user: {
            isAuthenticated: false
          }
        }
      }),
      () => {
        localStorage.removeItem('token')
        localStorage.removeItem('nodes')
      }
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
          <Content style={{ padding: '20px 20px' }}>
            <Spin spinning={this.state.loading} size="large">
              <div
                style={{
                  background: '#fff',
                  padding: 14,
                  height: window.innerHeight - 170,
                  overflowY: 'scroll'
                }}>
                <Switch>
                  <Route path="/login" component={Login} />
                  <PrivateRoute
                    path="/tree"
                    isAuthenticated={this.state.context.user.isAuthenticated}
                    component={Nodes}
                  />
                  <PrivateRoute
                    path="/menu"
                    isAuthenticated={this.state.context.user.isAuthenticated}
                    component={Menu}
                  />
                  <PrivateRoute
                    exact
                    path="/:obj"
                    isAuthenticated={this.state.context.user.isAuthenticated}
                    component={MyList}
                  />
                  <PrivateRoute
                    path="/:obj/:id"
                    isAuthenticated={this.state.context.user.isAuthenticated}
                    component={MyForm}
                  />
                  <Route path="/" component={Main} />
                </Switch>
              </div>
            </Spin>
          </Content>
          <MyBreadcrumb context={this.state.context} />
        </Layout>
      </AppContext.Provider>
    )
  }
}

export default withRouter(App)
