import React from 'react';
import { connect } from 'react-redux';
import socketClient from "socket.io-client"
import {API_BASE_URL} from '../../config'
import './Chat.css'

export class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
    this.socket = socketClient(API_BASE_URL)
    this.socket.on("chat-message", (msg) => {
      this.setState({ messages: [...this.state.messages, msg] })
    })
  }
  render() {
    return (
      <section className="chat">
        <div className="chat"> <h1>Chat Messages</h1>
          <form onSubmit={e => {
            e.preventDefault()
            this.socket.emit("chat-message", e.currentTarget.message.value)
            console.log("submitted")
          }} >
            <input className="type_msg" type="text" placeholder="Type your message" name="message"
            />
            <button type="submit">Submit</button>
          </form>
          {this.state.messages.map(message => {
            return <li className="msg_container">{message}</li>
          })}</div>
      </section>
    );
  }
}

export default connect()(Chat)

