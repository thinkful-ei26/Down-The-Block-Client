import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from '../common/input';
import {login} from '../../actions/auth';
import {required, nonEmpty} from '../common/validators';
import {Link} from 'react-router-dom';

export class LogInForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values['login-username'], values.password));
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
                <h2>Sign in Below</h2>
                {error}
                <label htmlFor="login-username">Username</label>
                <Field
                    component={Input}
                    ref={input => (this.input = input)}
                    type="text"
                    name="login-username"
                    id="login-username"
                    validate={[required, nonEmpty]}
                />
                <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, nonEmpty]}
                />
               
                <button disabled={this.props.pristine || this.props.submitting}>
                    Log in
                </button>
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