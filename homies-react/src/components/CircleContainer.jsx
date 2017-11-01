import React, { Component } from 'react'
import axios from 'axios';
import CircleSideBar from './CircleSideBar.jsx';
import CircleComponent from './CircleComponent.jsx';
import NavBar from './NavBar.jsx';
import history from '../index.jsx';
import Cookies from 'universal-cookie';
import axios from 'axios';

class CircleContainer extends Component {

  constructor(props){
    super(props);
    this.state={
      circle_id: '',
      user_id: '',
      posts: [],
      content: '',
      hasToken: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._scrollToBottom = this._scrollToBottom.bind(this);
  }

  _scrollToBottom() {
    window.scrollTo(0, document.querySelector(".post").scrollHeight);
  }

  handleChange(event) {
    this.setState({content: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(`http://localhost:3001/api/v1/circles/${this.state.circle_id}/posts`, {
        post: {
          circle_id: this.state.circle_id,
          user_id: this.state.user_id,
          content: this.state.content,
          article: null
        }
      })
      .then(response => {
        this.setState( { notice : true });
        const posts = this.state.posts.concat(response.data)
        this.setState({posts: posts});
        this.setState({content: ''});
      })
      .catch(error => {
        console.log(error);
      });
  }

  onCircleClick(data){
    this.setState({circle_id: data});
  }

  componentWillMount() {
    const cookies = new Cookies();
    let token = cookies.get("token");
    this.state.hasToken = token;

    if(!this.state.hasToken){
      history.push('/');
    }
  }

  componentDidMount() {
    const cookies = new Cookies();
    let token = cookies.get("token");
    this.state.hasToken = token;

    let UserName = "http://localhost:3001/api/v1/users/current";

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
    })
    console.log("this is the props ******", this.props.location)

    axios.get(`http://localhost:3001/api/v1/circles/${this.state.circle_id}/posts`)
     .then(response => {
        this.setState({ posts: this.state.posts.concat(response.data) });
     })
     .catch(error => {
        console.log(error)
     });

    this._scrollToBottom();
  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  render() {
        return (
          <div className="row row-offcanvas row-offcanvas-left circle-bg" >
            <NavBar />
            <CircleSideBar onCircleClick={this.onCircleClick.bind(this)}/>
            <h1>{this.state.circle_id}</h1>

            <div className="col-xs-12 col-sm-9" data-spy="scroll" data-target="#sidebar-nav">
              <div className="row">
                <div className="col-sm-6 col-sm-offset-1">
                </div>
            <CircleSideBar />

            <div className="col-xs-12 col-sm-9" data-spy="scroll" data-target="#sidebar-nav" >
              <div className="panel panel-default col-xs-9" >

                <div className="post col-sm-9" >
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

              <br/>
               <div className="col-sm-9 col-sm-offset-1" name="circlePostsConteiner">
                  <form className="form-inline" onSubmit={this.handleSubmit} >
                    <input type="text" className="form-control" id="circleInputBar"
                        value={this.state.content} onChange={this.handleChange} autoFocus/>
                    <button type="submit" className="btn btn-primary">Post</button>
                  </form>
                  <br/><br/>
                </div>

            </div>
          </div>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        </div>

        )
      }

}

export default CircleContainer;
