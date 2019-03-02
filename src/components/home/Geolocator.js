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

    return( 
      null
    )
  }
 
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

export default geolocated()(connect(mapStateToProps)(Geolocator));