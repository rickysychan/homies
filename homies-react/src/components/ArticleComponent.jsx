import React, { Component } from 'react'
import axios from 'axios';
import CommentsContainer from './CommentsContainer.jsx'
import CommentInput from './CommentInput.jsx'
import Resource from '../models/resource.jsx'



class ArticleComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      like: false,
      user_id: 182,
      comments: [],
      articleId: null,
      numOfComments: 0,
      numOfLikes: 0
    }

    this._toggleComments = this._toggleComments.bind(this);
    this._toggleLikes = this._toggleLikes.bind(this);
    this._addComment = this._addComment.bind(this);
    this._postCommentToDB = this._postCommentToDB.bind(this);
    this._isLiked = this._isLiked.bind(this);
    this._addLikes = this._addLikes.bind(this);
    this._deleteLikes = this._deleteLikes.bind(this);
    this._saveArticle = this._saveArticle.bind(this);
  }

  _toggleComments () {
    const { show } = this.state;
    this.setState( { show : !show });
  }

  _toggleLikes () {

    if ( this.state.articleId === null ) {
      this._saveArticle ()
      .then(response => {
        this._addLikes(response.id);
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      this._addLikes(this.state.articleId);
    }
    const { like } = this.state;

    if( like === false ) {
      this.setState( { numOfLikes : this.state.numOfLikes + 1 });
    } else {
      this.setState( { numOfLikes : this.state.numOfLikes - 1 });
    }
    this.setState( { like : !like });
  }

  _isLiked (article_id) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3001/api/v1/articles/${article_id}/likes`)
      .then((result) => resolve(result.data))
      // .catch((errors) => reject(errors))
    });
  }

  _addLikes (article_id) {
    axios.post(`http://localhost:3001/api/v1/articles/${article_id}/likes`, {
      article_like: {
        article_id: article_id,
        user_id: this.state.user_id
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  _deleteLikes (article_id) {
    axios.delete(`http://localhost:3001/api/v1/articles/${article_id}/likes`, {
      params: { article_id: article_id, user_id: this.state.user_id}
    })
    .then(response => {
      console.log('Response is : ', response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // Save article to database
  _saveArticle () {

    let article_json = {
      title: this.props.title,
      author: this.props.author,
      url: this.props.url,
      urlToImage: this.props.urlToImage,
      publishedAt: this.props.publishedAt,
      description: this.props.description
    }

    return new Promise((resolve, reject) => {
      axios.post(`http://localhost:3001/api/v1/articles`, {
        article: {
          article_url: this.props.url,
          article_json: article_json
        }
      })
      .then((result) => resolve(result.data))
      .catch((errors) => reject(errors))
    });
   }

  // Save comment to database
  _postCommentToDB (article_id, content) {

      axios.post(`http://localhost:3001/api/v1/articles/${article_id}/article_comments`, {
        article_comment: {
          article_id: article_id,
          user_id: this.state.user_id,
          content: content
        }
      })
      .then(response => {
        const comments = [response.data].concat(this.state.comments)
        this.setState({comments: comments});
        this.setState({numOfComments: this.state.comments.length});
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  _addComment (content) {

  // Article already have some comments
    if(this.state.articleId) {

      this._postCommentToDB(this.state.articleId, content);

  // Article does not have any comment
    } else {
      this._saveArticle()
        .then(response => {
          console.log("My response is", response);
          this._postCommentToDB(response.id, content);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  componentDidMount () {
    // Check if ther article is in our database
    axios.get(`http://localhost:3001/api/v1/articles/url_filter/`, {
      params: {
        url: this.props.url
      }
    })
    .then(response => {
      if(response.data.length > 0) {

        let id = response.data[0].id;
        this.setState({articleId: id});

        // Load all comments of this article
        axios.get(`http://localhost:3001/api/v1/articles/${id}/article_comments`)
          .then(response => {
            if (response.data.length > 0) {
              this.setState({numOfComments: response.data.length});
              this.setState({comments: response.data});
            }
          })
          .catch(error => {
            console.error(error);
          })

        // Check if current user liked this article
        // this._isLiked (id)
        axios.get(`http://localhost:3001/api/v1/articles/${id}/likes`)
        .then(response => {
          if (response.data.length > 0) {
            this.setState({numOflikes: response.data.length});
            this.setState({like: true});
            console.log("response is ", response.data.length);
          }
        })
        .catch(error => {
          console.error(error);
        })

      }
    })
    .catch(function (error) {
          console.log(error);
    });
  }


  render() {
    const { title, author, url ,urlToImage, publishedAt, description } = this.props;
    let likes = this.state.numOflikes + ' ' + 'likes';
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
                  onClick={ this._toggleComments } >
              </i>&nbsp; { this.state.numOfComments } comments
            </div>

            <div className="list-group pull-right">
              { this.state.numOflikes > 0 && likes }&nbsp;
              <i className={ this.state.like ? 'fa fa-heart fa-lg' : 'fa fa-heart-o fa-lg' }
                  onClick={ this._toggleLikes } >
              </i>&nbsp;
              <i className="fa fa-bookmark-o fa-lg"></i>
            </div>
          </div>
          { this.state.show && <CommentInput _addComment={this._addComment}/>
          }
          { this.state.show && <CommentsContainer
                                    url={url}
                                    comments={this.state.comments}
                               /> }
        </div>


      </div>
    )
  }
}


export default ArticleComponent;
