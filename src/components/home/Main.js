import React from 'react';
import './main.css'
// import requiresLogin from '../requires-login';

export default class Main extends React.Component{
  render(){
    return(
      <main className="forum">
        {/* depending on the state, render either the neighbor forum, city forum, or specific chat */}
      </main>
    );
  }
}

// export default requiresLogin()(connect(mapStateToProps)(HomePage));