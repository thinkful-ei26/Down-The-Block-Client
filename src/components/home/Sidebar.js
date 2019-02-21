import React from 'react';
import {connect} from 'react-redux';
import {display} from '../../actions/navigation'
import './sidebar.css'
import { fetchPosts } from '../../actions/posts';
import REACT_APP_API_BASE_URL from '../../config'

class Sidebar extends React.Component{
  constructor(props){
    super(props)
    this.state={
      users: {},

    }
  }

  componentDidMount = async () => {
    const response = await fetch(`http://localhost:8080/auth/users/`)
    const json = await response.json()
    this.setState({ users: json });
  }

  getListOfUsers= ()=>{
    let arrayofuserobjects = []
      for(let name in this.state.users){
        arrayofuserobjects.push(this.state.users[name])
        console.log(this.state.users[name].id, this.capitalizeFirstLetter(this.state.users[name].username))
      }
      return arrayofuserobjects
  }
 capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
 render(){
    return(
      <aside className="sidebar">
        <nav>
          <h4>Forums</h4>
          <button onClick={()=>this.props.dispatch(fetchPosts(this.props.coords, 'neighbors'))}>Neighors</button>
          <button onClick={()=>this.props.dispatch(fetchPosts(this.props.coords, 'city'))} >City</button>
          <h4>Chats</h4>
          <button  onClick={()=>this.props.dispatch(display('chat'))}>Users</button>
          <button onClick={()=>{this.getListOfUsers()}}>Get users</button>
          <ul>

          </ul>
        </nav>
      </aside>
    );
  }
}
const mapStateToProps = state => ({
  coords: state.geolocation.coords,
  display: state.nav.display
});

export default connect(mapStateToProps)(Sidebar)