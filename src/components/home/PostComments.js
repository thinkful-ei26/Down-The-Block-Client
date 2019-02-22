import React from 'react';
import {connect} from 'react-redux';
import Comment from './Comment';
import './comments.css';

export class PostComments extends React.Component{
  
  generateComments(){
    return this.props.comments.map((comment, index)=>{
      comment.content = comment.content.replace(/\n/g, '<br/>');
     return (
      <div className="comment-info" key={index}>
        <div className="comment-profile-photo-avatar">
          {!comment.userId.photo ? 
              <p className="initials">
                  {comment.userId.firstName[0]}
                  {comment.userId.lastName[0]}
              </p>
              :
              <img className="comment-profile-photo" src={comment.userId.photo.url} alt="profile"/> 
          }
        </div>
        <Comment {...comment} />
      </div>
     );
    });
  }

  render(){
    return(
      <div className="comments-list">
        {this.generateComments()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
  postsArray: state.posts.posts, 
  coords: state.geolocation.coords
  }
}
export default connect(mapStateToProps)(PostComments)