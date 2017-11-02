import React, { Component } from 'react'
import axios from 'axios';
import Resource from '../models/resource.jsx'
import Cookies from 'universal-cookie';



class CircleComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      circle_id: this.props.circle_id,
      user_id: this.props.user_id,
      user_name: ''
    }

    this._getUserName=this._getUserName.bind(this);
  }

  _getUserName(user_id) {
    const cookies = new Cookies();
    let token = cookies.get("token");

    axios.get(`http://localhost:3001/api/v1/users/current`, {
        headers: {
            Authorization: "Bearer " + token
        }
      })
      .then(res => {
        let userName = res.data.first_name +' '+ res.data.last_name;
        this.setState({user_name: userName});
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {

    this._getUserName(this.props.user_id);

  }
  // <div className="panel-heading">
  //           <h3><a href={ url } target="_blank"> { title } </a></h3>
  //           <p> { author } </p>
  //         </div>
  //         <div className="panel-body">
  //           <img src={ urlToImage } className="img-responsive" />
  //           <p> { publishedAt } </p>
  //           <div className="clearfix"></div>
  //           <p>
  //              { description }
  //           </p>
  //           <hr/>
  //         </div>

  render() {
    // console.log("article", this.props.article);
    const hello = "hello";
    let post = '';
    if(this.props.content) {
      post = <p><kbd> {this.state.user_name}</kbd>: {this.props.content}</p>;
    } else {
      post = <p><kbd> {this.state.user_name}</kbd>: {hello}</p>;
    }
    // const { title, author, url ,urlToImage, publishedAt, description } = JSON.parse(this.props.content_json)  ;
    return (
      <div className="tile" >
        {post}
      </div>
    )
  }
}


export default CircleComponent;
