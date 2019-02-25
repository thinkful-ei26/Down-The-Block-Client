import React from 'react';
import {connect} from 'react-redux';
import Forum from './Forum';
import Chat from './Chat'
import './main.css'
import { SettingsPage } from '../settings/SettingsPage';

export class Main extends React.Component{

  display(){
    return this.props.display==="neighbors" || this.props.display==="city" ? <Forum/> : this.props.display==="settings" ? <SettingsPage/> : <Chat/>
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
  display: state.nav.display 
});

export default connect(mapStateToProps)(Main)