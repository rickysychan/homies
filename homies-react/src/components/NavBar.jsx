  import React, { Component } from 'react';
import { Link } from 'react-router';
import history from '../index.jsx';
import Cookies from 'universal-cookie';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (window.location.pathname == "/search") {
      this.props.searchOnPage(this.state.value)
    }
    history.push({
      pathname: '/search',
      state: { query: this.state.value } }
    )
  }

  handleClick(event){
    const cookies = new Cookies();
    // alert("Logged out")
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
          <a className="navbar-brand" href="/discovery">Homies</a>
      </div>

      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li>
            <a href="/discovery">Discover</a>
          </li>
          <li>
            <Link to="/stayintheloop" >Stay in <i className="fa fa-superpowers"></i></Link>
          </li>
          <li>
            <Link to="/circles">Circles </Link>
          </li>
        </ul>

        <ul className="nav navbar-nav navbar-right">
          <form className="navbar-form navbar-left" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} placeholder="Search" />
            </div>
            <button type="submit" className="btn btn-default">
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