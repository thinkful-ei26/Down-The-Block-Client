import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import LoginForm from './LoginForm';
import Navbar from '../common/Navbar'

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's home
    if (props.loggedIn) {
        return <Redirect to="/home" />;
    }

    return (
        <div className="landing-page">
            {/* <Navbar/> */}
            <h2 className="landing-h2">Sign in Below</h2>
            <LoginForm />
            <label className="landing-register">Don't have an account yet?</label>
            <Link to="/register" style={{color: 'white'}}>Sign Up!</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);