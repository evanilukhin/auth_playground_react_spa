import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Jwt.css";

const apiUrl = "http://localhost:3001/api/jwt/"

export default class Jwt extends Component {
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
    const authUrl = apiUrl + "user_token"

    let headers = {
      'Content-Type': 'application/json'
    };

    let payload = {
      'auth': {
        'login': this.state.login,
        'password': this.state.password
      }
    };

    fetch(authUrl, {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(payload),
      credentials: 'include'
    })
    .then(function (response) {
      console.log(response);
      localStorage.setItem('jwt', response.data['jwt'])
    });
  }

  render() {
    let username_url = apiUrl + "username";
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    };

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
      console.log(response);
    });

    return (
      <div className="Login">
        Jwt
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="login">
            <FormLabel>Login</FormLabel>
            <FormControl
              autoFocus
              value={this.state.login}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password">
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
            Login Jwt
          </Button>
        </form>
      </div>
    );
  }
}
