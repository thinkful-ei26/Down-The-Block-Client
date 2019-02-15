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
            <div></div>
        )
    }
}

export default reduxForm({
    form: 'commentInput',
    onSubmitFail: (errors, dispatch) => dispatch(focus('userComment'))
})(AnswerInput);