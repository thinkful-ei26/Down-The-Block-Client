import React from 'react';
import {geolocated, geoPropTypes} from 'react-geolocated';

export class Demo extends React.Component {
  render() {
    console.log(this.props);
    return( 
      !this.props.isGeolocationAvailable 
      ? <div>Your browser does not support geolocation</div>
      : !this.props.isGeolocationEnabled
        ?<div>Geolocation is not enabled</div>
        : this.props.coords
          ? <table>
            <tbody>
              <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
              <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
              <tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>
              <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>
              <tr><td>speed</td><td>{this.props.coords.speed}</td></tr>
            </tbody>
          </table>
          : <div>Getting the location data&hellip; </div>
    )
  }
}

// export default geolocated({
//   positionOptions: {
//     enableHighAccuracy: false,
//   },
//   userDecisionTimeout: 5000,
// })(Demo);

Demo.propTypes = Object.assign({}, Demo.propTypes, geoPropTypes);

export default geolocated({
  positionOptions: {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: Infinity,
  },
  watchPosition: false,
  userDecisionTimeout: null,
  suppressLocationOnMount: false,
  geolocationProvider: navigator.geolocation
})(Demo);