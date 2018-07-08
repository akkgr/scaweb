import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import EnhancedTableHead from "../shared/EnhancedTableHead";
import TableRow from "@material-ui/core/TableRow";
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
  return order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

class OrgNode extends React.Component {
  constructor(props) {
    super(props);
    this.getStations = this.getData.bind(this);
    this.state = {
      order: "asc",
      orderBy: "viewOrder",
      data: []
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
    this.getData(typeId);
  }

  getData(typeId) {
    fetch("http://localhost:16726/api/orgnodes/type/" + typeId, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => this.setState({ data: res }))
      .catch(e => {});
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  render() {
    const { classes } = this.props;
    const { path, data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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
      <AppContext.Consumer>
        {context => (
          <Paper className={classes.root}>
            <ListToolBar title={path} />
            <Table className={classes.table}>
              <EnhancedTableHead
                columnData={columnData}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              {/* <TableHead>
                <TableRow>
                  <TableCell>Όνομα</TableCell>
                  <TableCell>Κωδικός</TableCell>
                  <TableCell>Ενεργή</TableCell>
                  <TableCell numeric>Σειρά Εμφάνισης</TableCell>
                  <TableCell>Application Object</TableCell>
                </TableRow>
              </TableHead> */}
              <TableBody>
                {data.sort(getSorting(order, orderBy)).map(n => {
                  return (
                    <TableRow
                      selected={context.selectedNodes[0].id === n.id}
                      key={n.id}
                      onClick={e => context.selectNode(e, 0, n.id, n.title)}
                    >
                      <TableCell component="th" scope="row">
                        {n.title}
                      </TableCell>
                      <TableCell>{n.code}</TableCell>
                      <TableCell>
                        {n.isActive === true ? "ΝΑΙ" : "ΟΧΙ"}
                      </TableCell>
                      <TableCell numeric>{n.viewOrder}</TableCell>
                      <TableCell>{n.appObject}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        )}
      </AppContext.Consumer>
    );
  }
}

OrgNode.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OrgNode);
