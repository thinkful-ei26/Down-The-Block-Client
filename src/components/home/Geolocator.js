import React from 'react';
import {connect} from 'react-redux';
import {geolocated} from 'react-geolocated';

export class Geolocator extends React.Component {

  handleLocationReceipt(){
    
  }

  render() {
    console.log(this.props);
    return( 
      !this.props.isGeolocationAvailable 
      ? <div>Your browser does not support geolocation</div>
      : !this.props.isGeolocationEnabled
        ?<div>Geolocation is not enabled</div>
        : this.props.coords
          ? null
          : <div>Getting the location data&hellip; </div>
    )
  }
}

export default geolocated()(connect()(Geolocator));