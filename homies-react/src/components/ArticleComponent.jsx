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
      user_id: 21,
      comments: [],
      articleId: null,
      numOfComments: 0,
      numOfLikes: 0
    }

    this._toggleComments = this._toggleComments.bind(this);
    this._toggleLikes = this._toggleLikes.bind(this);
    this._addComment = this._addComment.bind(this);
    this._postCommentToDB = this._postCommentToDB.bind(this);
    this._connectLikeToDB = this._connectLikeToDB.bind(this);
    this._saveArticle = this._saveArticle.bind(this);
  }

  _toggleComments () {
    const { show } = this.state;
    this.setState( { show : !show });
  }

  _toggleLikes () {
    const { like } = this.state;
    this.setState( { like : !like });
    _connectLikeToDB();
  }

  _connectLikeToDB (article_id) {
    if(!like) {
      // Add like
      // if(articleId === null) {
      //   axios.post(`http://localhost:3001/api/v1/articles`, {
      //     article: {
      //       article_url: url,
      //       article_json: article_json
      //     }
      //   })
      //   .then(response => {
      //     let article_id = response.data.id;
      //     this._connectLikeToDB(article_id, content, null, null)
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

      // }
    //   axios.post(`http://localhost:3001/api/v1/articles${article_id}/likes`, {
    //     article_like: {
    //       article_id: article_id
    //       user_id: this.state.user_id,
    //     }
    //   })
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // // Remove like
//     } else {

// <<<<<<< HEAD
//       axios.post(`http://localhost:3001/api/v1/articles/${article_id}/likes`, {
//         article_like: {
//         article_id: article_id,
//         user_id: 82,
//         //update this
//         // user_id: this.state.user_id,

//         }
//       })
// =======
//       axios.DELETE(`http://localhost:3001/api/v1/articles/${article_id}/users/${this.state.user_id}/likes`)
// >>>>>>> react-likes
//       .then(response => {
//         console.log('Response is : ', response);
//         // const comments = [response.data].concat(this.state.comments)
//         // this.setState({comments: comments});
//         // this.setState({numOfComments: this.state.comments.length});

//       })
//       .catch(function (error) {
//         console.log(error);
//       });
    }
}

  _saveArticle (url, article_json) {
    return new Promise((resolve, reject) => {
      axios.post(`http://localhost:3001/api/v1/articles`, {
        article: {
          article_url: url,
          article_json: article_json
        }
      })
      .then((result) => resolve(result.data))
      .catch((errors) => reject(errors))
    });
   }

  _postCommentToDB (article_id, content, url, article_json) {
    if(article_id === null) {
    // Save article and add comment
      this._saveArticle(url, article_json)
        .then(response => {
          this._postCommentToDB(response.id, content, null, null)
        })
        .catch(function (error) {
          console.log(error);
        });
    // Add comment
    } else {

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
  }


  _addComment (content, article_json) {

  // Article already have some comments
    if(this.state.articleId) {

      let article_id = this.state.articleId;
      this._postCommentToDB(article_id, content, null, null);

  // Article does not have any comment
    } else {
      this._postCommentToDB(null, content, this.props.url, article_json);
    }
  }

  // Load comments of each article
  componentDidMount () {

    // if article is in DB
    axios.get(`http://localhost:3001/api/v1/articles/url_filter/`, {
      params: {
        url: this.props.url
      }
    })
    .then(response => {
      // console.log(response);
      if(response.data.length > 0) {

        let id = response.data[0].id;
        this.setState({articleId: id});

        axios.get(`http://localhost:3001/api/v1/articles/${id}/article_comments`)
          .then(response => {
            // console.log(response);
            if (response.data.length > 0) {
              this.setState({numOfComments: response.data.length});

              const comments = response.data

              this.setState({comments: comments});
              // console.log("after this.state.comments ", this.state.comments);
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
              <i className={ this.state.like ? 'fa fa-heart fa-lg' : 'fa fa-heart-o fa-lg' }
                  onClick={ this._toggleLikes } >
              </i>&nbsp;
              <i className="fa fa-bookmark-o fa-lg"></i>
            </div>
          </div>
          { this.state.show && <CommentInput url={url} title={title} author={author}
                                     urlToImage={urlToImage} publishedAt={publishedAt}
                                     description={description} _addComment={this._addComment}/>
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
