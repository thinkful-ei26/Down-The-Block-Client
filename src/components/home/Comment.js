import React from 'react';
import moment from 'moment';

export default class Comment extends React.Component {
  generateComment(comment){
    let linesArr = comment.content.split('<br/>');
    return linesArr.map((line, index)=> {
      return(
        <p key={index}> {index===0 && <strong>{comment.userId.firstName}</strong> } {line}</p>
      );
    });
  }

  render(){
    return(
      <div className="comment-content">
        {this.generateComment(this.props)}
        <strong><h6> {moment(this.props.date, 'LLLL').fromNow()} </h6></strong>
      </div>
    );
  }
}