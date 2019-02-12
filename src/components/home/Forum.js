import React from 'react';
import ForumHeader from './ForumHeader';
import {connect} from 'react-redux';

export class Forum extends React.Component{

  render(){
    return(
      <section className="forum">
        <ForumHeader type={this.props.display} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  display: state.nav.display 
});

export default connect(mapStateToProps)(Forum)

