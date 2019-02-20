import React from 'react';
import {connect} from 'react-redux';
import UpdateAccountForm from './UpdateAccountForm';
import requiresLogin from '../common/requires-login';
import {changeSuccessMessage} from '../../actions/users';

export class SettingsPage extends React.Component{
  componentDidMount(){
    document.title = 'Account Settings';
  }

  componentDidUpdate(){
    window.scrollTo(0, 0); //make it jump to top
    if(this.props.successMessage){
    
      //set a timer that changes the message back to null after seven seconds of displaying it
    setTimeout(
        function() {
          this.props.dispatch(changeSuccessMessage(null));
        }
        .bind(this),
        7000
    );
    }
  }

  render(){

    return(
      <div className="settings">
        <main className="settings-main">
          {this.props.successMessage && 
          <div className="updated-message" aria-live="polite">
            {this.props.successMessage}
          </div>
          }
          <UpdateAccountForm/>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  successMessage: state.auth.successMessage,
});

export default requiresLogin()(connect(mapStateToProps)(SettingsPage));