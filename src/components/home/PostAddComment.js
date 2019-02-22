import React from 'react'; 
import { connect } from 'react-redux';

import { addComment, commentBeingEdited } from '../../actions/comments';
import { updatePost } from '../../actions/posts'; 

import moment from 'moment';

export class PostAddComment extends React.Component {
    constructor(props){
        super(props);

        this.test='';
    }

    componentDidMount(){
        //listens for the server when the new post has been created
        this.props.socket.on('new_comment', post => {
          console.log(post); 
          this.props.dispatch(updatePost(post));
        })
        this.props.socket.on('edit_comment', post => {
            this.props.dispatch(updatePost(post));
        })
      }


    onSubmit(e) {
        console.log('ON SUBMIT, POST ID', this.props.form)
        e.preventDefault();

        let commentId = this.props.commentBeingEdited ? this.props.commentBeingEdited.id : null;
        let postId = this.props.commentBeingEdited ? this.props.commentBeingEdited.postId : this.props.form;
        
        let date = moment().format('LLLL');
        this.props.dispatch(addComment(this.test, date, this.props.currentUser.id, postId, commentId));   
        this.content.value="";   

        this.props.dispatch(commentBeingEdited(null))
    }  

    handleKeyDown(e){
        if (e.keyCode === 13 && !e.shiftKey)
        {
            //form should submit
            this.test=this.content.value
            this.onSubmit(e);
        }
        else if(e.keyCode===13 && e.shiftKey){
          this.test = this.content.value + ' <br/> ';
        }
    }

    render() {   
        let editMode = this.props.commentBeingEdited ? true : false;

        return (
            <form 
                onSubmit={(e)=> this.onSubmit(e)}
                ref={form => this.form = form}
                className="comment-form"
            >

                <div className="comment-profile-photo-avatar">
                    {!this.props.currentUser.photo ? 
                        <p className="initials">
                            {this.props.currentUser.firstName[0]}
                            {this.props.currentUser.lastName[0]}
                        </p>
                        :
                        <img className="comment-profile-photo" src={this.props.currentUser.photo.url} alt="profile"/> 
                    }
                </div>

                <textarea 
                    className="comment-textarea" 
                    ref={input => this.content = input} 
                    type="textarea" 
                    id="content" 
                    name="content" 
                    placeholder="Write a Comment"
                    onKeyDown={(e)=>this.handleKeyDown(e)} 
                    defaultValue={editMode ? this.props.commentBeingEdited.content : ""}
                />

                {
                    this.props.commentBeingEdited &&
                    <button type="button" onClick={()=> this.props.dispatch(commentBeingEdited(null)) }>
                        Cancel
                    </button>
                }
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
        coords: state.geolocation.coords,
        postsArray: state.posts.posts, 
        socket:state.socket.socket, 
        commentBeingEdited:state.comments.commentBeingEdited,
    }
  };
  
export default connect(mapStateToProps)(PostAddComment)

