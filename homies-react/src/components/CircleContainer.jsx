import React, { Component } from 'react'
import axios from 'axios';
import CircleSideBar from './CircleSideBar.jsx';
import CircleComponent from './CircleComponent.jsx';
import NavBar from './NavBar.jsx';
import history from '../index.jsx';
import Cookies from 'universal-cookie';

class CircleContainer extends Component {

  constructor(props){
    super(props);
    this.state={
      circle_id: 5,
      posts: [],
      hasToken: ''
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
    axios.get(`http://localhost:3001/api/v1/circles/${this.state.circle_id}/posts`)
     .then(response => {
        this.setState({ posts: this.state.posts.concat(response.data) });
     })
     .catch(error => {
        console.log(error)
     });
  }

  render() {

        return (
          <div className="row row-offcanvas row-offcanvas-left">
            <NavBar />
            <CircleSideBar />

            <div className="col-xs-12 col-sm-9" data-spy="scroll" data-target="#sidebar-nav">
              <div className="panel panel-default col-xs-9">
                <br/><br/>
                <div className="col-sm-9 col-sm-offset-1" name="circlePostsConteiner">
                  <form className="form-inline">
                    <input type="text" className="form-control" id="circleInputBar" autoFocus/>
                    <button type="submit" className="btn btn-primary">Post</button>
                  </form>
                </div>
                <br/><br/>
                <hr/>

                <div className="col-sm-9" >
      { this.state.posts.map((post) => {
          console.log(post.content);
          return(<CircleComponent
                  circle_id={post.circle_id}
                  user_id={post.user_id}
                  content={post.content}
                  article={post.article}
                  key={post.id}
                />)

      })}
              </div>
            </div>
          </div>
        </div>
        )
      }
    }

export default CircleContainer