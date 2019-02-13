import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import LoginForm from './login-form'

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="landing-page">
      <h2 className="landing-h2">Sign in Bellow</h2>
      <LoginForm />
      <label className="landing-register">Don't have an account yet?</label>
      <Link to="/register" style={{ color: 'black' }}>
        Sign Up!
      </Link>
    </div>
  )
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(LandingPage)
