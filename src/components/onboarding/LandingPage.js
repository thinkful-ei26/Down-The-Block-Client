import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import LoginForm from './LoginForm';
import Navbar from '../common/Navbar';
import './onboarding.css';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's home
    if (props.loggedIn) {
        return <Redirect to="/home" />;
    }

    return (
        <main className="landing-page">
            <h2>Sign in Below</h2>
            <LoginForm />
            <h4>Don't have an account yet?</h4>
            <Link to="/register">Sign Up!</Link>
        </main>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);