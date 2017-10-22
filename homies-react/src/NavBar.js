import React, { Component } from 'react';

import {Nav, Navbar, NavDropdown, NavItem, MenuItem, FormGroup, FormControl, Button} from 'react-bootstrap';
import './styles/NavBar.css';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from 'react-fontawesome';


class NavBar extends Component {


  handleClick = (e) => {
    // e.preventDefault();
    console.log('The link was clicked.');
  };

  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Homies</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
            <LinkContainer to="/">
              <NavItem eventKey={1}>Discover</NavItem>
            </LinkContainer>
            <LinkContainer to="/stayInTheLoop">
              <NavItem eventKey={2}>Stay in the <FontAwesome name="superpowers"/></NavItem>
            </LinkContainer>
            <LinkContainer to="/circles">
              <NavItem eventKey={3}>Circles</NavItem>
            </LinkContainer>
            </Nav>
            <Nav pullRight>
              <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" />
              </FormGroup>
                {' '}
                <Button type="submit" bsStyle="success">Search</Button>
              </Navbar.Form>
              <NavDropdown eventKey={4} title="User" id="basic-nav-dropdown">
                <MenuItem eventKey={4.1}>Profile</MenuItem>
                <MenuItem eventKey={4.2}>Cicles</MenuItem>
                <MenuItem eventKey={4.3}>Favorite</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={4.3}>LogOut</MenuItem>
              </NavDropdown> </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
