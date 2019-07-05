import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./JwtCookies.css";

const apiUrl = "http://localhost:3001/api/jwt_cookies/"

export default class JwtCookies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      name: null
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
      cache: 'no-cache',
      headers: headers,
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(payload),
      credentials: 'include'
    });
  }

  render() {
    let username_url = apiUrl + "name";
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    if(this.state.name === null) {
      fetch(username_url, {
        method: 'GET',
        mode: 'cors',
        headers: headers,
        cache: 'no-cache',
        redirect: 'follow',
        referrer: 'no-referrer',
        credentials: 'include'
      })
      .then(function (response) {
        return response.json();
      })
      .then(myJson => {
        this.setState({name: myJson['name']});
      });
    };

    return (
      <div className="Login">
        Jwt Cookies
        <p> Your name: {this.state.name}</p>
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
            disabled={!this.validateForm()}
            type="submit"
          >
            Login Jwt Cookies
          </Button>
        </form>
      </div>
    );
  }
}
