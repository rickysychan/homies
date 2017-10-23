import React, { Component } from 'react';
// import logo from './logo.svg';
// import {Nav, Navbar, NavDropdown, NavItem, MenuItem} from 'react-bootstrap';

import './styles/App.css';
import NavBar from './NavBar';
import Main from './main'



class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="page-container">
          <NavBar />

          <Main class="text-center"/>

        </div>
      </div>
    );
  }
}

export default App;
