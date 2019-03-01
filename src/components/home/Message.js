import React from 'react'; 
import { connect } from 'react-redux';
import './message.scss';

export class Message extends React.Component {
    
    render() {   
      let className = this.props.message.author.id === this.props.currentUser.id ? 'mine' : 'theirs'

      return(
        <section className={`${className} message`}>
          <strong><p>{this.props.message.author.firstName}</p></strong>
          <p>{this.props.message.date}</p>
          <p>{this.props.message.content}</p>
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

