import React, { Component } from 'react'
import CircleSideBar from './CircleSideBar.jsx';

class CircleContainer extends Component {

  render() {
    
        return (
          <div className="row row-offcanvas row-offcanvas-left">
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