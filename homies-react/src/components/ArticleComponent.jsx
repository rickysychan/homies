import React, { Component } from 'react'
import axios from 'axios';


class ArticleComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      like: false,
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
          { this.state.show && <Comment url={ url }/> }
        </div>
      </div>
    )
  }
}

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(`http://localhost:3001/api/v1/articles/${this.props.url}/article_comments`, {
      api_id: this.props.url,
      user_id: 1,
      content: this.state.content
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    alert(JSON.stringify(this.props));
  }

  handleChange(event) {
    this.setState({content: event.target.value});
  }


  render() {
    return(
      <div className="article-commnet">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea className="form-control" rows="5" id="comment"
                    value={this.state.content} onChange={this.handleChange}></textarea>
          </div>
          <button className="btn btn-primary">Comment</button>
        </form>
      </div>
    )
  }
}

export default ArticleComponent;
