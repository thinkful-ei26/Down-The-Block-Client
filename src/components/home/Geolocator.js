import React from 'react';
import {connect} from 'react-redux';
import {geolocated} from 'react-geolocated';
import { fetchLocationSuccess } from '../../actions/geolocation';
import { showAnimation } from '../../actions/navigation';

export class Geolocator extends React.Component {

  componentDidUpdate(){
    this.props.dispatch(fetchLocationSuccess(this.props.coords));
    this.props.dispatch(showAnimation(false));
  }

  componentDidMount(){
    if(!this.props.coords){
      this.props.dispatch(showAnimation(true));
    }
  }

  render() {
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