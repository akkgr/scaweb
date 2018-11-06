import React from 'react'
import AppContext from '../app-context'
import { Tree, Input } from 'antd'

const TreeNode = Tree.TreeNode
const Search = Input.Search

const stringSimplify = value => {
  if (value) {
    value = value.toLowerCase()
    value = value.split('ά').join('α')
    value = value.split('έ').join('ε')
    value = value.split('ό').join('ο')
    value = value.split('ή').join('η')
    value = value.split('ί').join('ι')
    value = value.split('ύ').join('υ')
    value = value.split('ώ').join('ω')
    value = value.split('ς').join('σ')
  }
  return value
}

class OrgTreeNodes extends React.Component {
  constructor(props) {
    super(props)
    this.nodeSelected = this.nodeSelected.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onExpand = this.onExpand.bind(this)
    this.state = {
      data: [],
      roots: [],
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true
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
        this.props.context.showMessage('error', 'sca', exception.message)
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

  onChange(value) {
    value = stringSimplify(value)
    const expandedKeys = this.state.data
      .map(item => {
        const title = stringSimplify(item.node.title)
        if (title.indexOf(value) > -1) {
          return item.id.toString()
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    })
  }

  onExpand(expandedKeys) {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }

  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state
    const loop = data =>
      data.map(item => {
        const index = stringSimplify(item.node.title).indexOf(searchValue)
        const beforeStr = item.node.title.substr(0, index)
        const str = item.node.title.substr(index, searchValue.length)
        const afterStr = item.node.title.substr(index + searchValue.length)
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{str}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.node.title}</span>
          )
        const nodes = this.state.data.filter(n => n.parentId === item.id)
        if (nodes && nodes.length) {
          return (
            <TreeNode key={item.id} title={title}>
              {loop(nodes)}
            </TreeNode>
          )
        }
        return <TreeNode key={item.id} title={title} isLeaf />
      })
    return (
      <>
        <Search
          style={{ marginBottom: 8 }}
          placeholder="Search"
          enterButton
          onSearch={this.onChange}
        />
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onSelect={this.nodeSelected}>
          {loop(this.state.roots)}
        </Tree>
      </>
    )
  }
}

export default props => (
  <AppContext.Consumer>
    {ctx => <OrgTreeNodes {...props} context={ctx} />}
  </AppContext.Consumer>
)
