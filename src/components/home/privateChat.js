import React, { Component } from 'react';

export default class PrivateChat extends Component {
	constructor(props) {
	  super(props);	
	
	  this.state = {
	  	chats:[]
	  };
	}

	componentDidMount() {
		const { socket } = this.props.socket
        //mount sockets
    }
    //takes in the reciever user-object that contains their socket 
    // sends back the reciever user-object as well as the sender user-object 
    openPrivateMessage = (reciever) => {
		const { socket, user } = this.props
		socket.emit('PRIVATE_MESSAGE', {reciever, sender:user})
    }
    //takes in a chatId, checks the chats array for the chatId. If the chats array contains the chatId, push the message into chat.messages
    //set the state to the new array of chats that contains the new message
    addMessageToChat = (chatId) => {
		return message => {
			const { chats } = this.state
			let newChats = chats.map((chat) => {
				if(chat.id === chatId) {
                    chat.messages.push(message)
                }
				return chat
			})
			this.setState({chats:newChats})
		}
    }
    //send the new message along with the chatId to the socket listener on backend
    sendMessage = (chatId, message) => {
		const { socket } = this.props
		socket.emit('MESSAGE_SENT', {chatId, message} )
	}
}