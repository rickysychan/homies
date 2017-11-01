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
            SidebarCircleID: [],
            CircleName: '',
            UserName: '',
            user_id:'',
            CurrentCircleId:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCircle = this.handleChangeCircle.bind(this);
        this.handleClickCircle = this.handleClickCircle.bind(this);
      }

      handleClickCircle(event){
        const cookies = new Cookies();
        let token = cookies.get("token")

        var apiBaseUrl = "http://localhost:3001/api/v1/circles"
        var self = this;
        var payload={
        "name": this.state.CircleName,
        }

        axios.post(apiBaseUrl, payload,
            {
            headers: { Authorization: "Bearer " + token }
              })
       .then(function (response) {
          //  console.log("registration successfull");
          alert("Yay! circle created!")
          window.location.reload();
       })
       .catch(function (error) {
         alert("That circle name has been taken or you did not enter a name")
       });
    }

    handleAddUser(event){
        
        console.log("this>>>>>>>", this.state.SidebarCircleUserNames)

        console.log("this>>>>>>>", this.state.SidebarCircleUserNames)

        if(this.state.SidebarCircleUserNames.length >= 7){
            alert("Your circle is Full!")
            return
        }

        const cookies = new Cookies();
        let token = cookies.get("token")
        
        var apiBaseUrl = `http://localhost:3001/api/v1/circles/${this.state.CurrentCircleId}/circle_users`
        var self = this;
        var payload={
        "circle_id": this.state.CurrentCircleId,
        "search": this.state.UserName
        }

        axios.post(apiBaseUrl, payload,
            {
            headers: { Authorization: "Bearer " + token }
              })
       .then( (response) => {
        console.log(">>>>>> this is the response", response.data)
        let SidebarNames = self.state.SidebarCircleUserNames
        SidebarNames.push(response.data)
        this.setState({SidebarCircleUserNames: SidebarNames})
          alert("Yay! User added!")
       })

       .catch(function (error) {
           console.log(error)
           if(error == "Error: Request failed with status code 409"){
               alert("That user already is in the group")
           } else {
               alert("No emails matched or no circles have been selected, please try again")
           }
       });
    }

    
    handleClickGotoCircle(event, index){
        const cookies = new Cookies();
        let token = cookies.get("token")

        this.props.onCircleClick(this.state.SidebarCircleID[index])
        this.setState({CurrentCircleId: this.state.SidebarCircleID[index]}, () => {
            console.log("this is the circle ID", this.state.CurrentCircleId)

            let circleUserNames = `http://localhost:3001/api/v1/circles/${this.state.CurrentCircleId}`
            
            axios.get(circleUserNames, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then( (response) => {
                console.log("response data ** >>>", response.data)
                this.setState({ SidebarCircleUserNames: response.data.map(
                    user => user.first_name
                )});
            })
        })
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
    this.state.hasToken = token

    let UserName = "http://localhost:3001/api/v1/users/current"

    axios.get(UserName, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    .then( (response) => {
        this.setState({user_id: response.data.id})
        // this response contains the user id!
    })
    .then((result) => {

        let user_id = this.state.user_id
        let circleNames = `http://localhost:3001/api/v1/users/${user_id}/circles`
        axios.get(circleNames, {
            headers: {
                Authorization: "Bearer " + token
            },
        })
        .then( (response) => {
            this.setState({ SidebarCircleNames: response.data.map(
                circle => circle.name
            )}),
            this.setState({ SidebarCircleID: response.data.map(
                circle => circle.id
            )});
        })
    })

    // the above shows the circles of a particlur user
}

// the above shows the users of a particular circle

  render() {
    return (
        <div className="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
          <div className="affix-top" data-spy="affix" data-offset-top="45" data-offset-bottom="90">

            <h3 id="sidebarLabels"> Your circles </h3>
            <ul className="nav" id="sidebar-nav">
          {this.state.SidebarCircleNames.map((item, index) => (
       <li className='indent' key={index}><Link onClick={(event) => this.handleClickGotoCircle(event, index)}>{item}</Link></li>
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
            <Button onClick={(event) => this.handleClickCircle(event)}>Create Circle</Button>
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
            <Button onClick={(event) => this.handleAddUser(event)}>Add User</Button>
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
