import React, { Component } from 'react'; 
import {Field, reduxForm, focus} from 'redux-form';

export class PostAddComment extends Component {
    onSubmit(values) {
        return this.props.dispatch(addComment(values.userComment));
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
            className="userCommentForm"
            onSubmit= {this.props.handleSubmit(values=> 
                {
                this.onSubmit(values);
                this.props.reset('commentInput');
                }
            )}>
                {error}
                <label htmlFor="comment">ADD COMMENT</label>
                <Field
                    component="input"
                    type="text"
                    name="userComment"
                    id="userComment"
                    validate={[required, nonEmpty]}
                />
                <button disabled={this.props.pristine || this.props.submitting}>
                    SUBMIT
                </button>
                </form>
        )
    }
}

export default reduxForm({
    form: 'commentInput',
    onSubmitFail: (errors, dispatch) => dispatch(focus('userComment'))
})(AnswerInput);