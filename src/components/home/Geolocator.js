import React from 'react';
import {connect} from 'react-redux';
import {geolocated} from 'react-geolocated';
import { fetchLocationSuccess, fetchLocationError } from '../../actions/geolocation';
import { showAnimation } from '../../actions/navigation';

export class Geolocator extends React.Component {

  componentDidUpdate(){
    // console.log(this.props);
    console.log(this.props.coords);
    if(this.props.coords){
      this.props.dispatch(fetchLocationSuccess(this.props.coords))
      this.props.dispatch(showAnimation(false));
    } else {
      this.props.dispatch(fetchLocationError())
    }
  } 

  componentDidMount(){
    if(!this.props.coords){
      this.props.dispatch(showAnimation(true));
    }
  }

  render() {
    return( 
      // !this.props.isGeolocationAvailable 
      // ? <div>Your browser does not support geolocation</div>
      // : !this.props.isGeolocationEnabled
      //   ?<div>Geolocation is not enabled</div>
      //   : this.props.coords
      //     ? null
      //     : <div>Getting the location data&hellip; </div>
      null
    )
  }
}

export default geolocated()(connect()(Geolocator));