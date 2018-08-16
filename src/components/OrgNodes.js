import React from "react";
import { AppContext } from "../app-context";
import DataGrid, {
  Column,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  Selection,
  Summary,
  TotalItem,
  FilterRow,
  Editing
} from "devextreme-react/ui/data-grid";
import notify from "devextreme/ui/notify";

const pageSizes = [10, 20, 50, 100];

class OrgNodes extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      data: [],
      nodeLevel: 0
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const path = location.pathname.split("/")[1];
    var typeId = 0;
    switch (path) {
      case "companies":
        this.setState({
          path: "Εταιρίες"
        });
        typeId = 1;
        break;
      case "services":
        this.setState({
          path: "Υπηρεσίες"
        });
        typeId = 2;
        break;
      case "programs":
        this.setState({
          path: "Προγράμματα"
        });
        typeId = 3;
        break;
      case "areas":
        this.setState({
          path: "Περιοχές"
        });
        typeId = 4;
        break;
      case "actions":
        this.setState({
          path: "Δράσεις"
        });
        typeId = 5;
        break;
      case "menu":
        this.setState({
          path: "Μενού"
        });
        typeId = 6;
        break;
      case "submenu":
        this.setState({
          path: "Υπομενού"
        });
        typeId = 7;
        break;
      default:
        break;
    }
    this.setState({ nodeLevel: typeId - 1 });
    this.getData(typeId);
  }

  getData(typeId) {
    fetch("http://localhost:5000/api/orgnodes/type/" + typeId, {
      method: "GET"
    })
      .then(res => Promise.all([res, res.json()]))
      .then(([res, json]) => {
        if (res.ok) {
          return json;
        }
        throw Error(json.Message);
      })
      .then(res => {
        this.setState({ data: res, filteredData: res });
        notify("data fetched", "sucess", 600);
      })
      .catch(e => {
        notify(e.message, "error", 600);
      });
  }

  handleUpdate(e) {
    console.log(e.data);
  }

  render() {
    return (
      <DataGrid
        allowColumnReordering={true}
        showBorders={true}
        dataSource={this.state.data}
        showRowLines={true}
        onRowUpdated={this.handleUpdate}
      >
        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Selection mode={"single"} />
        <FilterRow visible={true} />
        <Column dataField={"title"} />
        <Column dataField={"code"} />
        <Column dataField={"isActive"} />
        <Column dataField={"viewOrder"} />
        <Column dataField={"appObject"} />
        <Summary>
          <TotalItem column={"title"} summaryType={"count"} />
        </Summary>
        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={20} />
        <Editing mode="popup" allowUpdating="true" />
      </DataGrid>
    );
  }
}

export default props => (
  <AppContext.Consumer>
    {context => <OrgNodes {...props} context={context} />}
  </AppContext.Consumer>
);
