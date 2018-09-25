import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { AppContext, defaultNodes } from './app-context'
import TreeView from 'devextreme-react/ui/tree-view'
import indexRoutes from './routes.js'
import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.softblue.compact.css'
import notify from 'devextreme/ui/notify'
import './app.css'
import TopBar from './components/TopBar'
import PrivateRoute from './components/PrivateRoute'
import Login from './views/Login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleTreeViewSelectionChange = this.handleTreeViewSelectionChange.bind(
      this
    )
    this.state = {
      context: {
        selectedNodes: defaultNodes,
        selectNode: this.selectNode,
        showMessage: this.showMessage
      }
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/orgtreenodes/active', {
      method: 'GET'
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText)
        } else {
          return res.json()
        }
      })
      .then(res => {
        this.setState({ data: res, filteredData: res })
        notify(
          {
            message: 'data fetched',
            width: 450
          },
          'success',
          600
        )
      })
      .catch(e => {
        notify(e.toString(), 'error', 600)
      })
  }

  handleTreeViewSelectionChange(e) {
    const org = e.itemData
    if (org.appObject) {
      this.props.history.push('/' + org.appObject)
    }
  }

  render() {
    return (
      <AppContext.Provider value={this.state.context}>
        <div className={'topbar'}>
          <TopBar />
        </div>
        <div className={'container'}>
          <div className={'left-content'}>
            <TreeView
              dataStructure="plain"
              dataSource={this.state.data}
              keyExpr={'id'}
              parentIdExpr={'parentId'}
              displayExpr="title"
              selectionMode={'single'}
              selectByClick={true}
              onItemSelectionChanged={this.handleTreeViewSelectionChange}
              searchEnabled={true}
              searchMode="contains"
            />
          </div>
          <div className={'right-content'}>
            <Switch>
              <Route path="/login" component={Login} />
              {indexRoutes.map((prop, key) => {
                return (
                  <PrivateRoute
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              })}
            </Switch>
          </div>
        </div>
      </AppContext.Provider>
    )
  }
}

export default withRouter(App)
