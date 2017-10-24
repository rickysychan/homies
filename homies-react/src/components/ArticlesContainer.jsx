import React, { Component } from 'react';
import axios from 'axios';
import SideBar from './SideBar.jsx';


class ArticlesContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      articles: [],
    }
  }


  componentDidMount() {
    fetch(`https://newsapi.org/v1/articles?source=ign&sortBy=top&apiKey=ae8c13ec258c4e6e899680b6eb2a6c13`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({ articles: res.articles });
        console.log(this.state.articles)
      })
      .catch(error => console.log(error))
  }

  render() {

    return (
      <div className="row row-offcanvas row-offcanvas-left">
        <SideBar />

        <div className="col-xs-12 col-sm-9" data-spy="scroll" data-target="#sidebar-nav">

          <div className="row">

            <div className="col-sm-6 col-sm-offset-1">

        {this.state.articles.map((article) => {
          return(
              <div className="tile" key={article.id} >
                <h1>Demo</h1>
                <h4>{user.first_name}</h4>
                <h4>{user.last_name}</h4>
                <p>{user.email}</p>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4><a href="/">News Articles</a></h4>
                  </div>
                  <div className="panel-body">
                    <img src={ img[user.id] } className="img-responsive" />
                    <p>
                      <a href="/">Image Description</a>
                    </p>
                    <div className="clearfix"></div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate.
                      Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero. Aenean sit amet felis
                      dolor, in sagittis nisi. Sed ac orci quis tortor imperdiet venenatis. Duis elementum auctor accumsan.
                      Aliquam in felis sit amet augue.
                    </p>
                    <hr/>
                    <div className="list-group pull-left">
                      <i className="fa fa-comment-o fa-lg"></i>&nbsp;
                    </div>

                    <div className="list-group pull-right">
                      <i className="fa fa-heart-o fa-lg" ></i>&nbsp;
                      <i className="fa fa-bookmark-o fa-lg"></i>
                    </div>
                  </div>
                </div>
              </div>
          )
        })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ArticlesContainer