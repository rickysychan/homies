import React, { Component } from 'react'
import axios from 'axios';
import history from '../index.jsx';
import Cookies from 'universal-cookie';
import NavBar from './NavBar.jsx';
import SearchResultComponent from './SearchResultComponent.jsx'

function RenderResults(props) {
  return(
    <div>
      { props.results.map((result) => {
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
  )
}


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
    const cookies = new Cookies();
    let token = cookies.get("token")

    let searchResults = `http://localhost:3001/api/v1/search/all/${this.state.query}`

    axios.get(searchResults, {headers: { Authorization: "Bearer " + token }})
    .then( (response) => {
      let responseJson = response.data
      this.setState({ results: responseJson
      });
    })

  }

  searchOnPage(query) {
    const cookies = new Cookies();
    let token = cookies.get("token")

    let searchResults = `http://localhost:3001/api/v1/search/all/${query}`
    axios.get(searchResults, {headers: { Authorization: "Bearer " + token }})
    .then( (response) => {
      let responseJson = response.data
      this.setState({ results: responseJson
      });
    })
  }

  render() {

    const is_result = this.state.results.length > 0;

    let resultsList = null

    if (is_result) {
      resultsList = <RenderResults results={this.state.results} />
    } else {
      resultsList = <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
    }

    return(

      <div className="row row-offcanvas row-offcanvas-left">
        <NavBar searchOnPage={this.searchOnPage} />
        <p>{is_result}</p>
        <div className="col-xs-12 col-sm-9" data-spy="scroll" data-target="#sidebar-nav">
          <div className="row">
          <h1 className="search-results-title">Search Results:</h1>
          <div className="results-list">
            {resultsList}
          </div>
          </div>
        </div>
      </div>

      )
  }
}

export default SearchResultsContainer;