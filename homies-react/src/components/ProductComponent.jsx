import React, { Component } from 'react'
import axios from 'axios';
import history from '../index.jsx';
import Cookies from 'universal-cookie';
import NavBar from './NavBar.jsx';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {}
    }
  }

  componentDidMount() {
    let product = `http://localhost:3001/api/v1/search/${this.props.params.type.toUpperCase()}/${this.props.params.id}`
    axios.get(product)
    .then( (response) => {
      let responseJson = response.data
      this.setState({ result: responseJson
      });
    })

  }

  render() {

    const { image, name, overview, date, type } = this.state.result

    return(
      <div className="product-container">
        <NavBar />
        <div className="product-info-container">
          <h1>{name}</h1>
          <div className="product-columns">
            <img src={image} />
            <div className="product-text">
              <p>({type}) - {date}</p>
              <p>{overview}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Product;
