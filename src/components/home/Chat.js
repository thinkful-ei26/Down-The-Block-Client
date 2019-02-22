import React from 'react';
import { connect } from 'react-redux';
import socketClient from "socket.io-client"
import { API_BASE_URL } from '../../config'

import './Chat.css'

export class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [] //saving the chat to mongoDB
    }
    //get users first name

    //display it before the message
    // this.socket = socketClient(API_BASE_URL)


    //user_id of the person your chatting with
    //make a subroom
    this.socket = socketClient(API_BASE_URL);

    //send the message as well as the coordinates to the client.
    //then decide inside the function if the coordinates match up to display the message. if not dont display it
    this.socket.on("chat-message", (msg) => {
      this.setState({ messages: [...this.state.messages, msg] })
    })
  }
  render() {
    return (
      <section>
        <div className="chat"> <h1>Chat Messages</h1>
          <form autoComplete="off" className="chat-form" onSubmit={e => {
            e.preventDefault()
            this.socket.emit("chat-message", e.currentTarget.message.value)
            console.log("submitted")
          }} >
            <input className="type_msg" type="text" placeholder="Type your message" name="message"
            />
            <button type="submit">Submit</button>
          </form>
          {this.state.messages.map(message => {
            return <li // need to make key
            className="msg_container">{message}</li>
          })}</div>
      </section>
    );
  }
}

export default connect()(Chat)

