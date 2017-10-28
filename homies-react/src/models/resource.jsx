// import React, { Component } from 'react'
// import axios from 'axios';


// class Resource extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       show: false,
//       like: false,
//       comments: [],
//       articleId: null
//     }

//     this._toggleComments = this._toggleComments.bind(this);
//     this._toggleLikes = this._toggleLikes.bind(this);
//     this._addComment = this._addComment.bind(this);
//     this._postCommentToDB = this._postCommentToDB.bind(this);
//   }

//   _toggleComments () {
//     const { show } = this.state;
//     this.setState( { show : !show });
//   }

//   _toggleLikes () {
//     const { like } = this.state;
//     this.setState( { like : !like });
//   }

//   _postCommentToDB (article_id, content, url, article_json) {
//     if(article_id === null) {
//     // Add Article first
//       axios.post(`http://localhost:3001/api/v1/articles`, {
//         article: {
//           article_url: url,
//           article_json: article_json
//         }
//       })
//       .then(response => {
//         let article_id = response.data.id;
//         this._postCommentToDB(article_id, content, null, null)
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//     } else {

//       axios.post(`http://localhost:3001/api/v1/articles/${article_id}/article_comments`, {
//         article_comment: {
//         article_id: article_id,
//         user_id: 185,
//         content: content
//         }
//       }).then(response => {
//         const comments = [response.data].concat(this.state.comments)
//         this.setState({comments: comments});
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//     }
//   }

//   _addComment (content, article_json) {

//     // Article already have some comments
//     if(this.state.articleId) {

//       let article_id = this.state.articleId;
//       this._postCommentToDB(article_id, content, null, null);

//   // Article does not have any comment
//     } else {
//       this._postCommentToDB(null, content, this.props.url, article_json);
//     }
//   }
// }
// export default Resource;
