import React, { Component } from 'react'
import axios from 'axios';
import history from '../index.jsx';
import Cookies from 'universal-cookie';
import NavBar from './NavBar.jsx';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      interested: false,
      user_id: '',
      interest: [],
      game_url: false
    }
    this.handleInterest = this.handleInterest.bind(this);
    this.handleUninterest = this.handleUninterest.bind(this);
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
        this.setState({user_id: response.data.id})
        // this response contains the user id!
        let product = `http://localhost:3001/api/v1/search/${this.props.params.type.toUpperCase()}/${this.props.params.id}`
        axios.get(product, {
          headers: { Authorization: "Bearer " + token }
        })
        .then( (response) => {
          let responseJson = response.data
          if (responseJson.rating.length > 0 && responseJson.rating.charAt(0) === "h") {
            this.setState({game_url: true})
          }
          this.setState({ result: responseJson});
          let userInterest = `http://localhost:3001/api/v1/users/${this.state.user_id}/product_interests`
          axios.get(userInterest, {headers: { Authorization: "Bearer " + token }} )
          .then( (response) => {
            let responseJson = response.data
            this.setState({ interest: responseJson
            });
          })
          .then((response) => {
            for (let interest of this.state.interest) {
              if (interest.api_id == this.props.params.id) {
                this.setState({interested: true})
              }
            }
          })
        })
      })
      .catch((error) => {
        console.log(error)
      })

  }

  handleInterest() {
    const cookies = new Cookies();
    let token = cookies.get("token")

    axios.post(`http://localhost:3001/api/v1/products/${this.props.params.id}/interests`, {
      api_id: this.props.params.id,
      title: this.state.result.name,
      api_type: this.props.params.type,
      user_id: this.state.user_id
      }, {headers: { Authorization: "Bearer " + token }}
    )
    .then(response => {
      this.setState({interested: true});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleUninterest() {
    const cookies = new Cookies();
    let token = cookies.get("token")

    axios.delete(`http://localhost:3001/api/v1/products/${this.props.params.id}/interests`,
    {
      headers: { Authorization: "Bearer " + token },
      params: {
        api_id: this.props.params.id,
        user_id: this.state.user_id
      }
    })
    .then(response => {
      this.setState({interested: false});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

    const { image, name, overview, rating, date, type } = this.state.result

    let interestedButton = <a href="#" onClick={this.handleInterest}>This interests me!</a>
    if (this.state.interested) {
      interestedButton = <a href="#" className="black-button" onClick={this.handleUninterest}>Interested!</a>
    }

    let gameRating = null
    if (this.state.game_url) {
      gameRating = <p className="product-rating">Rated: Find out <a href={rating}>here!</a></p>
    } else {
      gameRating = <p className="product-rating">Rated: {rating}</p>
    }

    return(
      <div className="product-container">
        <NavBar />
        <div className="product-info-container">
          <div className="product-columns">
            <div className="product-image-container">
              <img src={image} />
            </div>
            <div className="product-text">
              <h1>{name}</h1>
              {gameRating}
              <h4>({type}) - {date}</h4>
              <div className="product-link-list">
                {interestedButton}
                <a href="#">Share with circles.</a>
              </div>
              <p>{overview}</p>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Product;
