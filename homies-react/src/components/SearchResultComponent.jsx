import React, { Component } from 'react'

class SearchResultComponent extends Component {

  render() {
    const { image, name, date, type, json } = this.props;

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
          <h3>{name}</h3>
          {releaseDate}
        </div>
      </div>

      )
  }
}

export default SearchResultComponent;