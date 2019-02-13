import React, { Fragment } from 'react'
import PostComments from './PostComments';
import {formatLongDate} from '../common/helper-functions';
import './post.css';

export default class Post extends React.Component{
  render(){
    return(
      <section className="entire-thread">
        <article className='post'>
          <span className={`${this.props.category}`.toLowerCase()}>{this.props.category}</span>
          <h4>{this.props.userId.firstName}</h4>
          <h6>{formatLongDate(this.props.date)}</h6>
          <p>{this.props.content}</p>
        </article>
        <PostComments comments={this.props.comments}/>
      </section>
    );
  }
}