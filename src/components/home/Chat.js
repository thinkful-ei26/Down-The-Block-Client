import React from 'react'; 
import { connect } from 'react-redux';
import moment from 'moment';
import {updateChat, sendMessage} from '../../actions/chatMessages';
import socketClient from "socket.io-client";
import { API_BASE_URL } from '../../config'; 


export class Chat extends React.Component {
    constructor(props){
      super(props);

      this.message='';
    }

    componentDidMount(){
        let socket;
        console.log('NAMESPACE is', this.props.namespace)
        fetch(`${API_BASE_URL}/messages/${this.props.namespace}`, {
            method: 'POST',
        })
        .then(res => res.json())
        .then((chat) =>{ 
        console.log("HERE");
        //listens for the server when the new post has been created
          socket= socketClient(`${API_BASE_URL}/${this.props.namespace}`);
          console.log('THE SOCKET IN CHAT IS', socket);
          socket.on('chat', chat => {
            console.log('CHAT GOT BACK IN SOCKET', chat);
            this.props.dispatch(updateChat(chat));
          })
        })
        .catch(err=>console.log("ERROR",err));
      }

      onSubmit(e) {
        e.preventDefault();
        if(this.message.value.trim()===""){
            return;
        }
                
        let date = moment().format('LLLL');
        this.props.dispatch(sendMessage(this.props.namespace, this.message.value, date, this.props.currentUser.firstName, this.props.chat.id));   
        this.message.value="";   

    } 

    render() { 
      console.log('NAMESPACE is', this.props.namespace)
  
      if(!this.props.namespace || !this.props.chat){
        return null;
      }

      let messages = this.props.chat.messages.map(message=><p>{message.content}</p>);
      return (
        <div style={{paddingTop:500}}>
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
      // namespace: state.chatMessages.namespace,
      chat: state.chatMessages.chat
    }
  };
  
export default connect(mapStateToProps)(Chat)

