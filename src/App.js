import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { AppContext, defaultNodes } from "./app-context";
import TreeView from "devextreme-react/ui/tree-view";
import Toolbar from "devextreme-react/ui/toolbar";
import indexRoutes from "./routes.js";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.softblue.compact.css";
import notify from "devextreme/ui/notify";
import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleTreeViewSelectionChange = this.handleTreeViewSelectionChange.bind(
      this
    );
    this.state = {
      context: {
        selectedNodes: defaultNodes,
        selectNode: this.selectNode,
        showMessage: this.showMessage
      }
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/orgtreenodes/active", {
      method: "GET"
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then(res => {
        this.setState({ data: res, filteredData: res });
        notify(
          {
            message: "data fetched",
            width: 450
          },
          "success",
          600
        );
      })
      .catch(e => {
        notify(e.toString(), "error", 600);
      });
  }

  handleTreeViewSelectionChange(e) {
    const org = e.itemData;
    if (org.appObject) {
      this.props.history.push("/" + org.appObject);
    }
  }

  render() {
    const items = [
      {
        locateInMenu: "always",
        text: "Save",
        onClick: () => {
          notify("Save option has been clicked!");
        }
      },
      {
        locateInMenu: "always",
        text: "Print",
        onClick: () => {
          notify("Print option has been clicked!");
        }
      },
      {
        locateInMenu: "always",
        text: "Settings",
        onClick: () => {
          notify("Settings option has been clicked!");
        }
      }
    ];

    return (
      <AppContext.Provider value={this.state.context}>
        <div className={"topbar"}>
          <Toolbar items={items} />
        </div>
        <div className={"container"}>
          <div className={"left-content"}>
            <TreeView
              dataStructure="plain"
              dataSource={this.state.data}
              keyExpr={"id"}
              parentIdExpr={"parentId"}
              displayExpr="orgNode.title"
              selectionMode={"single"}
              selectByClick={true}
              onItemSelectionChanged={this.handleTreeViewSelectionChange}
            />
          </div>
          <div className={"right-content"}>
            <Switch>
              {indexRoutes.map((prop, key) => {
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
            </Switch>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default withRouter(App);
