import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

//import '../styles/App.css';
import NavBar from './components/NavBar.jsx';
// import ArticlesContainer from './components/ArticlesContainer.jsx';
// import Main from './main'
// import Loginscreen from './Loginscreen'

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }
  // componentWillMount(){
  //   var loginPage =[];
  //   loginPage.push(<Loginscreen parentContext={this}/>);
  //   this.setState({
  //                 loginPage:loginPage
  //                   })
  // }
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

export default App;
