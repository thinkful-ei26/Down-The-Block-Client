import React from 'react'; 
import { connect } from 'react-redux';
import moment from 'moment'
import {formatName} from '../../common/helper-functions'
import './message.scss';

export class Message extends React.Component {
  generateMessage(message){
    let linesArr = message.split('\n');
    return linesArr.map((line, index)=> {
      return(
        <p key={index}>{line}</p>
      );
    });
  }
    
    render() {   
      let className = this.props.message.author.id === this.props.currentUser.id ? 'mine' : 'theirs'

      return(
        <section className={`${className} message`}>
          <strong><p>{formatName(this.props.message.author.firstName)}</p></strong>
          <p className="chat-time">{moment(this.props.message.date).format('LT')}</p>
          <div>{this.generateMessage(this.props.message.content)}</div>
        </section>
      )
    }
}

const mapStateToProps = state => {
    return {
      currentUser: state.auth.currentUser,
      chatParticipants: state.chatMessages.chat.chatParticipants
    }
  };
  
export default connect(mapStateToProps)(Message)

