import React from 'react';
// import {connect} from 'react-redux';
// import {toggleNavbar} from '../actions/index';
// import {clearAuth} from '../actions/auth';
// import {clearAuthToken} from '../local-storage';
import { HashLink as Link } from 'react-router-hash-link';
import './navbar.css'

export default class Navbar extends React.Component{
  // componentWillUnmount(){
  //   this.props.dispatch(toggleNavbar(false));
  // }

  // logOut() {
  //   this.props.dispatch(clearAuth());
  //   clearAuthToken();
  // }

  navbarLinks(){
    let className = this.props.toggleNavbar ? "show link" : "dontshow link";
    let loggedIn = true; //placeholder

    if(loggedIn){
      console.log('LOGGED IN')
      return (
        <div className = "right">
          <Link className={className} to ="/about">About</Link>
          <button id="logout" className={className} onClick={() => this.logOut()}>Logout</button>
        </div>
      )
    }
    else{
      return (
        <div className = "right">
          <Link className={className} to ="/about">About</Link>
          <Link className={className} to ="/#login">Login</Link>
          <Link className={className} to ="/register/#register">Register</Link>
        </div>
      )
    }
  }

  render(){  
    return( 
      <nav className="main-navbar">
        <Link className="logo" to="/home">
          Neighborhood Watch
        </Link>
        {/* <button onClick={()=>this.props.dispatch(toggleNavbar())} className="icon right"><i className="fa fa-bars"></i></button> */}
        {this.navbarLinks()}
      </nav>
    );
  }
}

// const mapStateToProps = (state) => ({
//   toggleNavbar: state.pawfile.toggleNavbar,
//   loggedIn: state.auth.currentUser !== null
// });

// export default connect(mapStateToProps)(Navbar);