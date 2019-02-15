import React from 'react';
import {formatLongDate} from '../common/helper-functions';

export default function Comment(props) {
  return(
    <div className="comment">
      <h5>{props.userId.firstName}</h5>
      {/* <p>{formatLongDate(props.date)}</p> */}
      <p>{props.content}</p>
    </div>
  );
}