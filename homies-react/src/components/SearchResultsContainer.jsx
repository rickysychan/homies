import React, { Component } from 'react'
import axios from 'axios';
import history from '../index.jsx';
import Cookies from 'universal-cookie';
import NavBar from './NavBar.jsx';
import SearchResultComponent from './SearchResultComponent.jsx'


class SearchResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      query: this.props.location.state.query
    }

    this.searchOnPage = this.searchOnPage.bind(this);
  }

  componentDidMount() {
    let searchResults = `http://localhost:3001/api/v1/search/all/${this.state.query}`

    axios.get(searchResults)
    .then( (response) => {
      let responseJson = response.data
      this.setState({ results: responseJson
      });
    })

  }

  searchOnPage(query) {
    let searchResults = `http://localhost:3001/api/v1/search/${query}`
    axios.get(searchResults)
    .then( (response) => {
      let responseJson = response.data
      this.setState({ results: responseJson
      });
    })
  }

  render() {

    return(

      <div className="row row-offcanvas row-offcanvas-left">
        <NavBar searchOnPage={this.searchOnPage} />
        <div className="col-xs-12 col-sm-9" data-spy="scroll" data-target="#sidebar-nav">
          <div className="row">
          <h1 className="search-results-title">Search Results:</h1>

            { this.state.results.map((result) => {

                  return(
                      <SearchResultComponent
                        key={result.id}
                        id={result.id}
                        image={result.image}
                        name={result.name}
                        date={result.date}
                        type={result.type}
                        overview={result.overview}
                        json={result.json}
                      />
                  )
              })}

          </div>
        </div>
      </div>

      )
  }
}

export default SearchResultsContainer;