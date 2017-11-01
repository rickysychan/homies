import React, { Component } from 'react';
import axios from 'axios';
import SideBar from './SideBar.jsx';
import NavBar from './NavBar.jsx';
import history from '../index.jsx';
import ArticleComponent from './ArticleComponent.jsx'
import Cookies from 'universal-cookie';

class ArticlesContainer extends Component {

  constructor(props){
    super(props);
    this.state={
      hasToken: '',
      articles: [],
      circles: [],
      user_id: ''
    }
  }

  componentWillMount() {
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
      
      axios.get(`http://localhost:3001/api/v1/users/${this.state.user_id}/circles`,
                { headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        if (response.data.length > 0) {
          const circles = this.state.circles.concat(response.data)
          this.setState({circles: circles});
        }
      })
      .catch(error => {
        console.log(error);
      })
  })

    let apiUrls = [

    "http://beta.newsapi.org/v2/top-headlines?sources=ign,polygon,entertainment-weekly&apiKey=ae8c13ec258c4e6e899680b6eb2a6c13",
    // "http://beta.newsapi.org/v2/everything?q=boxoffice&language=en&apiKey=ae8c13ec258c4e6e899680b6eb2a6c13",
    // "http://beta.newsapi.org/v2/everything?q=cineplex&language=en&apiKey=ae8c13ec258c4e6e899680b6eb2a6c13"

    ];

    Promise.all(
      apiUrls.map(
      (url) => fetch(url)
      .then(res => res.json())
      .then(res => {
        // Return the articles
        const articles = this.state.articles.concat(res.articles);

        this.setState({ articles: articles });
      })
      // .then(() => {
      //   this.setState( (currentState) => {
      //     let sorted = currentState.articles.sort((a,b) => {
      //       a = new Date(a.publishedAt).getTime()
      //       b = new Date(b.publishedAt).getTime()
      //       return b - a;
      //     })
      //     return {articles: sorted}
      //   })
      // })
      .catch(error => console.log(error))
    ));

    // List of circles of current_user
    

  }

  render() {
    console.log('Rendering Article List')
    debugger;
    return (
      <div className="row row-offcanvas row-offcanvas-left dicovery-bg">
        <NavBar />
        <SideBar />

        <div className="col-xs-12 col-sm-9" data-spy="scroll" data-target="#sidebar-nav">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-2">

            <p>Current user id is: {this.state.user_id}</p>

      { this.state.articles.map((article, index) => {
          if(article.urlToImage) {
            console.log('Rendering Article')
            return(
                <ArticleComponent
                  circles={this.state.circles}
                  user_id={this.state.user_id}
                  title={article.title}
                  author={article.author}
                  url={article.url}
                  urlToImage={article.urlToImage}
                  publishedAt={article.publishedAt}
                  description={article.description}
                  key={article.url}
                />
            )
          }
        })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticlesContainer

