import React from "react";
import { AppContext } from "../app-context";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  Selection
} from "devextreme-react/ui/data-grid";
import notify from "devextreme/ui/notify";

const pageSizes = [10, 25, 50, 100];

class OrgNodes extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {
      order: "asc",
      orderBy: "viewOrder",
      data: [],
      filteredData: [],
      page: 0,
      rowsPerPage: 10,
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

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleFilter = value => {
    var newData = this.state.data.filter(row => {
      return (
        row.code.toLowerCase().includes(value.toLowerCase()) ||
        row.title.toLowerCase().includes(value.toLowerCase()) ||
        row.appObject.toLowerCase().includes(value.toLowerCase())
      );
    });
    this.setState({ filteredData: newData });
  };

  handleEdit = e => {
    const { history, context } = this.props;
    const { nodeLevel } = this.state;
    history.push("/orgnode/" + context.selectedNodes[nodeLevel].id);
  };

  render() {
    return (
      <DataGrid
        allowColumnReordering={true}
        showBorders={true}
        dataSource={this.state.data}
      >
        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Grouping />
        <Selection mode={"multiple"} />

        <Column dataField={"title"} />
        <Column dataField={"code"} />
        <Column dataField={"isActive"} />
        <Column dataField={"viewOrder"} />
        <Column dataField={"appObject"} />

        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={10} />
      </DataGrid>
    );
  }
}

export default props => (
  <AppContext.Consumer>
    {context => <OrgNodes {...props} context={context} />}
  </AppContext.Consumer>
);
