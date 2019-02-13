import React from 'react';
import {connect} from 'react-redux';
import {geolocated} from 'react-geolocated';
import { fetchLocationSuccess } from '../../actions/geolocation';

export class Geolocator extends React.Component {

  componentDidUpdate(){
    // console.log(this.props);
    console.log(this.props.coords);
    this.props.dispatch(fetchLocationSuccess(this.props.coords))
  }

  render() {
    // console.log(this.props);
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