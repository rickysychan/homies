import React, { Component } from 'react'
import CircleSideBar from './CircleSideBar.jsx';
import NavBar from './NavBar.jsx';
import history from '../index.jsx';
import Cookies from 'universal-cookie';

class CircleContainer extends Component {

  constructor(props){
    super(props);
    this.state={
    hasToken: ''
    }
  }

  componentWillMount() {
    const cookies = new Cookies();

    let token = cookies.get("token")
    this.state.hasToken = token

    if(!this.state.hasToken){
      history.push('/')
    }
  }

  render() {
    
        return (
          <div className="row row-offcanvas row-offcanvas-left">
            <NavBar />
            <CircleSideBar />
    
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