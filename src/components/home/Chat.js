import React from 'react';
import {connect} from 'react-redux';

export class Chat extends React.Component{

  render(){
    return(
      <section className="chat">
        CHAT HERE
      </section>
    );
  }
}

export default connect()(Chat)

