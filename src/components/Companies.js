import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ListToolBar from "../shared/list-toolbar";
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

class Companies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getStations();
  }

  getStations() {
    fetch("API URL", {
      method: "GET" // POST
    })
      .then(res => res.json())
      .then(res => this.setState({ data: res.stations }))
      .catch(e => {});
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;

    return (
      <AppContext.Consumer>
        {context => (
          <Paper className={classes.root}>
            <ListToolBar title="Εταιρίες" />
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Όνομα</TableCell>
                  <TableCell>Κωδικός</TableCell>
                  <TableCell>Ενεργή</TableCell>
                  <TableCell numeric>Σειρά Εμφάνισης</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(n => {
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

Companies.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Companies);
