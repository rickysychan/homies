import React, { Component } from 'react'

class StayInTheLoopContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      LoopArticles: []
    }
  }


  render() {
    return (
      <div>
        In the Loop articles
      </div>
    )
  }
}

export default StayInTheLoopContainer