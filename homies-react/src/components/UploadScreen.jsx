import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import NavBar from './NavBar.jsx';

class UploadScreen extends Component {

  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }

  render() {
    return (
      <div className="App">
        <div className="page-container">
          <NavBar />
          <div className="col-sm-12">
            {this.props.children}
          </div>

        </div>
      </div>
    );
  }
}


export default UploadScreen;