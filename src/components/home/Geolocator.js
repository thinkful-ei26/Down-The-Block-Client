import React from 'react';
import {connect} from 'react-redux';
import {geolocated} from 'react-geolocated';
import { fetchLocationSuccess, fetchLocationError } from '../../actions/geolocation';
import { showAnimation } from '../../actions/navigation';
import {setUserCoords} from '../../actions/users';

export class Geolocator extends React.Component {

  componentDidUpdate(prevProps){
    console.log(this.props.currentUser);
    console.log(prevProps.currentUser);
    if(this.props.coords){
      this.props.dispatch(fetchLocationSuccess(this.props.coords));
      this.props.dispatch(showAnimation(false));
      console.log('nothing ran');
      if(!prevProps.currentUser.coordinates && (!this.props.currentUser.coordinates || this.props.currentUser.coordinates.automatic === true)){
        console.log('NO LOCATION OR LOCATION SET AUTOMATICALLY');
        this.props.dispatch(setUserCoords(this.props.coords));
        this.props.dispatch(showAnimation(false));
      } 
    } else if(!this.props.coords && this.props.currentUser.coordinates){
      console.log(this.props);
      console.log('manual set running');
      this.props.dispatch(fetchLocationSuccess(this.props.currentUser.coordinates));
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

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default geolocated()(connect(mapStateToProps)(Geolocator));