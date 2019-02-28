import React from 'react';
import { connect } from 'react-redux'
import SidebarNav from './SidebarNav';
import Main from './Main';
import Geolocator from './Geolocator';
import AddressForm from './AddressForm';
import requiresLogin from '../common/requires-login';
import { display } from '../../actions/navigation'
import { showAnimation } from '../../actions/navigation';
import EyeAnimation from '../common/EyeAnimation'

export class HomePage extends React.Component{

  componentWillMount(){
    document.title = 'Home';
    if(!this.props.coords){
      this.props.dispatch(showAnimation(true));
    }
    this.props.socket.emit('USER_CONNECTED', this.props.user);
  }

  componentWillUnmount(){
    this.props.dispatch(showAnimation(false));
  }

<<<<<<< HEAD
  // componentDidMount(){
  //   this.props.dispatch(display('neighbors'));
=======
  // setUser = ()=>{
  //   const { socket, user } = this.props; 
  //   console.log('PROPS FROM HOMEPAGE IN SETUSER', this.props);
	// 	socket.emit('USER_CONNECTED', user);
>>>>>>> private-messaging-final
  // }
  
  render(){
    return(
      <div id="home" className="home">
        <Geolocator/>
        {this.props.coords && 
        <SidebarNav 
          // setUser={this.setUser}
          // setActiveChat={this.setActiveChat}
          // onSendPrivateMessage={this.sendOpenPrivateMessage}
        />}
        {this.props.coords && <Main/>}
        {this.props.showAnimation && <EyeAnimation/>}
        {this.props.geoError && !this.props.coords && <AddressForm />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  coords: state.geolocation.coords,
  geoError: state.geolocation.error,
  showAnimation: state.nav.showAnimation,
  user: state.auth.currentUser,
  socket:state.socket.socket,
  display: state.nav.display 
});

export default requiresLogin()(connect(mapStateToProps)(HomePage));