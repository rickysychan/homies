import React, { Component } from 'react'

class SearchResultComponent extends Component {

  render() {
    const { image, name, date, type, overview, json } = this.props;

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
          <h3>{name} <span className="entertainment-type">({type}) - {releaseDate}</span></h3>
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