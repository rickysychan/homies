import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Cookies from 'universal-cookie';
import axios from 'axios'
import history from '../index.jsx';

class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      loginmessage:'',
      buttonLabel:'Register',
      isLogin: true
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event){
    // console.log("event",event);
    let loginmessage;
    if(this.state.isLogin){
      let loginscreen=[];
      loginscreen.push(<Register parentContext={this}/>);
      loginmessage = "Already registered? Go to Login";
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     buttonLabel:"Login",
                     isLogin:false
                   })
    }
    else{
      let loginscreen=[];
      loginscreen.push(<Login parentContext={this} handleLogin={this.props.handleLogin}/>);
      loginmessage = "Register or login to your account";
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     buttonLabel:"Register",
                     isLogin:true
                   })
    }
  }

  componentWillMount(){
    let loginscreen=[];
    loginscreen.push(<Login handleLogin={this.props.handleLogin} parentContext={this} appContext={this.props.parentContext}/>);
    let loginmessage = "Register or login to your account";
    this.setState({
                  loginscreen:loginscreen,
                  loginmessage:loginmessage
                    })
  }
  render() {
    return (
      <div class="wrapper">
        <div className="loginscreen">
          <div id="login-wrapper">
            <h1>Sign In / Register</h1>
            {this.state.loginscreen}
            <div>
              {this.state.loginmessage}
              <MuiThemeProvider>
                <div>
                   <RaisedButton label={this.state.buttonLabel} primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
               </div>
              </MuiThemeProvider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Loginscreen;