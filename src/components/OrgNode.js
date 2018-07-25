import React from "react";
import Form from "devextreme-react/ui/form";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.teal.light.css";
import "./OrgNode.css";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  }
});

const formItems = [
  {
    itemType: "group",
    cssClass: "form",
    colCount: 1,
    items: [
      {
        dataField: "title"
      },
      {
        dataField: "code"
      },
      {
        dataField: "isActive",
        editorType: "dxCheckBox"
      },
      {
        dataField: "viewOrder"
      },
      {
        dataField: "appObject"
      }
    ]
  }
];

class OrgNode extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.getData(params.id);
  }

  getData(id) {
    fetch("http://localhost:5000/api/orgnodes/" + id, {
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
        this.setState({ data: res });
      })
      .catch(e => {
        this.props.context.showMessage("error", e.toString());
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Form formData={this.state.data} items={formItems} />
      </Paper>
    );
  }
}

export default withStyles(styles)(OrgNode);
