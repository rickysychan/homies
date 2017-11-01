import React, { Component } from 'react';
import axios from 'axios';
import CircleSideBar from './CircleSideBar.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import NavBar from './NavBar.jsx';
import history from '../index.jsx';
import Cookies from 'universal-cookie';

class NewCircleForm extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            hasToken:''
        }
    }

    componentWillMount() {
        const cookies = new Cookies();
        let token = cookies.get("token")
        this.state.hasToken = token
    
        console.log(this.props.is_auth)
        console.log(this.props)
    
        if(!this.state.hasToken){
          history.push('/');
        }
      }

    handleClick(event){
        const cookies = new Cookies();
        let token = cookies.get("token")
        
        var apiBaseUrl = "http://localhost:3001/api/v1/circles"
        console.log("values",this.state.name);
        //To be done:check for empty values before hitting submit
        var self = this;
        var payload={
        "name": this.state.name,
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
         alert("Something went wrong, try again later")
       });
    }

    render() {
        return (
            <div className="row row-offcanvas row-offcanvas-left">
            <NavBar />
            <CircleSideBar />
            <div className="col-xs-12 col-sm-9" data-spy="scroll" data-target="#sidebar-nav">
            <div className="row">
            <h1>Create a new circle</h1>
            <div className="col-sm-6 col-sm-offset-1">
             <div>
            <MuiThemeProvider>
            <div>
                <TextField
                    hintText="Enter a name for your new Circle"
                    floatingLabelText="Circle name"
                    onChange = {(event,newValue) => this.setState({name:newValue})}
                    />
                    <br/>
                <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
            </div>
            </MuiThemeProvider>
        </div>
                </div>
                </div>
            </div>
            </div>
        )
        const style = {
            margin: 15,
        };
    }
    
}
export default NewCircleForm