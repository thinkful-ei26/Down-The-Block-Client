import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import './onboarding.css';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's home
    if (props.loggedIn) {
        return <Redirect to="/home" />;
    }

    return (
        <main className="landing-page">
            <section className="parallax">
            </section>
            <section className="intro">
                <h1>Find Out What's Going On In Your Neighborhood</h1>
                <section className="form-section">
                    <LogInForm />
                    <SignUpForm/>
                </section>
            </section>
            
        </main>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);