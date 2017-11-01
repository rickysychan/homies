import React, { Component } from 'react'
import CircleSideBar from './CircleSideBar.jsx';
import NavBar from './NavBar.jsx';
import history from '../index.jsx';
import Cookies from 'universal-cookie';
import axios from 'axios';

class CircleContainer extends Component {

  constructor(props){
    super(props);
    this.state={
    hasToken: '',
    user_id: '',
    circle_id: ''
    }
  }

  onCircleClick(data){
    this.setState({circle_id: data})
  }

  componentWillMount() {
    const cookies = new Cookies();
    let token = cookies.get("token")
    this.state.hasToken = token

    if(!this.state.hasToken){
      history.push('/')
    }
  }

  componentDidMount(){
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
        console.log("this is the response", response)
        this.setState({user_id: response.data.id})
        console.log("this is the userId", this.state.user_id)
        // this response contains the user id!
    })
    console.log("this is the props ******", this.props.location)   
  }

  render() {
    
        return (
          <div className="row row-offcanvas row-offcanvas-left">
            <NavBar />
            <CircleSideBar onCircleClick={this.onCircleClick.bind(this)}/>
            <h1>{this.state.circle_id}</h1>
    
            <div className="col-xs-12 col-sm-9" data-spy="scroll" data-target="#sidebar-nav">
              <div className="row">
                <div className="col-sm-6 col-sm-offset-1">
                </div>
              </div>
            </div>
          </div>
        )
      }
    }

export default CircleContainer