import React from 'react';
import './post.css';

export default function Post(props){
  return(
    <article className="post">
      <p>{props.userId.firstName}</p>
      <p>{props.date}</p>
      <p>{props.content}</p>
    </article>
  );
}