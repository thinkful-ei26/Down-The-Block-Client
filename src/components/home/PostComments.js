import React from 'react';
import {connect} from 'react-redux';
import Comment from './Comment';
import './comments.css';

export class PostComments extends React.Component{

  generateComments(){
    return this.props.comments.map((comment, index)=> <Comment key={index} {...comment} />)
  }

  render(){
    return(
      <div className="comments-list">
        {this.generateComments()}
      </div>
    );
  }
}

export default connect()(PostComments)