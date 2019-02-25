import React from 'react';
import {connect} from 'react-redux';
import {toggleNavbar, focusOn} from '../../actions/navigation';
import { clearAuth } from '../../actions/auth';
import { clearAuthToken } from './local-storage';
import { HashLink as Link } from 'react-router-hash-link';
import './navbar.css'

export class Navbar extends React.Component{
  logOut() {
    this.props.dispatch(clearAuth());
    this.props.dispatch(toggleNavbar(false));
    clearAuthToken();
  }

  onClick(focus=""){
    this.props.dispatch(toggleNavbar(false));
    this.props.dispatch(focusOn(focus));
  }

  navbarLinks(){
    let className = this.props.toggleNavbar ? "show link" : "dontshow link";

    if(this.props.loggedIn){
      return (
        <div className = "right">
          <Link 
            onClick={()=>this.props.dispatch(toggleNavbar(false))} 
            className={className} 
            to ="/home">
            Home
          </Link>
          <Link 
            onClick={()=>this.props.dispatch(toggleNavbar(false))} 
            className={className} 
            to ="/about">
            About
          </Link>
          <Link 
            onClick={()=>this.props.dispatch(toggleNavbar(false))} 
            className={className} 
            to ="/settings">
            Settings
          </Link>
          <button id="logout" 
            className={className} 
            onClick={() => this.logOut()}>
            Logout
          </button>
        </div>
      )
    }
    else{
      return (
        <div className = "right">
          <Link 
            onClick={()=>this.props.dispatch(toggleNavbar(false))} 
            className={className} 
            to ="/#about">
            About
          </Link>
          <Link 
            onClick={()=>this.onClick('login-username')} 
            className={className} 
            to ="/#login">
            Login
          </Link>
          <Link 
            onClick={()=>this.onClick('registerUsername')} 
            className={className} 
            to ="/#register">
            Register
          </Link>
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
        <button onClick={()=>this.props.dispatch(toggleNavbar())} className="icon right"><i className="fa fa-bars"></i></button>
        {this.navbarLinks()}
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  toggleNavbar: state.nav.toggleNavbar,
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Navbar);