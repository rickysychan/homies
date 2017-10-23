import React, { Component } from 'react';

import {Nav, Navbar, NavDropdown, NavItem, MenuItem, FormGroup, FormControl, Button} from 'react-bootstrap';
// import './styles/NavBar.css';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import FontAwesome from 'react-fontawesome';



class NavBar extends Component {

  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Homies</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <IndexLinkContainer to="/">
                <NavItem >Discover</NavItem>
              </IndexLinkContainer>
              <LinkContainer to="/stayInTheLoop">
                <NavItem >Stay in the <FontAwesome name="superpowers"/></NavItem>
              </LinkContainer>
              <LinkContainer to="/circles">
                <NavItem >Circles</NavItem>
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
                <LinkContainer to="/Login">
                  <MenuItem eventKey={4.3}>Login</MenuItem>
                </LinkContainer>
                <LinkContainer to="/Register">
                <MenuItem eventKey={4.3}>Register</MenuItem>
                </LinkContainer>
              </NavDropdown> </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
