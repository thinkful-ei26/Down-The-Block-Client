import React from 'react';
import { connect } from 'react-redux'
import Navbar from '../common/Navbar';
import Sidebar from './Sidebar';
import Main from './Main';
import requiresLogin from '../common/requires-login';


export class HomePage extends React.Component{
  render(){
    return(
      <div className="home">
        <Sidebar/>
        <Main/>
      </div>
    );
  }
}

export default requiresLogin()(connect()(HomePage));