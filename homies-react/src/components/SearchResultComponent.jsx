import React, { Component } from 'react'
// import { Link, BrowserRouter as Router,
//   Route, } from 'react-router-dom'

class SearchResultComponent extends Component {

  render() {
    const { id, image, name, date, type, overview, json } = this.props;

    let releaseDate = null;
    if (date != "1901") {
      releaseDate = date;
    }

    return(

      <div className="search-result">
        <div className="search-image-container">
          <img src={image} alt="Image" />
        </div>
        <div className="search-text">
          <h3><a href={"/products/" + type + "/" + id }>{name}</a> <span className="entertainment-type">({type}) - {releaseDate}</span></h3>
          <div>
            <hr/>
            <p>{overview}</p>
          </div>
        </div>
      </div>

      )
  }
}

export default SearchResultComponent;