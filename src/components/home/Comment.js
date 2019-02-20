import React from 'react';
import {formatLongDate} from '../common/helper-functions';

export default function Comment(props) {
  console.log(props);
  return(
    <div className="comment">
      <h5>{props.userId.firstName}</h5>
      {/* <p>{formatLongDate(props.date)}</p> */}
      <p>{props.comments.content}</p>
    </div>
  );
}