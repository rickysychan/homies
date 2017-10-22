import React, { Component } from 'react';
// import logo from './logo.svg';
// import {Nav, Navbar, NavDropdown, NavItem, MenuItem} from 'react-bootstrap';

import './styles/App.css';
import NavBar from './NavBar';
import SideBarMenu from './SideBarMenu';
import Main from './main'



class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="page-container">
          <NavBar />

          <div class="container-fluid">

              <SideBarMenu />

            <div class="col-xs-12 col-sm-9" data-spy="scroll" data-target="#sidebar-nav">
                <Main class="text-center"/>
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default App;
