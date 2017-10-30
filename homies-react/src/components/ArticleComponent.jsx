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
      numOfLikes: 0,
      isInTheLoop: false
    }

    this._toggleComments = this._toggleComments.bind(this);
    this._toggleLikes = this._toggleLikes.bind(this);
    this._addComment = this._addComment.bind(this);
    this._postCommentToDB = this._postCommentToDB.bind(this);
    this._addLikes = this._addLikes.bind(this);
    this._deleteLikes = this._deleteLikes.bind(this);
    this._saveArticle = this._saveArticle.bind(this);
    this._saveToLoop = this._saveToLoop.bind(this);
  }

  _toggleComments () {
    const { show } = this.state;
    this.setState( { show : !show });
  }

  _toggleLikes () {

    const { like } = this.state;
    // Add like
    if( like === false ) {
      // For new article, save article first and save like
      if ( this.state.articleId === null ) {
        this._saveArticle ()
        .then(response => {
          this._addLikes(response.id);
        })
        .catch(error => {
          console.log(error);
        });
      // Save like
      } else {
        this._addLikes(this.state.articleId);
      }

    // Remove like
    } else {
      this._deleteLikes(this.state.articleId);
    }
  }

  _addLikes (article_id) {
    axios.post(`http://localhost:3001/api/v1/articles/${article_id}/likes`, {
      article_like: {
        article_id: article_id,
        user_id: this.state.user_id
      }
    })
    .then(response => {
      // console.log("I am in Add like", response);
      this.setState( { numOfLikes : this.state.numOfLikes + 1 }, () => {
        console.log("Number of likes: ", this.state.numOfLikes);
      });
      // Save to the loop if it is not in the loop
      if(this.state.isInTheLoop === false) { this._saveToLoop(article_id) };
      this.setState({like: true});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  _deleteLikes (article_id) {
    axios.delete(`http://localhost:3001/api/v1/articles/${article_id}/users/${this.state.user_id}/likes`)
    .then(response => {
      console.log("I am in Delete like", response.data);

      this.setState( { numOfLikes : this.state.numOfLikes - 1});
      console.log("I am in Delete like", this.state.numOfLikes);
      this.setState({like: false});
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

   _saveToLoop (article_id) {
      axios.post(`http://localhost:3001/api/v1/articles/loop`, {
          article_user: {
            article_id: article_id,
            user_id: this.state.user_id
          }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
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
      .catch(error => {
        console.log(error);
      });
  }

  _addComment (content) {

  // Article already have some comments
    if(this.state.articleId) {
      this._postCommentToDB(this.state.articleId, content);
      // Save to the loop if it is not in the loop
      if(this.state.isInTheLoop === false) {
        this._saveToLoop(this.state.articleId)
      }

  // Article does not have any comment
    } else {
      this._saveArticle()
        .then(response => {
          let article_id = response.id;
          this._postCommentToDB(article_id, content);
          // Save to the loop if it is not in the loop
          if(this.state.isInTheLoop === false) { this._saveToLoop(article_id) }
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

        // Check if this article is in the loop
        axios.get(`http://localhost:3001/api/v1/articles/${id}/users/${this.state.user_id}/loop`)
          .then(result => {
            if(result.data.length > 0) {
              this.setState({isInTheLoop: true})
            }
          })
          .catch((errors) => reject(errors));

        // Load all comments of each article
        axios.get(`http://localhost:3001/api/v1/articles/${id}/article_comments`)
          .then(response => {
            if (response.data.length > 0) {
              this.setState({numOfComments: response.data.length});
              this.setState({comments: response.data});
            }
          })
          .catch(error => {
            console.error(error);
          });

        // Numbers of likes of each article
        axios.get(`http://localhost:3001/api/v1/articles/${id}/likes`)
        .then(response => {
          // Set number of likes
          if (response.data.length > 0) {
            this.setState({numOflikes: response.data.length});
            this.setState({like: true});
          } else {
            this.setState({like: false});
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
    })
    .catch(function (error) {
          console.log(error);
    });
  }


  render() {
    const { title, author, url ,urlToImage, publishedAt, description } = this.props;

    let comments = this.state.numOfComments + ' ' + 'comments';
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
              </i>&nbsp; { this.state.numOfComments > 0 && comments }
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
