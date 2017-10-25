import React, { Component } from 'react';
import axios from 'axios';
import SideBar from './SideBar.jsx';

import ArticleComponent from './ArticleComponent.jsx'

class ArticlesContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { articles: []};

  }

  componentDidMount() {

    let apiUrls = [
    "http://beta.newsapi.org/v2/top-headlines?sources=ign,polygon,entertainment-weekly&apiKey=ae8c13ec258c4e6e899680b6eb2a6c13",
    "http://beta.newsapi.org/v2/everything?q=netflix&language=en&apiKey=ae8c13ec258c4e6e899680b6eb2a6c13",
    "http://beta.newsapi.org/v2/everything?q=boxoffice&language=en&apiKey=ae8c13ec258c4e6e899680b6eb2a6c13",
    "http://beta.newsapi.org/v2/everything?q=cineplex&language=en&apiKey=ae8c13ec258c4e6e899680b6eb2a6c13"

      // "https://newsapi.org/v1/articles?source=ign&sortBy=top&apiKey=ae8c13ec258c4e6e899680b6eb2a6c13",
      // "https://newsapi.org/v1/articles?source=polygon&sortBy=top&apiKey=ae8c13ec258c4e6e899680b6eb2a6c13",
      // "https://newsapi.org/v1/articles?source=entertainment-weekly&sortBy=top&apiKey=ae8c13ec258c4e6e899680b6eb2a6c13"
    ];

    Promise.all(apiUrls.map(
      (url) => fetch(url)
      .then(res => res.json())
      .then(res => {
        const articles = this.state.articles.concat(res.articles);

        this.setState({ articles: articles });
      })
      .then(() => {
        this.setState( (currentState) => {
          let sorted = currentState.articles.sort((a,b) => {
            a = new Date(a.publishedAt).getTime()
            b = new Date(b.publishedAt).getTime()
            return b - a;
          })
          console.log(sorted);
          return {articles: sorted}
        })
      })
      .catch(error => console.log(error))
    ))
  }

  render() {

    return (
      <div className="row row-offcanvas row-offcanvas-left">
        <SideBar />

        <div className="col-xs-12 col-sm-9" data-spy="scroll" data-target="#sidebar-nav">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-1">

      { this.state.articles.map((article, index) => {
          if(article.urlToImage) {

            return(
                <ArticleComponent
                  title={article.title}
                  author={article.author}
                  url={article.url}
                  urlToImage={article.urlToImage}
                  publishedAt={article.publishedAt}
                  description={article.description}
                  key={index}
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

