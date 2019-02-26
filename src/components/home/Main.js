import React from 'react';
import {connect} from 'react-redux';
import Forum from './Forum';
import Chat from './Chat'
import Layout from './Layout';
import './main.scss'
import SettingsPage from '../settings/SettingsPage';
import About from '../common/About';
import './main.scss';

export class Main extends React.Component{

  display(){
    return this.props.display==="neighbors" || this.props.display==="city" ? <Forum/> : this.props.display==="settings" ? <SettingsPage/> : this.props.display==="about" ? <About/> : <Layout />
  }

  render(){
    console.log('CURRENT USER IN MAIN', this.props.currentUser)
    return(
      <main className="main">
        {this.display()}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  display: state.nav.display,
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps)(Main)