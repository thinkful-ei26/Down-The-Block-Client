import React from 'react';
import Navbar from '../common/Navbar';
import Sidebar from './Sidebar';
import Main from './Main';

export default class HomePage extends React.Component{
  render(){
    return(
      <div className="home">
        <Navbar/>
        <Sidebar/>
        <Main/>
      </div>
    );
  }
}
