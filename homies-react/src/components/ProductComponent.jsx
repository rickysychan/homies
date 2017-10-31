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
      user_id: 82,
      interest: []
    }
    this.handleInterest = this.handleInterest.bind(this);
    this.handleUninterest = this.handleUninterest.bind(this);
  }

  componentDidMount() {
    let product = `http://localhost:3001/api/v1/search/${this.props.params.type.toUpperCase()}/${this.props.params.id}`
    axios.get(product)
    .then( (response) => {
      let responseJson = response.data
      this.setState({ result: responseJson
      });
    })
    let userInterest = `http://localhost:3001/api/v1/users/${this.state.user_id}/product_interests`
    axios.get(userInterest)
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
  }

  handleInterest() {
    axios.post(`http://localhost:3001/api/v1/products/${this.props.params.id}/interests`, {
      api_id: this.props.params.id,
      title: this.state.result.name,
      api_type: this.props.params.type,
      user_id: this.state.user_id
      }
    )
    .then(response => {
      this.setState({interested: true});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleUninterest() {

    axios({
      method: 'delete',
      url: `http://localhost:3001/api/v1/products/${this.props.params.id}/interests`,
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

    const { image, name, overview, date, type } = this.state.result

    let interestedButton = <a href="#" onClick={this.handleInterest}>This interests me!</a>
    if (this.state.interested) {
      interestedButton = <a href="#" className="black-button" onClick={this.handleUninterest}>Interested!</a>
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
