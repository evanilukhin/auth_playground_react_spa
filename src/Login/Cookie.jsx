import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Cookie.css";
import axios from 'axios';
const apiUrl = 'http://localhost:3001/api/cookie/'
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.login.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const authUrl = apiUrl + 'login'
    let payload = {
      'data': {
        'login': this.state.login,
        'password': this.state.password
      }
    }

    let headers = {
      'Content-Type': 'application/json'
    };

    fetch(authUrl, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: headers,
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(payload),
      credentials: 'include'
    })
    .then(function (response) {
      console.log(response);
    });
  }

  render() {
    let username_url = apiUrl + "username";
    let name;
    fetch(username_url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      referrer: 'no-referrer',
      credentials: 'include'
    })
    .then(function (response) {
      name = response.body['name']
    });
    return (
      <div className="Login">
        Cookie
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="login" bsSize="large">
            <FormLabel>Login</FormLabel>
            <FormControl
              autoFocus
              value={this.state.login}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login Cookie
          </Button>
        </form>
      </div>
    );
  }
}
