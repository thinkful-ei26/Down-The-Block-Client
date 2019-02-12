import React from 'react';
import './forum-header.css';

export default class Forum extends React.Component{
  
  whichForum(){
    return (
      this.props.type === "neighbor-forum" ? 
      <h1>What's Happening In Your Neighborhood</h1> : 
      <h1>What's Happening In Your City</h1>
    );
  }

  render(){
    return(
      <header className="forum-header"> 
        {this.whichForum()}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  display: state.nav.display 
});

