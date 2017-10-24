import React, { Component } from 'react';

class SideBar extends Component {

  render() {
    return (
        <div className="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
          <div className="affix-top" data-spy="affix" data-offset-top="45" data-offset-bottom="90">
            <ul className="nav" id="sidebar-nav">
              <li><a href="#">Home</a></li>
              <li><a href="#section1">Section 1</a></li>
              <li><a href="#section2">Section 2</a></li>
              <li><a href="#section3">Section 3</a></li>
              <li><a href="http://usebootstrap.com/theme/holo" target="ext">Holo Theme</a></li>
            </ul>
          </div>
        </div>
    );
  }
}

export default SideBar;