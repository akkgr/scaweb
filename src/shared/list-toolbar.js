import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const styles = theme => ({
  flex: {
    flex: 1
  }
});

function ListToolBar(props) {
  const { classes } = props;
  return (
    <Toolbar>
      <TextField
        className={classes.flex}
        label="Αναζήτηση"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      <IconButton className={classes.button} aria-label="Add">
        <AddIcon />
      </IconButton>
      <IconButton className={classes.button} aria-label="Edit">
        <EditIcon />
      </IconButton>
      <IconButton className={classes.button} aria-label="Delete">
        <DeleteIcon />
      </IconButton>
      <IconButton className={classes.button} aria-label="Delete">
        <RefreshIcon />
      </IconButton>
    </Toolbar>
  );
}

ListToolBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListToolBar);
