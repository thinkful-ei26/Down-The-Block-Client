import React from 'react';
import { connect } from 'react-redux'
import Sidebar from './Sidebar';
import Main from './Main';
import Geolocator from './Geolocator';
import AddressForm from './AddressForm';
import requiresLogin from '../common/requires-login';


export class HomePage extends React.Component{
  render(){
    // console.log(this.state);
    return(
      <div className="home">
        <Geolocator/>
        {this.props.coords && <Sidebar/>}
        {this.props.coords && <Main/>}
        {/* {this.props.geoError && <AddressForm />} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  coords: state.geolocation.coords,
  geoError: state.geolocation.error
});

export default requiresLogin()(connect(mapStateToProps)(HomePage));