import React from 'react';
import {connect} from 'react-redux';
import UpdateAccountForm from './UpdateAccountForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import {changeSuccessMessage, updateProfilePhoto} from '../../actions/users';
import './settings.scss'

export class SettingsPage extends React.Component{
  componentDidMount(){
    document.title = 'Settings';
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

  onSubmit(e){
    e.preventDefault();
    if(this.img && this.img.files.length!==0){
      let updatedPhoto= this.img.files[0];
      return this.props.dispatch(updateProfilePhoto(updatedPhoto));
    }
  }

  render(){
    return(
      <main className="settings">
        {this.props.successMessage &&
        <div className="updated-message" aria-live="polite">
          {this.props.successMessage}
        </div>
        }
        <div className="profile-photo-avatar">
          {!this.props.currentUser.photo ?
            <p className="initials">
              {this.props.currentUser.firstName[0]}
              {this.props.currentUser.lastName[0]}
            </p>
            :
            <img className="profile-photo" src={this.props.currentUser.photo.url} alt="profile"/>
          }
        </div>
        <button 
            type="button"
            className="upload-photo"
            onClick={()=>this.img.click()}
        >
            <i class="fas fa-camera"></i> Update Profile Picture 
        </button>
        <input 
            type="file"
            accept="image/*"
            className="image-input"
            name="img"
            id="img"
            onChange={()=>this.onSubmit()}
            ref={input => this.img = input} 
        />

        <UpdateAccountForm/>
        <UpdatePasswordForm/>
      </main>
    );
  }
}

const mapStateToProps = state => {
  console.log('IN SETTINGS, STATE:', state);
  return {
    successMessage: state.auth.successMessage,
    currentUser: state.auth.currentUser,
  }
};

export default connect(mapStateToProps)(SettingsPage);