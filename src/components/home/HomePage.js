import React from 'react';
import { connect } from 'react-redux'
import SidebarNav from './SidebarNav';
import Main from './Main';
import Geolocator from './Geolocator';
import AddressForm from './AddressForm';
import requiresLogin from '../common/requires-login';
import { showAnimation } from '../../actions/navigation';
import EyeAnimation from '../common/EyeAnimation'
import HouseAnimation from '../common/HouseAnimation';

export class HomePage extends React.Component{

  componentWillMount(){
    document.title = 'Home';
  }

  componentWillUnmount(){
    this.props.dispatch(showAnimation(false));
  }
  
  render(){
    //while waiting to "ask" user for location

    return(
      <div id="home" className="home">
        <Geolocator/>
        {this.props.coords && <SidebarNav setUser={this.setUser}/>}
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