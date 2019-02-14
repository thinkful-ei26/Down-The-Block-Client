import React from 'react';
import {connect} from 'react-redux';
import PostComments from './PostComments';
import {formatLongDate} from '../common/helper-functions';
import { postBeingEdited } from '../../actions/posts';
import './post.css';

export class Post extends React.Component{
  edit(postId, content, category){
    if(this.props.userId.id===this.props.loggedInUserId){
      return <button onClick={()=>this.props.dispatch(postBeingEdited({postId, content, category}))} >Edit</button>
    }  
  }
  render(){
    console.log(this.props);
    return(
      <section className="entire-thread">
        <article className='post'>
          <span className={`${this.props.category}`.toLowerCase()}>{this.props.category}</span>
          {this.edit(this.props.postId, this.props.content, this.props.category)}
          <h3>{this.props.userId.firstName}</h3>
          <h6>{formatLongDate(this.props.date)}</h6>
          <p>{this.props.content}</p>
        </article>
        <PostComments comments={this.props.comments}/>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUserId: state.auth.currentUser.id
});

export default connect(mapStateToProps)(Post)

