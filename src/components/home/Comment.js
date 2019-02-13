import React from 'react';
import {formatLongDate} from '../common/helper-functions';

export default function Comment(props){
  return(
    <div className="comment">
      <p>{props.userId.firstName}</p>
      <p>{formatLongDate(props.date)}</p>
      <p>{props.content}</p>
    </div>
  );
}