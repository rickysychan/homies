import React, { Component } from 'react';
import axios from 'axios';
import history from '../index.jsx';
import Cookies from 'universal-cookie';

function RenderInterests(props) {
  let linkStyles = {
    fontSize: '0.9em',
    color: 'white',
    display: 'block',
    borderTop: '1px solid white',
    padding: '5px'
  }
  return(
    <div>
      { props.interests.map((interest) => {
        let productUrl = `/products/${interest.api_type}/${interest.api_id}`
        return(
          <a key={interest.id} href={productUrl} style={linkStyles}>{interest.title}</a>
          )
      })}
    </div>
  )
}

function RenderRecommendations(props) {
  let linkStyles = {
    fontSize: '0.9em',
    color: 'white',
    display: 'block',
    borderTop: '1px solid white',
    padding: '5px'
  }
  return(
    <div>
      { props.recommendations.map((recommendation) => {
        let productUrl = `/products/${recommendation.type}/${recommendation.id}`
        return(
          <a key={recommendation.id} href={productUrl} style={linkStyles}>{recommendation.name}</a>
          )
      })}
    </div>
  )
}


class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: 21,
      interests: [],
      recommendations: []
    }
  }

  componentDidMount() {
    let userInterest = `http://localhost:3001/api/v1/users/${this.state.user_id}/product_interests`
    axios.get(userInterest)
    .then( (response) => {
      let responseJson = response.data
      this.setState({ interests: responseJson
      });
    })

    let userRecommendations = `http://localhost:3001/api/v1/users/${this.state.user_id}/recommendations`
    axios.get(userRecommendations)
    .then( (response) => {
      let responseJson = response.data
      this.setState({ recommendations: responseJson
      });
    })
  }

  render() {

    const hasInterests = this.state.interests.length > 0;

    let interestList = null

    if (hasInterests) {
      interestList = <RenderInterests interests={this.state.interests} />
    } else {
      interestList = <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
    }

    const hasRecommendations = this.state.recommendations.length > 0;

    let recommendationList = null

    if (hasRecommendations) {
      recommendationList = <RenderRecommendations recommendations={this.state.recommendations} />
    } else {
      recommendationList = <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
    }


    const sidebarStyle = {
      marginLeft: '15px',
      paddingTop: '1px'
    }

    const headerStyle = {
      fontSize: '100%'
    }

    return (
        <div className="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
          <div className="affix-top" data-spy="affix" data-offset-top="45" data-offset-bottom="90">
            <div id="accordion" role="tablist" aria-multiselectable="true">
              <ul className="nav" id="sidebar-nav">

                <li>
                  <div className="card" style={sidebarStyle}>
                    <div className="card-header" role="tab" id="recommendations">
                      <h4 className="mb-0" style={headerStyle}>
                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                          Your Recommendations:
                        </a>
                      </h4>
                    </div>
                    <div id="collapseOne" className="collapse" role="tabpanel" aria-labelledby="recommendations">
                      <div className="card-block">
                        {recommendationList}
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="card" style={sidebarStyle}>
                    <div className="card-header" role="tab" id="interests">
                      <h4 className="mb-0" style={headerStyle}>
                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          Your Product Interests:
                        </a>
                      </h4>
                    </div>
                    <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="interests">
                      <div className="card-block">
                        {interestList}
                      </div>
                    </div>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </div>
    );
  }
}

export default SideBar;