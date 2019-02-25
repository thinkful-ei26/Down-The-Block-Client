import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { deleteComment } from '../../actions/comments';
import { updatePost } from '../../actions/posts';

class Comment extends React.Component {
  componentDidMount(){
    this.props.socket.on('delete_comment', post => {
      this.props.dispatch(updatePost(post));
    })
  }
  generateComment(comment){
    let linesArr = comment.content.split('<br/>');
    return linesArr.map((line, index)=> {
      return(
        <p key={index}> {index===0 && <strong>{comment.userId.firstName}</strong> } {line}</p>
      );
    });
  }

  delete(commentId){
    if(this.props.userId.id===this.props.loggedInUserId){
      return <button onClick={()=>this.props.dispatch(deleteComment(commentId))} >Delete</button>
    }
  }

  render(){
    console.log(this.props);
    return(
      <div className="comment-content">
        {this.generateComment(this.props)}
        <strong><h6> {moment(this.props.date, 'LLLL').fromNow()} </h6></strong>
        {this.delete(this.props.id)}
      </div>
    );
  }
}
//
const mapStateToProps = state => {
  return {
    loggedInUserId: state.auth.currentUser.id, 
    postsArray: state.postsArray, 
    socket:state.socket.socket
  }
}

export default connect(mapStateToProps)(Comment);