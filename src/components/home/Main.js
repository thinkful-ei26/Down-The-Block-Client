import React from 'react';
import {connect} from 'react-redux';

import './main.scss';

import Forum from './Forum';
import SettingsPage from '../settings/SettingsPage'
import Layout from './Layout';
import About from '../common/About';


export class Main extends React.Component{

  display(){
    return this.props.display==="neighbors" || this.props.display==="city" ? <Forum/> :
    this.props.display==="settings" ? <SettingsPage/> : this.props.display==="about" ? <About/> : this.props.display==="chat" ? <Layout /> : <Forum />
  }

  render(){
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