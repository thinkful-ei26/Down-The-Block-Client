import React from 'react';
import {connect} from 'react-redux';

import './main.scss';

import Forum from './Forum';
import SettingsPage from '../settings/SettingsPage'
import Chat from './Chat';
import About from '../common/About';


export class Main extends React.Component{

  display(){
    return this.props.display==="neighbors" || this.props.display==="city" ? <Forum/> :
    this.props.display==="settings" ? <SettingsPage/> : this.props.display==="about" ? <About/> : this.props.display==="chat" ? <Chat namespace={this.props.namespace}/> : <Forum />
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
  namespace: state.chatMessages.namespace,
});

export default connect(mapStateToProps)(Main)