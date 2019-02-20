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

  componentWillMount(){
    if(!this.props.coords){
      this.props.dispatch(showAnimation(true));
    }
  }

  render(){
    console.log(this.props.geoError);
    console.log('SHOWANIMATION IS', this.props.showAnimation)
    return(
      <div className="home">
        <Geolocator/>
        {this.props.coords && <Sidebar/>}
        {this.props.coords && <Main/>}
        {this.props.showAnimation && <EyeAnimation/>}
        {this.props.geoError && <AddressForm />}
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