import React from 'react';
import eyes from '../../img/eyes.png';
import './eyeanimation.css'

export default class EyeAnimation extends React.Component{
  constructor(props){
    super(props)

    this.state={
      class: 'eyes-left',
    }
  }
  
  componentDidMount(){
    this.tick = setInterval(()=>this.setState({class: this.state.class==='eyes-right' ? 'eyes-left' : 'eyes-right'}), 1000)
  }

  componentWillUnmount(){
    clearInterval(this.tick);
  }

  render(){
    return( 
      <img className={this.state.class} src = {eyes} alt = "eye" />
    );
  }
}
