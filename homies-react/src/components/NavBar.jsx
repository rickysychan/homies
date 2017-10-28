import React, { Component } from 'react';
import { Link } from 'react-router';
import Cookies from 'universal-cookie';

class NavBar extends Component {

  handleClick(event){
    const cookies = new Cookies();
    alert("Logged out")
    cookies.remove('token')
    this.props.is_auth = ''
  }

  render() {
    return (
      <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">Homies</a>
      </div>

      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/discovery">Discover</Link>
          </li>
          <li>
            <Link to="/stayintheloop" >Stay in <i className="fa fa-superpowers"></i></Link>
          </li>
          <li>
            <Link to="/circles">Circles </Link>
          </li>
          <li>
            <Link to="/googleapi">Google API </Link>
          </li>
        </ul>

        <ul className="nav navbar-nav navbar-right">
          <form className="navbar-form navbar-left">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search" />
            </div>
            <button type="submit" className="btn btn-success">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </form>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
              <span className="caret"></span>
              &nbsp;&nbsp;&nbsp;
            </a>
            <ul className="dropdown-menu">
              <li>
                <a href="#">
                  <i className="fa fa-id-card-o" aria-hidden="true"></i> Profile
                </a>
              </li>
              <li role="separator" className="divider"></li>
              <li>
                <a href="/" onClick={(event) => this.handleClick(event)}>
                  <i className="fa fa-sign-out" aria-hidden="true" ></i> Log Out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    );
  }
}

export default NavBar;