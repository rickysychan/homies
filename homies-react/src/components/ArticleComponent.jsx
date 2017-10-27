import React, { Component } from 'react'

class ArticleComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      like: false
    }

    this.toggleComments = this.toggleComments.bind(this);
    this.toggleLikes = this.toggleLikes.bind(this);
  }

  toggleComments () {
    const { show } = this.state;
    this.setState( { show : !show });
  }

  toggleLikes () {
    const { like } = this.state;
    this.setState( { like : !like });
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
              <i className={ this.state.show ? 'fa fa-comment fa-lg' : 'fa fa-comment-o fa-lg' }
                  onClick={ this.toggleComments } >
              </i>&nbsp;
            </div>

            <div className="list-group pull-right">
              <i className={ this.state.like ? 'fa fa-heart fa-lg' : 'fa fa-heart-o fa-lg' }
                  onClick={ this.toggleLikes } >
              </i>&nbsp;
              <i className="fa fa-bookmark-o fa-lg"></i>
            </div>
          </div>
          { this.state.show && <Comment /> }
        </div>
      </div>
    )
  }
}

class Comment extends Component{
  render() {
    return(
      <div className="article-commnet">
        <form>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea className="form-control" rows="5" id="comment"></textarea>
          </div>
          <button className="btn btn-primary">Comment</button>
        </form>
      </div>
    )
  }
}

export default ArticleComponent;
