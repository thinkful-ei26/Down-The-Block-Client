import React from 'react';

export default class Forum extends React.Component{
  
  whichForum(){
    return this.props.type === "neighbor-forum" ? <p>NEIGHBORS FORUM</p> : <p>CITY FORUM</p>
  }

  render(){
    return(
      <header> 
        {this.whichForum()}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  display: state.nav.display 
});

