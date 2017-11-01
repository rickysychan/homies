import React, { Component } from 'react';
import axios from 'axios';
import SideBar from './SideBar.jsx';
import Login from './Login.jsx';
import NavBar from './NavBar.jsx';
import LoginScreen from './LoginScreen.jsx';
import history from '../index.jsx';
import Cookies from 'universal-cookie';

import ArticleComponent from './ArticleComponent.jsx'

class StayInTheLoopContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      hasToken: '',
      circles: [],
      user_id: ''
    };
  }

  componentWillMount(){
    const cookies = new Cookies();

    let token = cookies.get("token")
    this.state.hasToken = token

    if(!this.state.hasToken){
      history.push('/')
    }
  }

  componentDidMount() {

    const cookies = new Cookies();
    let token = cookies.get("token")

    let UserName = "http://localhost:3001/api/v1/users/current"

    axios.get(UserName, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    .then( (response) => {
      console.log("this is the response", response)
      this.setState({user_id: response.data.id})
      console.log("this is the userId", this.state.user_id)
      // this response contains the user id!
    //   axios.get(`http://localhost:3001/api/v1/articles`, {
    //     headers: {
    //         Authorization: "Bearer " + token
    //     }
    // })
      axios.get(`http://localhost:3001/api/v1/users/${this.state.user_id}/loops`, {
          headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
           this.setState({ articles: this.state.articles.concat(response.data) });
        })
        .catch(error => {
            console.log(error)
        });
    })
    .catch(error => {
      console.log(error);
    })

    // List of circles of user
    axios.get(`http://localhost:3001/api/v1/users/${this.state.user_id}/circles`)
      .then(response => {
        if (response.data.length > 0) {
          const circles = this.state.circles.concat(response.data)
          this.setState({circles: circles});
        }
      })
      .catch(error => {
        console.log(error);
      })

  }

  render() {

    return (

      <div className="row row-offcanvas row-offcanvas-left loop-bg">
       <NavBar />
          <div className="row ">
            <div className="col-sm-4 col-sm-offset-3">
              <p>Current user id is: {this.state.user_id}</p>

      { this.state.articles.reverse().map((article) => {

          if(article.article_json.urlToImage) {

            return(
                <ArticleComponent
                  circles={this.state.circles}
                  user_id={this.state.user_id}
                  title={article.article_json.title}
                  author={article.article_json.author}
                  url={article.article_json.url}
                  urlToImage={article.article_json.urlToImage}
                  publishedAt={article.article_json.publishedAt}
                  description={article.article_json.description}
                  key={article.id}
                />
            )
          }
        })}
            </div>
        </div>
      </div>
    )
  }
}


export default StayInTheLoopContainer