import React, { Component } from 'react'; 
import {Field, reduxForm, focus} from 'redux-form';
import { connect } from 'react-redux';
import {required, nonEmpty} from '../common/validators';
import { addComment } from '../../actions/comments';
import { fetchPosts } from '../../actions/posts';
export class PostAddComment extends Component {

    constructor(props) {
        super(props);
    }

    onSubmit(values, props) {
        props = this.props;
        console.log(props);
        // const coords = {
        //     "latitude":props.coords.latitude, 
        //     "longitude":props.coords.longitude
        // }; 
        // console.log(coords);
        return this.props.dispatch(addComment(values.content, props.loggedInUserId, props.form));       
    }  
    
    componentDidMount() {
        this.props.dispatch(fetchPosts(this.props.coords));
    }

    componentWillUnmount() {
        this.props.dispatch(fetchPosts(this.props.coords))
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
                    this.props.dispatch(fetchPosts(this.props.coords));
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
    console.log(state);
    return{
        coords: state.geolocation.coords,
        loggedInUserId: state.auth.currentUser.id,
        postsArray: state.posts.posts  
    }
})(PostAddComment)

export default PostAddComment;
