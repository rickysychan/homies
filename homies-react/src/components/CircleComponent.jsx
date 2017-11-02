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


  render() {

    if(this.props.content != '') {
      return (
        <div className="tile" >
          <p><kbd> {this.state.user_name}</kbd>: {this.props.content}</p>
        </div>
      )
    } else {
      return (
        <div className="tile" >
          <table className="table">
            <tr>
              <td width="30%"><kbd> {this.state.user_name}</kbd>:</td>
              <td>
                <div className="panel-heading">
                  <h3><a href={ this.props.article.url } target="_blank"> { this.props.article.title } </a></h3>
                  <p> { this.props.article.author } </p>
                </div>
                <div className="panel-body">
                  <img src={ this.props.article.urlToImage } className="img-responsive" />
                  <p> { this.props.article.publishedAt } </p>
                  <div className="clearfix"></div>
                  <p>
                     { this.props.article.description }
                  </p>
                  <hr/>
                </div>
              </td>
            </tr>
          </table>
        </div>
      )
    }
  }
}


export default CircleComponent;
