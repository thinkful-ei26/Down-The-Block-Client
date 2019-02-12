import React from 'react';
import {connect} from 'react-redux';

export class Forum extends React.Component{
  
  whichForum(){
    return this.props.display === "neighbor-forum" ? <p>NEIGHBORS FORUM</p> : <p>CITY FORUM</p>
  }

  render(){
    return(
      <section className="forum">
        {this.whichForum()}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  display: state.nav.display 
});

export default connect(mapStateToProps)(Forum)

