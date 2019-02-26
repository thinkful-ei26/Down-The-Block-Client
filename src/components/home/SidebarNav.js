import React from 'react';
import {connect} from 'react-redux';
import Sidebar from "react-sidebar";
import { display } from '../../actions/navigation'
import { fetchPosts } from '../../actions/posts';
import { fetchUsers } from '../../actions/users';
import { clearAuth } from '../../actions/auth';
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
      showAccount: false
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
    this.props.dispatch(display('loginUsername'));
    clearAuthToken();
  }

  toggleForumChildren(){
    this.setState({showForum: !this.state.showForum})
  }

  toggleChatChildren(){
    this.setState({showChat: !this.state.showChat})
  }

  toggleAccountChildren(){
    this.setState({showAccount: !this.state.showAccount})
  }

  // generateNav(){
  //   if(this.props.loggedIn){
  //     return (
  //       <React.Fragment>
  //         <h4><i class="fas fa-users-cog"></i> Account</h4>
  //         <button
  //            className="content"
  //            onClick={()=>{
  //             this.onSetSidebarOpen(false)
  //             this.props.dispatch(display('about'))
  //            }
  //           }
  //         >            
  //           About
  //         </button>
  //         <button
  //            className="content"
  //            onClick={()=>{
  //             this.onSetSidebarOpen(false)
  //             this.props.dispatch(display('settings'))
  //            }
  //           }
  //         >            
  //           Settings
  //         </button>
  //         <button id="logout" 
  //           className="content"
  //           onClick={() => {
  //             this.onSetSidebarOpen(false)
  //             this.logOut()
  //             }
  //           }>
  //           Logout
  //         </button>
  //       </React.Fragment>
  //     )
  //   }
  // }

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
              {/* <h4><i class="fas fa-edit"></i> Forums</h4> */}
              <button
                className="nav-parent"
                onClick={()=>{
                  this.toggleForumChildren()
                }}
              >
              <i class="fas fa-edit"></i>
                Forums
              </button>
              {this.state.showForum && <section className="forum-children">
                <button 
                  className="content" 
                  onClick={()=>{
                    this.onSetSidebarOpen(false)
                    this.props.dispatch(fetchPosts(this.props.coords, 'neighbors'))
                  }
                  }
                >Neighbors
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
              </section>}
              {/* <h4><i class="fas fa-comments"></i> Chats</h4> */}
              <button
                className="nav-parent"
                onClick={()=>{
                  this.toggleChatChildren()
                }}
              >
              <i class="fas fa-comments"></i> 
              Chats
              </button>
            
              {this.state.showChat && this.showAllUsers()}
              {/* {this.generateNav()} */}
              {/* <h4><i class="fas fa-users-cog"></i> Account</h4> */}
              <button
                className="nav-parent"
                onClick={()=>{
                  this.toggleAccountChildren()
                }}
              ><i class="fas fa-users-cog"></i>
              Account
              </button>
              {this.state.showAccount && <section className="account-children">
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
              </section>}
            </nav>
          }
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { position: 'fixed', top: 60, background: 'rgb(229, 228, 188)', width: 200, boxShadow: 0, webkitBoxShadow: 0} , root: {position: 'relative', boxShadow: 0}  }}
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

export default connect(mapStateToProps)(SidebarNav)