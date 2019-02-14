import React from 'react';
import {connect} from 'react-redux';
import socketClient from "socket.io-client"

export class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state={
      messages: []
    }
    this.socket = socketClient("http://localhost:8080")
    this.socket.on("chat-message", (msg)=>{
      this.setState({messages: [...this.state.messages, msg]})})
  }
  render(){
    return(
      <section className="chat">
        <h1>hello world</h1>
        <form onSubmit={e => {
          e.preventDefault()
          this.socket.emit("chat-message", e.currentTarget.message.value )
          console.log("submitted")
        }} >
          <input type="text" placeholder="Type Message" name="message"
          />
          <button type="submit">Submit</button>
        </form>
        {this.state.messages.map(message=>{
          return <li>{message}</li>
        })}
      </section>
    );
  }
}

export default connect()(Chat)

