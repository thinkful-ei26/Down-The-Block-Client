import React from 'react'; 
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import {API_BASE_URL} from '../../config';
import {required, nonEmpty} from '../common/validators';
import { addComment } from '../../actions/comments';



    
    
export class PostAddComment extends React.Component {
    constructor(props) {
        super(props);
        this.test='';
        this.state = {
          post_data: [], 
          endpoint: `${API_BASE_URL}`
        };
        this.socket = socketIOClient(this.state.endpoint); 
    }

    getPosts = posts =>{
        console.log('posts being recieved 2:', posts);
        this.setState({ post_data: posts });
    }

    // updatePostsInState = res => {
    //     console.log(res);
    //     // dispatch(commentAdded(res));
    //     const new_array = this.state.post_data.map(post => {
    //         console.log('post:', post);
        
    //         if (post.id === res.id) {
    //             post.comments.push(res._id);
    //             return post;
    //         }
    //         return post;
    //     })
    //     this.setState({ post_data:new_array });
    // };
    

    componentDidMount() {
        this.socket.emit("initial_data");
        // const state_current = this;
        this.socket.on("get_posts", this.getPosts);
        // this.socket.on('commentAdded', this.updatePostsInState);
    }

    componentWillUnmount() {
        this.socket.off("get_posts", this.getPosts);
        // this.socket.off('commentAdded', this.updatePostsInState);
    }

    //Function to place the comment.

    sendComment = (content, userId, postId ) => {
        
        const newComment = {
            content, 
            userId, 
            postId
        }; 
        console.log(newComment);
        this.socket.emit('addComment', newComment);
    };    


    // onSubmit(values, props ) {
    //     props = this.props;
    //     this.sendComment(values.content, props.loggedInUserId, props.form);
    //     return this.props.dispatch(addComment(values.content, props.loggedInUserId, props.form));       

    // }

    onSubmit(e) {
        e.preventDefault();
        this.props.dispatch(addComment(this.test, this.props.currentUser.id, this.props.form));   
        this.content.value="";    
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
                    // defaultValue={editMode ? this.props.editPost.content : ""}
                />
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
        coords: state.geolocation.coords,
        postsArray: state.posts.posts  
    }
  };
  
export default connect(mapStateToProps)(PostAddComment)

