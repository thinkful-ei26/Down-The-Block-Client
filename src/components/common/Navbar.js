import React from 'react';
import {connect} from 'react-redux';
import { focusOn} from '../../actions/navigation';
import { HashLink as Link } from 'react-router-hash-link';
import './navbar.scss'

export class Navbar extends React.Component{
  onClick(focus=""){
    this.props.dispatch(focusOn(focus));
  }

  navbarLinks(){

    if(!this.props.loggedIn){
      return (
        <div className = "right">
          <Link 
            className="link"
            onClick={()=>this.onClick('login-username')} 
            to ="/#login">
            Login
          </Link>
          <Link 
            className="link"
            onClick={()=>this.onClick('registerUsername')} 
            to ="/#register">
            Register
          </Link>
        </div>
      )
    }
  }

  render(){  
    let className= !this.props.loggedIn ? "landing-page-logo" : "logo";
    return( 
      <nav className="main-navbar">
        <Link className={`${className}`} to="/home">
          <i className="fas fa-home"></i> DownTheBlock
        </Link>
        <p className="tagline">Your Neighborhood At Your Fingertips</p>
        {this.navbarLinks()}
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Navbar);