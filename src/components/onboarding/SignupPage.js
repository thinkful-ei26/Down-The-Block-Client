import React from 'react';
import {connect} from 'react-redux';
import { Redirect} from 'react-router-dom';
<<<<<<< HEAD
import SignupForm from './SignUpForm';
import './onboarding.css'
=======
import SignupForm from './SignupForm';
import './onboarding.css';
>>>>>>> b6625e1e0f404554552aef25dff6cbe8cbf18124

export function RegistrationPage(props) {
    
    if (props.loggedIn) {
        return <Redirect to="/home" />;
    }

    return (
        <main className="landing-page">
            <SignupForm/><br/>
        </main>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);