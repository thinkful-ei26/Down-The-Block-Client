import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from '../common/input';
import {login} from '../../actions/auth';
import {required, nonEmpty} from '../common/validators';
import { HashLink as Link } from 'react-router-hash-link';
import { display, focusOn } from '../../actions/navigation'

export class LogInForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.loginUsername, values.password));
    }

    onClick(focus=""){
        this.props.dispatch(display(focus));
        this.props.dispatch(focusOn(focus));
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
                id = "login"
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <h2>Sign In</h2>
                {error}
                <Field
                    component={Input}
                    ref={input => (this.input = input)}
                    type="text"
                    name="loginUsername"
                    id="loginUsername"
                    label="Username"
                    validate={[required, nonEmpty]}
                />
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    label="Password"
                    validate={[required, nonEmpty]}
                />
               
                <button 
                type="submit"
                // disabled={this.props.pristine || this.props.submitting}
                >
                    Log in
                </button>
                <div className="bottom-text">
                    <p>Don't Have An Account? 
                        <Link
                        className="link-to-form"
                        onClick={()=>this.onClick('registerUsername')} 
                        to ="/#register"
                        > Sign Up Here!</Link>
                    </p>    
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    focusOn: state.nav.focusOn,
});

export default connect(mapStateToProps)(reduxForm({
    form:'login',
    onSubmitFail: (error, dispatch) => {
      dispatch(focus('login', Object.keys(error)[0]));
    },
  })(LogInForm));