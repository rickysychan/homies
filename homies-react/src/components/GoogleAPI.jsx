import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch(`https://newsapi.org/v1/articles?source=polygon&sortBy=top&apiKey=62c718bc464c4b4ab3991ec7a7ef157d`)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        this.setState({ posts: res.articles });
        console.log(this.state.posts)
      });
  }

  render() {
    return (
      <div>
        <ul>
          {JSON.stringify(this.state.posts, null, 2)}
        </ul>
      </div>
    );
  }
}


export default News