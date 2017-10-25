import React, { Component } from 'react'

class ArticleComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    }

    this.toggleComments = this.toggleComments.bind(this);
  }

  toggleComments () {
    const { show } = this.state;
    this.setState( { show : !show });
  }

  render() {
    const { title, author, url ,urlToImage, publishedAt, description } = this.props;

    return (
      <div className="tile" >
        <h2> { title } </h2>
        <p> { author } </p>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4><a href={ url } target="_blank"> { title } </a></h4>
          </div>
          <div className="panel-body">
            <img src={ urlToImage } className="img-responsive" />
            <p> { publishedAt } </p>
            <div className="clearfix"></div>
            <p>
               { description }
            </p>
            <hr/>
            <div className="list-group pull-left">
              <i className="fa fa-comment-o fa-lg" onClick={ this.toggleComments } ></i>&nbsp;
            </div>

            <div className="list-group pull-right">
              <i className="fa fa-heart-o fa-lg" ></i>&nbsp;
              <i className="fa fa-bookmark-o fa-lg"></i>
            </div>
          </div>
        </div>
        <hr/>
        { this.state.show && <Comment /> }
      </div>
    )
  }
}

class Comment extends Component{
  render() {
    return(
      <div >
        <form>
          <div className="form-group">
            <label for="comment">Comment:</label>
            <textarea className="form-control" rows="5" id="comment"></textarea>
          </div>
          <button className="btn btn-primary">Comment</button>
        </form>
      </div>
    )
  }
}

export default ArticleComponent;
