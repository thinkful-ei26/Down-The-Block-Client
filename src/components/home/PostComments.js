import React from 'react';
import {connect} from 'react-redux';
import Comment from './Comment';
import './comments.css';

export class PostComments extends React.Component{
  
  generateComments(){
    return this.props.comments.map((comment, index)=>{
      comment.content = comment.content.replace(/\n/g, '<br/>');
     return (
      <div className="post-info" key={index}>
        <img className="comment-profile-photo" src={comment.userId.photo.url} alt="profile"/>
        {/* <h5 className="comment-user-name">{comment.userId.firstName}</h5> */}
        {/* <h6>{formatLongDate(this.props.date)}</h6> */}
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