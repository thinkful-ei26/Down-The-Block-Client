import React from 'react';
import Navbar from '../common/Navbar';
import Sidebar from './Sidebar';
import Main from './Main';
// import requiresLogin from '../requires-login';

export default class HomePage extends React.Component{
  render(){
    return(
      <div className="home">
        <Navbar/>
        <Sidebar/>
        <Main/>
      </div>
    );
  }
}

// export default requiresLogin()(connect(mapStateToProps)(HomePage));