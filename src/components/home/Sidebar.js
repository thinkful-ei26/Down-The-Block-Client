import React from 'react';
import {connect} from 'react-redux';
import {display} from '../../actions/NavigationActions'
import './sidebar.css'

class Sidebar extends React.Component{
  render(){
    return(
      <aside className="sidebar">
        <nav>
          <h4>Forums</h4>
          <button onClick={()=>this.props.dispatch(display('neighbor-forum'))}>Neighors</button>
          <button onClick={()=>this.props.dispatch(display('city-forum'))} >City</button>
          <h4>Chats</h4>
        </nav>
      </aside>
    );
  }
}

export default connect()(Sidebar)