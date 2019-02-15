import React from 'react';
import eyes from '../../img/eyes.png';
import './eyeanimation.css'

export default class EyeAnimation extends React.Component{
  render(){
    return( 
      <img className="eyes" src = {eyes} alt = "eye" />
    );
  }
}
