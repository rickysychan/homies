import React, { Component } from 'react';
// import logo from './logo.svg';
// import {Nav, Navbar, NavDropdown, NavItem, MenuItem} from 'react-bootstrap';

import './styles/App.css';
import NavBar from './NavBar';
import Main from './main'
import Loginscreen from './Loginscreen'

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Loginscreen parentContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }
  render() {
    return (
      <div className="App">
        <div className="page-container">
        {/* {this.state.loginPage}
        {this.state.uploadScreen} */}
          <NavBar />

          <Main className="text-center"/>

        </div>
      </div>
    );
  }
}

export default App;
