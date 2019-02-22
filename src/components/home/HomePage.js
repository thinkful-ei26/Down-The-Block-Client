import React from 'react';
import { connect } from 'react-redux'
import Sidebar from './Sidebar';
import Main from './Main';
import Geolocator from './Geolocator';
import AddressForm from './AddressForm';
import requiresLogin from '../common/requires-login';
import { showAnimation } from '../../actions/navigation';
import EyeAnimation from '../common/EyeAnimation'

export class HomePage extends React.Component{

  // componentDidMount(){
  //   document.title = 'Home';
  //   console.log('COMP MOUNT HOME PAGE')
  // }

  componentDidMount(){
    document.title = 'Home';
    console.log('COMP MOUNT HOME PAGE')
    // if(!this.props.coords){
    //   this.props.dispatch(showAnimation(true));
    // }
  }

  componentWillUnmount(){
    this.props.dispatch(showAnimation(false));
  }

  render(){
    console.log(this.props.geoError);
    return(
      <div className="home">
        <Geolocator/>
        {this.props.coords && <Sidebar/>}
        {this.props.coords && <Main/>}
        {this.props.showAnimation && <EyeAnimation/>}
        {this.props.geoError && !this.props.coords && <AddressForm />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  coords: state.geolocation.coords,
  geoError: state.geolocation.error,
  showAnimation: state.nav.showAnimation,
});

export default requiresLogin()(connect(mapStateToProps)(HomePage));