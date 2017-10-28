import React, {Component} from 'react';


class CommentComponent extends Component {

  render () {
    const { user_id, content } = this.props;

    return  <div className="panel panel-success">
              <div className="panel-heading">User ID: { user_id }</div>
              <div className="panel-body">
                { content }
              </div>
            </div>

  }

}

export default CommentComponent;
