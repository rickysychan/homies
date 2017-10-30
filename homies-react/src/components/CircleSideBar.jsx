import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { withRouter } from 'react-router';
import history from '../index.jsx';
import axios from 'axios';
import Cookies from 'universal-cookie';
import TextField from 'material-ui/TextField';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



class CircleSideBar extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            SidebarCircleUserNames: [],
            SidebarCircleNames: [],
            CircleName: '',
            UserName: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCircle = this.handleChangeCircle.bind(this);
      }

      handleClickCircle(event){
        const cookies = new Cookies();
        let token = cookies.get("token")
        
        var apiBaseUrl = "http://localhost:3001/api/v1/circles"
        //To be done:check for empty values before hitting submit
        var self = this;
        var payload={
        "name": this.state.CircleName,
        }

        axios.post(apiBaseUrl, payload, 
            { 
            headers: { Authorization: "Bearer " + token } 
              })
       .then(function (response) {
         console.log(response);
         if(response.status == 200){
          //  console.log("registration successfull");
          alert("Yay! circle created!")
         }
       })
       .catch(function (error) {
         alert("That circle name has been taken or you did not enter a name")
       });
    }

    
    handleClickUser(event){
        alert(this.state.UserName)
    }

    handleChange(event) {
        this.setState({UserName: event.target.value});
      }
    handleChangeCircle(event) {
    this.setState({CircleName: event.target.value});
    }
    
componentDidMount() {

    const cookies = new Cookies();
    let token = cookies.get("token")

    let circleNames = "http://localhost:3001/api/v1/users/20/showcircles"
    
    axios.get(circleNames, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    .then( (response) => {
        this.setState({ SidebarCircleNames: response.data.map(
            circle => circle.name
        )});
        console.log(this.state.SidebarCircleNames)
    })

    // the above shows the circles of a particlur user

    let circleUserNames = "http://localhost:3001/api/v1/circles/9"
    
    axios.get(circleUserNames, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    .then( (response) => {
        console.log(">>>>", response)
        this.setState({ SidebarCircleUserNames: response.data.map(
            user => user.first_name
        )});
        console.log(this.state.SidebarCircleUserNames)
    })
}

// this is jsut for testing puproses to see if ID is available 

  render() {
    return (
        <div className="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
          <div className="affix-top" data-spy="affix" data-offset-top="45" data-offset-bottom="90">
              
            <h3 id="sidebarLabels"> Your circles </h3>
            <ul className="nav" id="sidebar-nav">
          {this.state.SidebarCircleNames.map((item, index) => (
       <li className='indent' key={index}>{item}</li>
    ))}
            </ul>
            <br/>
            <Form>
            <FormGroup>
              <Label for="exampleEmail">New Circle Name</Label>
              <Input type="text" name="Circle Name" id="circleName" placeholder="Circle Name"
              value={this.state.CircleName} onChange={this.handleChangeCircle} 
               />
            </FormGroup>
            <Button onClick={(event) => this.handleClickCircle(event)}>Add User</Button>
            </Form>
            <h3 id="sidebarLabels"> Circle users </h3>
            <ul className="nav" id="sidebar-nav">
          {this.state.SidebarCircleUserNames.map((item, index) => (
       <li className='indent' key={index}>{item}</li>
    ))}
    <br/>
            </ul>
            <Form>
            <FormGroup>
              <Label for="exampleEmail">Add User by Email</Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="Email"
              value={this.state.UserName} onChange={this.handleChange} 
               />
            </FormGroup>
            <Button onClick={(event) => this.handleClickUser(event)}>Add User</Button>
            </Form>
          </div>
        </div>
    );
  }
  
}
const style = {
    margin: 15,
  };


const Component1WithRouter = withRouter(CircleSideBar);
export default CircleSideBar;