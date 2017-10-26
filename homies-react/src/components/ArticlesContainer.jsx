import React, { Component } from 'react';
import axios from 'axios';
import SideBar from './SideBar.jsx';


class ArticlesContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      users:[]
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/users.json')
    .then(response => {
      console.log(response)
      this.setState({users: response.data})
    })
    .catch(error => console.log(error))
  }


  render() {
    let img = ["",
    "http://cdn5.thr.com/sites/default/files/imagecache/card_landscape_930_524/2017/10/gettyimages-864789994.jpg",
    "https://static.gamespot.com/uploads/screen_kubrick/1579/15795667/3305470-dmmlmzaxcae8okp.jpg",
    "http://cdn5.thr.com/sites/default/files/imagecache/card_landscape_930_524/2017/10/geo-trlr2-0067_-_h_2017.jpg",
    "http://cdn4.thr.com/sites/default/files/imagecache/list_landscape_960x541/2015/09/thewalkingdead_h_2015_0.jpg",
    "https://static.gamespot.com/uploads/screen_kubrick/1197/11970954/3245617-swbfii_reveal_screenshot_7.jpg",
    "https://i.ndtvimg.com/i/2017-10/ajay-devgn-instagram_650x400_61508673492.jpg",
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMTA3MjA1NDkxMTReQTJeQWpwZ15BbWU4MDU2Njg3NDMy._V1_SY1000_CR0,0,639,1000_AL_.jpg",
    "https://images-na.ssl-images-amazon.com/images/M/MV5BZWYxODViMGYtMGE2ZC00ZGQ3LThhMWUtYTVkNGE3OWU4NWRkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjYwNDA2MDE@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
    "http://mms.businesswire.com/media/20170613006236/en/592427/5/Switch_SuperMarioOdyssey_illustration_02_FINAL.jpg",
    "https://images-na.ssl-images-amazon.com/images/M/MV5BNDNmYTQzMDEtMmY0MS00OTNjLTk4MjItMDZhMzkzOGI3MzA0XkEyXkFqcGdeQXVyNjk5NDA3OTk@._V1_.jpg"

    ]
    return (
      <div className="row row-offcanvas row-offcanvas-left">
        <SideBar />

        <div className="col-xs-12 col-sm-9" data-spy="scroll" data-target="#sidebar-nav">

          <div className="row">

            <div className="col-sm-6 col-sm-offset-1">

        {this.state.users.map((user) => {
          return(
              <div className="tile" key={user.id} >
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