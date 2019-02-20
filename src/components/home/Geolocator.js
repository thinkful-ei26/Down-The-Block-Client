import React from 'react';
import {connect} from 'react-redux';
import {geolocated} from 'react-geolocated';
import { fetchLocationSuccess, fetchLocationError } from '../../actions/geolocation';
import { showAnimation } from '../../actions/navigation';

export class Geolocator extends React.Component {

  componentDidUpdate(){
    console.log(this.props.coords);
    if(this.props.coords){
      this.props.dispatch(fetchLocationSuccess(this.props.coords))
      this.props.dispatch(showAnimation(false));
    } else {
      console.log("IN COMP DID UPDATE GEOLOCATOR")
      this.props.dispatch(fetchLocationError());
      // this.props.dispatch(showAnimation(true));
    }
  } 

  componentDidMount(){
    if(!this.props.coords){
      console.log("IN COMP DID MOUNT GEOLOCATOR")
      // this.props.dispatch(showAnimation(true));
    }
  }

  render() {
    return( 
      null
    )
  }
}

export default geolocated()(connect()(Geolocator));