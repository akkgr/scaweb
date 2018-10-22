import React from 'react'
import AppContext from '../app-context'
import { Tree } from 'antd'

class OrgTreeNodes extends React.Component {
  constructor(props) {
    super(props)
    this.nodeSelected = this.nodeSelected.bind(this)
    this.state = {
      data: [],
      roots: []
    }
  }

  componentDidMount() {
    this.props.context.showLoading(true)
    fetch('http://localhost:5000/api/orgtreenodes/active', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
      .then(response => Promise.all([response, response.json()]))
      .then(([response, json]) => {
        this.props.context.showLoading(false)
        if (!response.ok) {
          throw new Error(json.message)
        }
        this.setState({
          data: json,
          roots: json.filter(n => n.parentId === null)
        })
      })
      .catch(exception => {
        this.props.context.showLoading(false)
        console.log(exception.message)
      })
  }

  nodeSelected(selectedKeys, { selected, node }) {
    const nodes = []
    if (node.isLeaf() && selected) {
      const id = parseInt(selectedKeys[0])

      const findNode = id =>
        this.state.data.find(n => {
          return n.id === id
        })

      let appLink = findNode(id)

      do {
        nodes.push(appLink)
        appLink = findNode(appLink.parentId)
      } while (appLink)

      this.props.context.selectNode(nodes)
    }
  }

  render() {
    const loop = data =>
      data.map(item => {
        const nodes = this.state.data.filter(n => n.parentId === item.id)
        if (nodes && nodes.length) {
          return (
            <Tree.TreeNode key={item.id} title={item.node.title}>
              {loop(nodes)}
            </Tree.TreeNode>
          )
        }
        return <Tree.TreeNode key={item.id} title={item.node.title} isLeaf />
      })
    return <Tree onSelect={this.nodeSelected}>{loop(this.state.roots)}</Tree>
  }
}

export default props => (
  <AppContext.Consumer>
    {ctx => <OrgTreeNodes {...props} context={ctx} />}
  </AppContext.Consumer>
)
