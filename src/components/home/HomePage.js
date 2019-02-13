import React from 'react';
import { connect } from 'react-redux'
import Navbar from '../common/Navbar';
import Sidebar from './Sidebar';
import Main from './Main';
import Geolocator from './Geolocator';
import requiresLogin from '../common/requires-login';


export class HomePage extends React.Component{
  render(){
    // console.log(this.state);
    return(
      <div className="home">
        <Sidebar/>
        <Geolocator/>
        <Main/>
      </div>
    );
  }
}

export default requiresLogin()(connect()(HomePage));