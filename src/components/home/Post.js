import React from 'react';
import {connect} from 'react-redux';

import PostComments from './PostComments';
import {formatLongDate} from '../common/helper-functions';
import { postBeingEdited, deletePost } from '../../actions/posts';
import './post.css';
import PostAddComment from './PostAddComment';



export class Post extends React.Component {

  edit(postId, content, category){
    if(this.props.userId.id===this.props.loggedInUserId){
      return <button onClick={()=>this.props.dispatch(postBeingEdited({postId, content, category}))} >Edit</button>
    }  
  }

  delete(postId){
    if(this.props.userId.id===this.props.loggedInUserId){
      return <button onClick={()=>this.props.dispatch(deletePost(postId))} >Delete</button>
    }
  }
  
  render(){
    return(
      <section className="entire-thread">
        <article className='post'>
          <div className="top-post">
            <span className={`${this.props.category}`.toLowerCase()}>{this.props.category}</span>
            <div className="options">
              {this.delete(this.props.postId)}
              {this.edit(this.props.postId, this.props.content, this.props.category)}
            </div>
          </div>
            
          <div className="post-info">
            <div className="profile-photo-avatar">
            {!this.props.userId.photo ? 
              <p className="initials">
                {this.props.userId.firstName[0]}
                {this.props.userId.lastName[0]}
              </p>
              :
              <img className="profile-photo" src={this.props.userId.photo.url} alt="profile"/> 
            }
            </div>

            <div className="name-and-date">
              <h3 className="post-user-name">{this.props.userId.firstName}</h3>
              <h6>{formatLongDate(this.props.date)}</h6>
            </div> 
          </div>

          <p className="post-content">{this.props.content}</p>       

        </article>
        <PostComments comments={this.props.comments}/>
        <PostAddComment form={this.props.postId}/>
      </section>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    loggedInUserId: state.auth.currentUser.id, 
    coords: state.geolocation.coords,
    postsArray: state.posts.posts
  }
};

export default connect(mapStateToProps)(Post)

