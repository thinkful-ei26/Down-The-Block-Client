import React from 'react';
import {connect} from 'react-redux';
import { Redirect} from 'react-router-dom';
import SignUpForm from './SignUpForm';
import './onboarding.css';

export function RegistrationPage(props) {
    
    if (props.loggedIn) {
        return <Redirect to="/home" />;
    }

    return (
        <main className="landing-page">
            <SignUpForm/><br/>
        </main>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);