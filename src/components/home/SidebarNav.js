import React from 'react';
import {connect} from 'react-redux';
import Sidebar from "react-sidebar";
import requiresLogin from '../common/requires-login';
import { display } from '../../actions/navigation'
import { fetchPosts } from '../../actions/posts';
import { fetchUsers } from '../../actions/users';
import { clearAuth } from '../../actions/auth';
import {Link} from 'react-router-dom';
import { clearAuthToken } from '../common/local-storage';
import './sidebar.scss';

const mql = window.matchMedia(`(min-width: 900px)`);

class SidebarNav extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      showForum: true,
      showChat: true,
      showAccount: true,
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

  setUser = (user)=>{
    this.props.setUser(user.username)
  }


  setUser = ()=>{
    const { socket, user } = this.props; 
    console.log('PROPS FROM HOMEPAGE IN SETUSER', this.props);
        socket.emit('USER_CONNECTED', user);
  }
  
  showAllUsers(){
    if(this.props.users){
      return this.props.users.map((user,index)=> {
        return (
          <button
            className="content"
            onClick={()=>{
              this.onSetSidebarOpen(false)
              this.props.socket.emit('VERIFY_USER', this.props.currentUser.username, this.setUser)
              this.props.dispatch(display('ChatContainer'))
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
    clearAuthToken();
  }

  toggleCategory(category){
    this.setState({[category]: !this.state[category]});
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
              <button
                className="nav-parent"
                onClick={()=>{
                  this.toggleCategory('showForum')
                }}
              >
              <i className="fas fa-edit"></i> Forums
              </button>
              {this.state.showForum && <section className="forum-children">
                <Link 
                  to="/home"
                  className="content" 
                  onClick={()=>{
                    this.onSetSidebarOpen(false)
                    this.props.dispatch(fetchPosts(this.props.coords, 'neighbors'))
                  }
                  }>Neighbors
                </Link>
                <Link 
                  to="/home"
                  className="content" 
                  onClick={()=>{
                  this.onSetSidebarOpen(false)
                  this.props.dispatch(fetchPosts(this.props.coords, 'city'))
                  } 
                }
                >City
                </Link>
              </section>}
              <button
                className="nav-parent"
                onClick={()=>{
                  this.toggleCategory('showChat')
                }}
              ><i className="fas fa-comments"></i> Chats
              </button>
              {this.state.showChat && this.showAllUsers()}
              <button
                className="nav-parent"
                onClick={()=>{
                  this.toggleCategory('showAccount')
                }}
              ><i className="fas fa-users-cog"></i> Account
              </button>
              {this.state.showAccount && <section className="account-children">
                <Link
                  to="/home"
                  className="content"
                  onClick={()=>{
                    this.onSetSidebarOpen(false)
                    this.props.dispatch(display('about'))
                  }
                  }
                >            
                  About
                </Link>
                <Link
                  className="content"
                  to="/home"
                  onClick={()=>{
                    this.onSetSidebarOpen(false)
                    this.props.dispatch(display('settings'))
                  }
                  }
                >            
                  Settings
                </Link>
                <button id="logout" 
                  className="content"
                  onClick={() => {
                    this.onSetSidebarOpen(false)
                    this.logOut()
                    }
                  }>
                  Logout
                </button>
              </section>}
            </nav>
          }
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { position: 'fixed', top: 60, background: 'rgb(229, 228, 188)', width: 200, boxShadow: 0, WebkitBoxShadow: 0} , root: {position: 'relative', boxShadow: 0}  }}
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
});

export default requiresLogin()(connect(mapStateToProps)(SidebarNav));