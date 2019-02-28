import React from 'react';
import {connect} from 'react-redux';
import {geolocated} from 'react-geolocated';

import {fetchLocationSuccess, fetchLocationError} from '../../actions/geolocation';
import {showAnimation} from '../../actions/navigation';
import {setUserCoords} from '../../actions/users';
import HouseAnimation from '../common/HouseAnimation';

export class Geolocator extends React.Component {

  componentDidUpdate(prevProps){
    if(this.props.coords){
      this.props.dispatch(fetchLocationSuccess(this.props.coords));
      this.props.dispatch(showAnimation(false));
      if(!prevProps.currentUser.coordinates && (!this.props.currentUser.coordinates || this.props.currentUser.coordinates.automatic === true)){
        this.props.dispatch(setUserCoords(this.props.coords));
        this.props.dispatch(showAnimation(false));
      } 
    } else if(!this.props.coords && this.props.currentUser.coordinates){
      this.props.dispatch(fetchLocationSuccess(this.props.currentUser.coordinates));
      this.props.dispatch(showAnimation(false));
    } else {
      this.props.dispatch(fetchLocationError());
    }
  } 

  render() {
    return( 
      <HouseAnimation/>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default geolocated()(connect(mapStateToProps)(Geolocator));