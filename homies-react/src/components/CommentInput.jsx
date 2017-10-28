import React, { Component } from 'react'
import axios from 'axios';

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

    this.props._addComment (this.state.content, article_json);

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

export default CommentInput;
