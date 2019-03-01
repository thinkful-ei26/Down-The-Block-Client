import React from 'react'; 
import { connect } from 'react-redux';
import moment from 'moment';
import {updateChat, sendMessage} from '../../actions/chatMessages';
import socketClient from "socket.io-client";
import { API_BASE_URL } from '../../config'; 
import Message from './Message';

export class Chat extends React.Component {
    constructor(props){
      super(props);

      this.message='';

      this.socket=''
    }

    componentDidMount(){
        window.scrollTo(0, document.body.scrollHeight);
        //create the namespaced socket
        fetch(`${API_BASE_URL}/messages/${this.props.namespace}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.props.authToken}`
          },
        })
        .then(res => res.json())
        .then(() =>{ 
          this.socket= socketClient(`${API_BASE_URL}/${this.props.namespace}`);
          this.socket.on('chat', chat => {
            console.log('SOCKET RECEIVED', chat);
            this.props.dispatch(updateChat(chat));
          })
        })
        .catch(err=>console.log("ERROR",err));
      }

      componentWillUnmount(){
        if(this.socket){
          this.socket.off('chat');
        }
      }

      onSubmit(e) {
        e.preventDefault();
        if(this.message.value.trim()===""){
            return;
        }
                
        let date = moment().format('LLLL');
        this.props.dispatch(sendMessage(this.props.namespace, this.message.value, date, this.props.currentUser.id, this.props.chat.id));   
        this.message.value="";   

    } 

    render() {   
      if(!this.props.namespace || !this.props.chat){
        return null;
      }

      let messages = this.props.chat.messages.map(message=><Message message={message}/>);
      // let messages = this.props.chat.messages.map(message=><p>{message.content}</p>);

      return (
        <div style={{paddingTop:20}}>
          {messages}
          <form
            onSubmit={(e)=> this.onSubmit(e)}
          >
          <textarea 
              ref={input => this.message = input}
              type="textarea" 
              id="message" 
              name="message" 
              placeholder="Write a Message"
          />

          <button 
            type="submit" 
          >
            Send
          </button>
          </form>
        </div>
      )
    }
}

const mapStateToProps = state => {
    return {
      currentUser: state.auth.currentUser,
      chat: state.chatMessages.chat,
      authToken: state.auth.authToken,
    }
  };
  
export default connect(mapStateToProps)(Chat)

