import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import SignupForm from './SignupForm';
import Navbar from '../common/Navbar'

export function RegistrationPage(props) {
    
    if (props.loggedIn) {
        return <Redirect to="/home" />;
    }

    return (
        <main className="landing-page">
            <h2>Sign up Below</h2>
            <SignupForm/><br/>
            <h4>Already Registered?</h4>
            <Link to="/">Login</Link>
        </main>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);