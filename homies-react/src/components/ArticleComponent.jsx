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
          { this.state.show && <CommentInput url={url} title={title} author={author}
                                     urlToImage={urlToImage} publishedAt={publishedAt}
                                     description={description} />
          }
          { this.state.show && <Comments url={url} /> }
        </div>


      </div>
    )
  }
}

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }
  componentDidMount() {
    axios.get(`http://localhost:3001/api/v1/articles/url_filter/`, {
      params: {
        url: this.props.url
      }
    })
    .then(response => {
      console.log(response);
      if(response.data.length > 0) {
        console.log("Article ID: ",response.data[0].id)
        axios.get(`http://localhost:3001/api/v1/articles/${response.data[0].id}/article_comments`)
          .then(response => {
            console.log(response);
            const comments = this.state.comments.concat(response.data)

            this.setState({comments: comments});

          })
      }
    })
    .catch(function (error) {
          console.log(error);
    });
  }

  render() {

    return(
      <div className="article-commnet">
      { this.state.comments.map((comment, index) => {

        return  <div className="panel panel-success">
                  <div className="panel-heading">User ID: { comment.user_id }</div>
                  <div className="panel-body">
                    { comment.content }
                  </div>
                </div>
      }) }
      </div>
    )
  }
}


class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, author, url ,urlToImage, publishedAt, description } = this.props;

    let article_json = {
      title: title,
      author: author,
      url: url,
      urlToImage: urlToImage,
      publishedAt: publishedAt,
      description: description
    }

    let article_id = 0;
    let content = this.state.content;

    axios.get(`http://localhost:3001/api/v1/articles/url_filter/`, {
      params: {
        url: url
      }
    })
    .then(function (response) {
      console.log("Article ID is: ",response.data.length);
      if(response.data.length > 0) {
        article_id = response.data[0].id;
        axios.post(`http://localhost:3001/api/v1/articles/${article_id}/article_comments`, {
          article_comment: {
            article_id: article_id,
            user_id: 185,
            content: content
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      } else {
        axios.post(`http://localhost:3001/api/v1/articles`, {
          article: {
            article_url: url,
            article_json: article_json
          }
        })
        .then(function (response) {
          article_id = response.data.id;
          axios.post(`http://localhost:3001/api/v1/articles/${article_id}/article_comments`, {
            article_comment: {
              article_id: article_id,
              user_id: 185,
              content: content
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    this.setState({content: ''});

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
