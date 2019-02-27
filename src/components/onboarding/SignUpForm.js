import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../../actions/users';
import {login} from '../../actions/auth';
import Input from '../common/input';
import { HashLink as Link } from 'react-router-hash-link';
import { display, focusOn } from '../../actions/navigation'
import {required, nonEmpty, matches, length, isTrimmed, sizeLimit } from '../common/validators';

const passwordLength = length({min: 8, max: 72});
const matchesPassword = matches('password');

export class SignUpForm extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
          uploadedFile: false,
        }
      }

    checkIfFile(file){
        console.log('FILE IS', file)
        if(this.img && this.img.files.length!==0){
            this.setState({uploadedFile: true});
        }
        else{
            this.setState({uploadedFile: false});
        }
    }

    onSubmit(values) {
        if(values.img){
            values.img = values.img[0];
        }
        const {password, firstName, lastName, img, registerUsername} = values;
        const user = { password, firstName, lastName, img, registerUsername};
        // user.username = values['register-username'];
        return this.props.dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(registerUsername, password)));
    }

    onClick(focus=""){
        this.props.dispatch(display(focus));
        this.props.dispatch(focusOn(focus));
      }

    render() {
        return (
            <form
                id="register"
                className="registration-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <h2>Register</h2>

                <Field
                    component={Input}
                    type="text"
                    name="registerUsername"
                    validate={[required, nonEmpty, isTrimmed]}
                    label="Username"
                />

                <Field 
                    component={Input} 
                    type="text" 
                    name="firstName" 
                    validate={[required, nonEmpty, isTrimmed]}
                    label="First Name"
                />
                
                <Field 
                    component={Input} 
                    type="text" 
                    name="lastName" 
                    validate={[required, nonEmpty, isTrimmed]}
                    label="Last Name"
                />
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, passwordLength, isTrimmed]}
                    label="Password"
                />
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matchesPassword]}
                    label="Confirm Password"
                />
                <label className="image-input">
                <Field
                    component={Input} 
                    name="img" 
                    id="img"
                    type= "file"
                    validate={[sizeLimit]}
                    // onChange={(e)=>this.checkIfFile(e)}
                />
                <span 
                    type="button"
                    className="upload-photo"
                    
                >
                    <i class="fas fa-paperclip"></i> Upload Profile Photo{this.state.uploadedFile && <i class="fas fa-file"></i>}
                </span>
                </label>
                <br></br>
                <button
                    type="submit"
                    className="submit"
                    >
                    Register
                </button>
                <div className="bottom-text">
                    <p>Already Have An Account? 
                        <button
                        className="link-to-form"
                        onClick={()=>this.onClick('loginUsername')} 
                        > Sign In Here!</button>
                    </p>    
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>{
        console.log("ERROR", errors)
        dispatch(focus('registration', Object.keys(errors)[0]))
    }
})(SignUpForm);
