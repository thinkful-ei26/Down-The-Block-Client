import React from 'react';
import {connect} from 'react-redux';
import {geolocated} from 'react-geolocated';

import {fetchLocationSuccess, fetchLocationError} from '../../actions/geolocation';
import {showAnimation} from '../../actions/navigation';
import {setUserCoords} from '../../actions/users';
import HouseAnimation from '../common/HouseAnimation';

export class Geolocator extends React.Component {

  componentDidUpdate(prevProps){
    console.log('geolocator updated')
    console.log(this.props.coords);
    if(this.props.coords){
      console.log('normal coord access');
      this.props.dispatch(fetchLocationSuccess(this.props.coords));
      this.props.dispatch(showAnimation(false));
      console.log(this.props.coords);
      if(!prevProps.currentUser.coordinates && (!this.props.currentUser.coordinates || this.props.currentUser.coordinates.automatic === true)){
        this.props.dispatch(setUserCoords(this.props.coords));
        this.props.dispatch(showAnimation(false));
        console.log('updating user coords');
      } 
    } else if(!this.props.coords && this.props.currentUser.coordinates){
      console.log('accessing coords from user');
      this.props.dispatch(fetchLocationSuccess(this.props.currentUser.coordinates));
      this.props.dispatch(showAnimation(false));
    } else {
      console.log('fetch error is running')
      this.props.dispatch(fetchLocationError());
    }
  }

  componentDidMount(){
    
  }

  render() {
    if(!this.props.coords && !this.props.geoError){
      return <HouseAnimation/>
    }
    return( 
      null
    )
  }
  // return !this.props.isGeolocationAvailable
  //     ? <div>Your browser does not support Geolocation</div>
  //     : !this.props.isGeolocationEnabled
  //       ? <div>Geolocation is not enabled</div>
  //       : this.props.coords
  //         ? <table>
  //           <tbody>
  //             <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
  //             <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
  //             <tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>
  //             <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>
  //             <tr><td>speed</td><td>{this.props.coords.speed}</td></tr>
  //           </tbody>
  //         </table>
  //         : <div>Getting the location data&hellip; </div>;
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  geoError: state.geolocation.error,
  coords: state.geolocation.coords,
});

export default geolocated()(connect(mapStateToProps)(Geolocator));