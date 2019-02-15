import React, { Component } from 'react'; 
import {Field, reduxForm, focus} from 'redux-form';
import { connect } from 'react-redux';
import {required, nonEmpty} from '../common/validators';
import { addComment } from '../../actions/comments';

export class PostAddComment extends Component {
    constructor(props){
        console.log(props);
        super(props);
    }

    onSubmit(values, props, e) {
        e = this.refs;
        console.log(e);
        props = this.props;
        console.log(props);
        return this.props.dispatch(addComment(values.userComment, props.loggedInUserId, props.postId));
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
            
        console.log(this.props);
        return (
            <div></div>
        )
    }
}

PostAddComment = reduxForm({
    form: 'commentInput',
    onSubmitFail: (errors, dispatch) => dispatch(focus('userComment'))
})(PostAddComment);

PostAddComment = connect(state => {
    console.log(state);
    return{
        loggedInUserId: state.auth.currentUser.id,
        
    }
})(PostAddComment)

export default PostAddComment;
