import React from 'react';
import {connect} from 'react-redux';
import {display} from '../../actions/navigation'
import './sidebar.css'
import { fetchPosts } from '../../actions/posts';

class Sidebar extends React.Component{
  
  setUser = (user)=>{
			this.props.setUser(user.username)
		}
	
  
  render(){
    return(
      <aside className="sidebar">
        <nav>
          <h4>Forums</h4>
          <button onClick={()=>this.props.dispatch(fetchPosts(this.props.coords, 'neighbors'))}>Neighors</button>
          <button onClick={()=>this.props.dispatch(fetchPosts(this.props.coords, 'city'))} >City</button>
          <h4>Chats</h4>
          <button  onClick={()=>{
              this.props.socket.emit('VERIFY_USER', this.props.username, this.setUser)
              this.props.dispatch(display('ChatContainer'))  
            }
          }>
            Users
          </button>
        </nav>
      </aside>
    );
  }
}
const mapStateToProps = state => ({
  coords: state.geolocation.coords,
  display: state.nav.display, 
  username: state.auth.currentUser.username,
  socket:state.socket.socket 
});

export default connect(mapStateToProps)(Sidebar)