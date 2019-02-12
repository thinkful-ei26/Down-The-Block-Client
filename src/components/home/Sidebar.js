import React from 'react';
import Navbar from '../common/Navbar';
import './sidebar.css'
// import requiresLogin from '../requires-login';

export default class Sidebar extends React.Component{
  render(){
    return(
      <aside className="sidebar">
        <nav>
          <h4>Forums</h4>
          <button>Neighors</button>
          <button>City</button>
          <h4>Chats</h4>
        </nav>
      </aside>
    );
  }
}

// export default requiresLogin()(connect(mapStateToProps)(HomePage));