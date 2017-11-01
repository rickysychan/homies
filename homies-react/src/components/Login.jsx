import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react'
import axios from 'axios'
import UploadScreen from './UploadScreen.jsx'
import Cookies from 'universal-cookie';
import history from '../index.jsx';

class Login extends Component {

constructor(props){
  super(props);
  this.state={
    username:'',
    password:''
  };
  this.handleClick = this.handleClick.bind(this)
 }

 handleClick(event) {
  var self = this;
  console.log(this.props)

  var payload={
  "email":this.state.username,
  "password":this.state.password
  }

  this.props.handleLogin(payload);
 }

render() {

    return (
      <div>
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Enter your email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;