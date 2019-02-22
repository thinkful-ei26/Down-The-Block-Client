import React from 'react';
import {connect} from 'react-redux';
import Comment from './Comment';
import './comments.css';

export class PostComments extends React.Component{
  
  generateComments(){
    return this.props.comments.map((comment, index)=>{
      comment.content = comment.content.replace(/\n/g, '<br/>');
     return (
        <Comment key={index} {...comment} />
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