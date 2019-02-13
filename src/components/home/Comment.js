import React from 'react';

export default function Comment(props){
  return(
    <div className="comment">
      <p>{props.date}</p>
      <p>{props.content}</p>
    </div>
  );
}