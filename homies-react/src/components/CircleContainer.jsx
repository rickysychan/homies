import React, { Component } from 'react'
import CircleSideBar from './CircleSideBar.jsx';
import NavBar from './NavBar.jsx';
import Cookies from 'universal-cookie';
import history from '../index.jsx';

class CircleContainer extends Component {

  componentWillMount() {
    const cookies = new Cookies();

    console.log(this.props.is_auth)
    console.log(this.props)

    if(!this.props.is_auth){
      history.push('/');
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