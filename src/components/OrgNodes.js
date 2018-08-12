import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import EnhancedTableHead from "../shared/EnhancedTableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import ListToolBar from "../shared/ListToolBar";
import { AppContext } from "../app-context";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  flex: {
    flex: 1
  },
  table: {
    minWidth: 700
  }
});

function getSorting(order, orderBy) {
  return (a, b) => {
    if (a[orderBy] < b[orderBy]) return order === "desc" ? 1 : -1;
    if (a[orderBy] > b[orderBy]) return order === "desc" ? -1 : 1;
    else {
      if (a["id"] < b["id"]) return order === "desc" ? 1 : -1;
      if (a["id"] > b["id"]) return order === "desc" ? -1 : 1;
    }
  };
}

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
      })
      .catch(e => {
        this.props.context.showMessage("error", e.message);
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
    const { classes, context } = this.props;
    const {
      path,
      filteredData,
      order,
      orderBy,
      rowsPerPage,
      page,
      nodeLevel
    } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

    const columnData = [
      {
        id: "title",
        numeric: false,
        disablePadding: false,
        label: "Όνομα"
      },
      {
        id: "code",
        numeric: true,
        disablePadding: false,
        label: "Κωδικός"
      },
      {
        id: "isActive",
        numeric: false,
        disablePadding: false,
        label: "Ενεργή"
      },
      {
        id: "viewOrder",
        numeric: true,
        disablePadding: false,
        label: "Σειρά Εμφάνισης"
      },
      {
        id: "appObject",
        numeric: false,
        disablePadding: false,
        label: "Application Object"
      }
    ];

    return (
      <Paper className={classes.root}>
        <ListToolBar
          title={path}
          onFilter={this.handleFilter}
          onEdit={this.handleEdit}
        />
        <Table className={classes.table}>
          <EnhancedTableHead
            columnData={columnData}
            order={order}
            orderBy={orderBy}
            onRequestSort={this.handleRequestSort}
            rowCount={filteredData.length}
          />
          <TableBody>
            {filteredData
              .sort(getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(n => {
                return (
                  <TableRow
                    selected={context.selectedNodes[nodeLevel].id === n.id}
                    key={n.id}
                    onClick={e =>
                      context.selectNode(e, nodeLevel, n.id, n.title)
                    }
                  >
                    <TableCell component="th" scope="row">
                      {n.title}
                    </TableCell>
                    <TableCell>{n.code}</TableCell>
                    <TableCell>{n.isActive === true ? "ΝΑΙ" : "ΟΧΙ"}</TableCell>
                    <TableCell numeric>{n.viewOrder}</TableCell>
                    <TableCell>{n.appObject}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

OrgNodes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(props => (
  <AppContext.Consumer>
    {context => <OrgNodes {...props} context={context} />}
  </AppContext.Consumer>
));
