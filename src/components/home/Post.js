import React from 'react';
import PostComments from './PostComments';
import {formatLongDate} from '../common/helper-functions';
import './post.css';

export default function Post(props){
  return(
    <article className="post">
      <p>{props.userId.firstName}</p>
      <p>{formatLongDate(props.date)}</p>
      <p>{props.content}</p>
      <p>{props.category}</p>
      <PostComments comments={props.comments}/>
    </article>
  );
}