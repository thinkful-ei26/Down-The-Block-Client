import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import LogInForm from './LogInForm';
import About from '../common/About';
import SignUpForm from './SignUpForm';
import './onboarding.css';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's home
    if (props.loggedIn) {
        return <Redirect to="/home" />;
    }

    return (
        <main className="landing-page">
            <h1>Welcome To Neighborhood Watch</h1>
            <About/>
            <section className="form-section">
                <LogInForm />
                <SignUpForm/>
            </section>
        </main>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);