import React from 'react';
import {connect} from 'react-redux';
import Forum from './Forum';
import Layout from './Layout';
import './main.css'

export class Main extends React.Component{

  display(){
    return this.props.display==="neighbors" || this.props.display==="city" ? <Forum/> : <Layout />
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