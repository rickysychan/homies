import React, { Component } from 'react'

class ArticlesContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      articles: []
    }
  }


  render() {
    return (
      <div>
        Articles
      </div>
    )
  }
}

export default ArticlesContainer