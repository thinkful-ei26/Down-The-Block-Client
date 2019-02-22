import React from 'react';
import {connect} from 'react-redux';
import {display} from '../../actions/navigation'
import './sidebar.css'
import { fetchPosts } from '../../actions/posts';
import { fetchUsers } from '../../actions/users'

class Sidebar extends React.Component{

  componentDidMount (){
    this.props.dispatch(fetchUsers(this.props.coords));
  }

  showAllUsers(){
    if(this.props.users){
      return this.props.users.map((user,index)=> {
        return (
          <button
            onClick={()=>this.props.dispatch(display('chat'))}
            key={index}>{user.firstName}
          </button>
        )
      })
    }
  }

 render(){
   console.log('users are', this.props.users)
    return(
      <aside className="sidebar">
        <nav>
          <h4>Forums</h4>
          <button onClick={()=>this.props.dispatch(fetchPosts(this.props.coords, 'neighbors'))}>Neighors</button>
          <button onClick={()=>this.props.dispatch(fetchPosts(this.props.coords, 'city'))} >City</button>
          <h4>Chats</h4>
          {this.showAllUsers()}
        </nav>
      </aside>
    );
  }
}
const mapStateToProps = state => ({
  coords: state.geolocation.coords,
  display: state.nav.display,
  users: state.auth.users
});

export default connect(mapStateToProps)(Sidebar)