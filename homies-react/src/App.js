import React, { Component } from 'react';
// import logo from './logo.svg';
// import {Nav, Navbar, NavDropdown, NavItem, MenuItem} from 'react-bootstrap';

import './App.css';
import NavBar from './NavBar';
import ArticlesContainer from './components/ArticlesContainer'



class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <ArticlesContainer />

      </div>
    );
  }
}

export default App;
