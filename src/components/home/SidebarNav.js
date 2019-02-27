import React from 'react';
import {connect} from 'react-redux';
import Sidebar from "react-sidebar";
import { display } from '../../actions/navigation'
import { fetchPosts } from '../../actions/posts';
import { fetchUsers } from '../../actions/users';
import { clearAuth } from '../../actions/auth';
import { setActiveChat } from '../../actions/chatMessages'; 
import { clearAuthToken } from '../common/local-storage';
import './sidebar.scss';

const mql = window.matchMedia(`(min-width: 900px)`);

class SidebarNav extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  componentDidMount (){
    this.props.dispatch(fetchUsers(this.props.coords));
  }

  // setUser = (user)=>{
  //   this.props.setUser(user)
  // }

  sendOpenPrivateMessage = (reciever) => {
		const { socket, currentUser } = this.props
		socket.emit('PRIVATE_MESSAGE', {reciever: reciever.username, sender:currentUser})
	}
  
  showAllUsers(){
    if(this.props.users){
      return this.props.users.map((user,index)=> {
        return (
          <button
            className="content"
            onClick={()=>{
              
              console.log('USER BEING CLICKED IS:', user); 
              this.onSetSidebarOpen(false);
              this.props.socket.emit('VERIFY_USER', this.props.currentUser);
              this.sendOpenPrivateMessage(user);
              this.props.dispatch(display('ChatContainer')); 
              }
            }
            key={index}>{user.firstName}
          </button>
        )
      })
    }
  }

  logOut() {
    this.props.dispatch(clearAuth());
    this.props.dispatch(display('loginUsername'));
    clearAuthToken();
  }

  generateNav(){
    if(this.props.loggedIn){
      return (
        <React.Fragment>
          <h4>Account</h4>
          <button
             className="content"
             onClick={()=>{
              this.onSetSidebarOpen(false)
              this.props.dispatch(display('about'))
             }
            }
          >            
            About
          </button>
          <button
             className="content"
             onClick={()=>{
              this.onSetSidebarOpen(false)
              this.props.dispatch(display('settings'))
             }
            }
          >            
            Settings
          </button>
          <button id="logout" 
            className="content"
            onClick={() => {
              this.onSetSidebarOpen(false)
              this.logOut()
              }
            }>
            Logout
          </button>
        </React.Fragment>
      )
    }
  }

 render(){
    return(
      <React.Fragment>
        {!this.state.sidebarDocked && 
        <button 
          className="open-sidebar" 
          onClick={() => this.onSetSidebarOpen(!this.state.sidebarOpen)}>
          <i className="fa fa-bars"></i>
        </button>}
        <Sidebar
          sidebar=
          {
            <nav className="sidebar">
              <h4>Forums</h4>
              <button 
                className="content" 
                onClick={()=>{
                  this.onSetSidebarOpen(false)
                  this.props.dispatch(fetchPosts(this.props.coords, 'neighbors'))
                }
                }
              >Neighors
              </button>
              <button 
                className="content" 
                onClick={()=>{
                this.onSetSidebarOpen(false)
                this.props.dispatch(fetchPosts(this.props.coords, 'city'))
                } 
              }
              >City
              </button>
              <h4>Chats</h4>
              {this.showAllUsers()}
              {this.generateNav()}
            </nav>
          }
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { position: 'fixed', top: 60, background: 'rgb(229, 228, 188)', width: 200, boxShadow: 'none', webkitBoxShadow: 'none'} , root: {position: 'relative', boxShadow: 'none'}  }}
        >
        </Sidebar>
        </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  coords: state.geolocation.coords,
  display: state.nav.display,
  users: state.auth.users,
  loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser,
  socket:state.socket.socket, 
  chats:state.chatMessages.chats, 
  activeChat: state.chatMessages.activeChat
});

export default connect(mapStateToProps)(SidebarNav)