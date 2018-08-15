import React, { Component } from "react";
import { withRouter } from "react-router";
import Form from "devextreme-react/ui/form";
import notify from "devextreme/ui/notify";
import auth from "../auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.state = { username: "username", password: "password" };
  }

  handleChange(event) {
    const value = event.value;
    const name = event.dataField;

    this.setState({
      [name]: value
    });
  }

  login() {
    if (!this.state.username || !this.state.password) {
      notify("Πρέπει να σημπληρώσετε username & password", "error", 600);
      return;
    }

    fetch("http://localhost:5000/api/orgtreenodes/active", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then(data => {
        auth.authenticateUser(data.data);
        var usertoken = auth.decodeToken(data.data.token);
        this.props.setUser({
          id: usertoken._id,
          fullName: usertoken.username,
          node: {
            id: "",
            title: ""
          }
        });
        this.props.history.push("/");
      })
      .catch(e => {
        notify(e.toString(), "error", 600);
      });
  }

  render() {
    const formItems = [
      {
        itemType: "group",
        cssClass: "form",
        colCount: 1,
        items: [
          {
            dataField: "username"
          },
          {
            dataField: "password"
          }
        ]
      },
      {
        itemType: "group",
        cssClass: "form",
        colCount: 1,
        items: [
          {
            itemType: "button",
            horizontalAlignment: "right",
            buttonOptions: {
              text: "Register",
              type: "success",
              onClick: this.login
            }
          }
        ]
      }
    ];

    return (
      <Form
        formData={this.state}
        items={formItems}
        onFieldDataChanged={this.handleChange}
      />
    );
  }
}

export default withRouter(Login);
