import React, {Component} from 'react';
import axios from 'axios';



class CommentComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { user: '' }

  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/v1/users/${this.props.user_id}`)
      .then(response => {
        let user = response.data.first_name + ' ' + response.data.last_name;
        this.setState( { user : user });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render () {

    return  <div className="panel panel-success">
              <div className="panel-heading">
                { this.state.user }
              </div>
              <div className="panel-body">
                { this.props.content }
              </div>
            </div>

  }

}

export default CommentComponent;
