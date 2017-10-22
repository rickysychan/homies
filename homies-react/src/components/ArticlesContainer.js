import React, { Component } from 'react'
import {Col} from 'react-bootstrap';
import axios from 'axios'

class ArticlesContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      users:[]
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/users.json')
    .then(response => {
      console.log(response)
      this.setState({users: response.data})
    })
    .catch(error => console.log(error))
  }


  render() {
    return (
      <div>
        <Col xs={6} xsOffset={2}>
        {this.state.users.map((user) => {
          return(
            <div className="tile" key={user.id} >
              <h4>{user.first_name}</h4>
              <h4>{user.last_name}</h4>
              <p>{user.email}</p>
            </div>
          )
        })}
        </Col>
      </div>
    )
  }
}

export default ArticlesContainer