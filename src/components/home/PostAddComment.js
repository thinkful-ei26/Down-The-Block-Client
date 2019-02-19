import React, { Component } from 'react'; 
import {Field, reduxForm, focus} from 'redux-form';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import {API_BASE_URL} from '../../config';
import {required, nonEmpty} from '../common/validators';
import { addComment } from '../../actions/comments';


export class PostAddComment extends Component {
    
    constructor() {
        super();
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

    componentDidMount() {
        this.socket.emit("initial_data");
        // const state_current = this;
        this.socket.on("get_posts", this.getPosts);
    }

    componentWillUnmount() {
        this.socket.off("get_posts", this.getPosts);
    }

    //Function to place the comment.

    sendComment = id => {
        console.log(id);
        let comment_details = {};
        console.log('post data in state', this.state.post_data);
        this.state.post_data.map(post => {
          if (post.id === id) {
            comment_details = post;
          }
          return post;
        });
        console.log('comment details:', comment_details);
        this.socket.emit("putComment", comment_details);
        const new_array = this.state.post_data.map(post => {
            if (post.id === id) {
                post.comments.push(comment_details.id)
              }
          return post;
        });
        this.setState({ post_data: new_array });
        console.log('state after comment has been submitted', this.state);
    };

    // Changing the quantity in the state which is emitted to the backend at the time of placing a comment.
    changePost = (event, postid, comment) => {
        if (!event.target.value) {
          event.target.value = '';
        }
        const new_array = this.state.post_data.map(post => {
          if (post.id === postid) {
            post.comments.push(comment.id); 
          }
          return post;
        });
        this.setState({ post_data: new_array });
    };

    onSubmit(values, props ) {
        props = this.props;
        this.sendComment(props.form);
        return this.props.dispatch(addComment(values.content, props.loggedInUserId, props.form));       
    }  

    render() {   
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }   
        return (
                <form 
                className= "commentInput"
                onSubmit= {this.props.handleSubmit(values=> 
                    {
                    this.onSubmit(values, this.props.loggedInUserId, this.props.form);
                    this.props.reset('commentInput');
                    }
                )}>
                    {error}
                    <label htmlFor="comment">ADD COMMENT</label>
                    <Field
                        component="input"
                        type="text"
                        name="content"
                        id=  {this.props.postId}
                        validate={[required, nonEmpty]}
                    />
                    <button  disabled={ this.props.pristine || this.props.submitting}>
                        SUBMIT
                    </button>
                </form> 
        )
    }
}

PostAddComment = reduxForm({
})(PostAddComment);

PostAddComment = connect(state => {
    return{
        coords: state.geolocation.coords,
        loggedInUserId: state.auth.currentUser.id,
        postsArray: state.posts.posts  
    }
})(PostAddComment)

export default PostAddComment;
