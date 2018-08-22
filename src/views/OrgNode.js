import React from "react";
import Form from "devextreme-react/ui/form";
import notify from "devextreme/ui/notify";

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
        notify(e.message, "error", 600);
      });
  }

  render() {
    return <Form formData={this.state.data} items={formItems} />;
  }
}

export default OrgNode;
