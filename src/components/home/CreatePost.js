import React from 'react';
import {connect} from 'react-redux';

import { submitPost, postBeingEdited, addNewPost } from '../../actions/posts';
import {todaysDate} from '../common/helper-functions';
import moment from 'moment';

export class CreatePost extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      borderAround: '',
    }
  }

  onSubmit(e){
    e.preventDefault();
    let postId = this.props.editPost ? this.props.editPost.postId : null;
    // let method = this.props.editPost ? 'PUT' : 'POST';
    const values={content: this.content.value, category: this.form.category.value ? this.form.category.value : "Other", date: moment().format('LLLL'), coordinates: this.props.coords, audience: this.props.display};

    this.props.dispatch(submitPost(postId, values, this.props.coords, this.props.display));
    this.content.value = "";
    this.form.category.value="Other";
  }

  componentDidMount(){
    //if editing, highlight the correct chosen category
    if(this.props.editPost){
      this.setState({
        borderAround: this.props.editPost.category.toLowerCase()
      })
    } 
    console.log('socket in CREATE:', this.props.socket)
    //listens for the server when the new post has been created
    this.props.socket.on('new_post', post => {
      console.log(post); 
      this.props.dispatch(addNewPost(post));
    })
  }

  generateButtons(){
    if(this.props.editPost){
      //have save and cancel buttons
      return(
        <section>
          <button 
            type="submit">Save
          </button>
          <button 
            onClick={()=>this.props.dispatch(postBeingEdited(null))}
            type="button" >Cancel
          </button>
        </section>
      )
    }
    else{
      //have a post button 
      return (
        <button 
          type="submit" >Post
        </button>
      )
    }
  }

  render(){
    let editMode = this.props.editPost ? true : false;

    return(
      <form 
        className="post-form" 
        onSubmit={(e)=> this.onSubmit(e)}
        ref={form => this.form = form}
        style={this.state.style}
      >
          
        <textarea 
          required 
          ref={input => this.content = input} 
          type="textarea" 
          id="content" 
          name="content" 
          className="create-post-textarea"
          placeholder="Write a Post For Your Neighborhood To See!" 
          defaultValue={editMode ? this.props.editPost.content : ""}
        />

      <div className="bottom-options">
        <section className="radio-buttons">

        <input 
          defaultChecked={editMode && (this.props.editPost.category==='Crime' && true)}
          type="radio" 
          id="crime" 
          name="category" 
          value="Crime" />
        <label 
          onClick={()=>this.setState({borderAround: 'crime'})} 
          className={`crime ${this.state.borderAround==='crime' &&'border'}`}
          htmlFor="crime"
        >
          Crime
        </label>

        <input 
          defaultChecked={editMode && (this.props.editPost.category==='Event' && true)}
          type="radio" 
          id="event" 
          name="category" 
          value="Event"/>
        <label 
          onClick={()=>this.setState({borderAround: 'event'})} 
          className={`event ${this.state.borderAround==='event' &&'border'}`}
          htmlFor="event">
          Event
        </label>

        <input 
          defaultChecked={editMode && (this.props.editPost.category==='Personal' && true)}
          type="radio" 
          id="personal" 
          name="category" 
          value="Personal"/>
        <label 
          htmlFor="personal"
          onClick={()=>this.setState({borderAround: 'personal'})} 
          className={`personal ${this.state.borderAround==='personal' &&'border'}`}
          >Personal
        </label>

        <input 
          defaultChecked={editMode && (this.props.editPost.category==='Other' && true)}
          type="radio" 
          id="other" 
          name="category" 
          value="Other"/>
        <label
          htmlFor="other"
          onClick={()=>this.setState({borderAround: 'other'})} 
          className={`other ${this.state.borderAround==='other' && 'border'}`}
          >
        Other
        </label>

        </section>
        {this.generateButtons()}
      </div>
    </form>
    );
  }
}

const mapStateToProps = state => ({
  coords: state.geolocation.coords,
  display: state.nav.display, 
  socket:state.socket.socket
});


export default connect(mapStateToProps)(CreatePost);