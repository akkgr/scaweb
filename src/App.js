import React from 'react'

import { AppContext, defaultNodes } from './app-context'
import './app.css'

import { Layout, Breadcrumb } from 'antd'
import MyHeader from './Components/MyHeader'
import MyMenu from './Components/MyMenu'

const { Content, Sider } = Layout

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      context: {
        selectedNodes: defaultNodes,
        selectNode: this.selectNode,
        showMessage: this.showMessage
      }
    }
  }

  selectNode(e, index, id, title) {
    const nodes = [...this.state.context.selectedNodes]
    nodes[index].id = id
    nodes[index].title = title
    this.setState({
      context: {
        selectedNodes: nodes,
        selectNode: this.selectNode
      }
    })
  }

  showMessage(variant, body) {
    this.setState({
      message: {
        open: true,
        variant: variant,
        body: body
      }
    })
  }

  render() {
    return (
      <AppContext.Provider value={this.state.context}>
        <Layout>
          <MyHeader />
          <Layout>
            <Sider className="sider">
              <MyMenu />
            </Sider>
            <Layout className="main">
              <Breadcrumb className="bctop">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content className="content">Content</Content>
            </Layout>
          </Layout>
        </Layout>
      </AppContext.Provider>
    )
  }
}

export default App
