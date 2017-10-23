import React, { Component } from 'react';

// import styles from './styles/sideBarMenu.css';
// import {Nav, NavItem, Navbar, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';

class SideBarMenu extends Component {

    render() {
        return (
        <div className="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
          <div data-spy="affix" data-offset-top="45" data-offset-bottom="90">
            <ul className="nav" id="sidebar-nav">
                <li><a href="/">Section 1</a></li>
                <li><a href="/">Section 2</a></li>
                <li className="dropdown">
                    <a href="/" className="dropdown-toggle" data-toggle="dropdown">Dropdown <b className="caret"></b></a>
                    <ul className="dropdown-menu">
                        <li>
                            <a href="/">Action</a>
                        </li>
                        <li>
                            <a href="/">Another action</a>
                        </li>
                        <li>
                            <a href="/">Something else here</a>
                        </li>
                        <li className="divider"></li>
                        <li className="nav-header">
                            Nav header
                        </li>
                        <li>
                            <a href="/">Separated link</a>
                        </li>
                        <li>
                            <a href="/">One more separated link</a>
                        </li>
                    </ul>
                </li>
                <li><a href="/">Section 3</a></li>
                <li><a href="/">Holo Theme</a></li>
            </ul>
           </div>
        </div>
         );
    }
}

export default SideBarMenu;
