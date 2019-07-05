import React from 'react';
import './App.css';
import LoginCookie from './Login/Cookie'
import LoginJwt from './Login/Jwt'
import LoginJwtCookies from './Login/JwtCookies'
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <LoginCookie />
      <LoginJwt/>
      <LoginJwtCookies />
    </div>
  );
}

export default App;
