import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react'
import axios from 'axios'
import UploadScreen from './UploadScreen.jsx'


class Login extends Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:''
  }
 }

 handleClick(event){
  var apiBaseUrl = "http://localhost:3001/authenticate";
  var self = this;
  var payload={
  "email":this.state.username,
  "password":this.state.password
  }
  axios.post(apiBaseUrl, payload)
  .then(function (response) {
    console.log("this is the response", response);
    if(response.status == 200){
      console.log("Login successfull");
      var uploadScreen=[];
      uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
      self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
      }
    })
      .catch(function (error) {
      console.log(error);
      alert("Email password do not match or Email is not registered")
      });
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