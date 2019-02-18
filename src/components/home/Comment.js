import React from 'react';
import {formatLongDate} from '../common/helper-functions';

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
        {/* <p>{formatLongDate(props.date)}</p> */}
        {this.generateComment(this.props)}
      </div>
    );
  }
}