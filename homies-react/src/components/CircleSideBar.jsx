import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { withRouter } from 'react-router';
import history from '../index.jsx';
import axios from 'axios';
import Cookies from 'universal-cookie';

class CircleSideBar extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            SidebarCircleUserNames: [],
            SidebarCircleNames: []
        };
      }

    handleClick(event){
        history.push('/NewCircle');
    }

componentDidMount() {

    const cookies = new Cookies();
    let circleNames = "http://localhost:3001/api/v1/users/1/showcircles"
    
    // axios.get(circleNames)
    // .then( (response) => {
    //     console.log(response)
    //     this.setState({ SidebarCircleNames: response.data.map(
    //         circle => circle.name
    //     )});
    //     console.log(this.state.SidebarCircleNames)
    // })

    let circleUserNames = "http://localhost:3001/api/v1/circles"
    
    let token = cookies.get("token")
    axios.get(circleUserNames, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    .then( (response) => {
        console.log("this is the response", response)
        // this response contains the user id!
    })
    
}

  render() {
    return (
        <div className="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
          <div className="affix-top" data-spy="affix" data-offset-top="45" data-offset-bottom="90">
            <MuiThemeProvider>
            <div>
               <RaisedButton label={'+ Circle'} primary={true} style={style} onClick={this.handleClick.bind(this)}/>
           </div>
          </MuiThemeProvider>
            <h3> Your circles </h3>
            <ul className="nav" id="sidebar-nav">
          {this.state.SidebarCircleNames.map((item, index) => (
       <li className='indent' key={index}>{item}</li>
    ))}
            </ul>
            <h3> Circle users </h3>
            <ul className="nav" id="sidebar-nav">
          {this.state.SidebarCircleUserNames.map((item, index) => (
       <li className='indent' key={index}>{item}</li>
    ))}
            </ul>
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