import React from 'react';
import {connect} from 'react-redux';
import { updatePost } from '../../actions/posts'; 
import { withinRadius } from '../common/helper-functions';
import { submitPost, postBeingEdited, addNewPost } from '../../actions/posts';
import moment from 'moment';

export class CreatePost extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      borderAround: '',
      uploadedFile: false,
    }
  }

  onSubmit(e){
    e.preventDefault();
    let photo=undefined;
    if(this.img && this.img.files.length!==0){
      photo= this.img.files[0];
      console.log('THERES A FILE', photo)
    }
    let postId = this.props.editPost ? this.props.editPost.postId : null;
    const values={content: this.content.value, category: this.form.category.value ? this.form.category.value : "Other", date: moment().format('LLLL'), coordinates: this.props.coords, audience: this.props.display, photo};

    console.log('SUBMITTING POST IN CREATE POST');
    this.props.dispatch(submitPost(postId, values, this.props.coords, this.props.display));
    this.setState({uploadedFile: false});
    this.content.value = "";
    this.form.category.value="Other";
    this.props.dispatch(postBeingEdited(null))
  }

  componentDidMount(){
    //listens for the server when the new post has been created. ONLY do something with this post if the user's geofilter is within the radius of this post
    this.props.socket.on('new_post', post => {
      //only do something with the post received if its within radius
      if(withinRadius(post.coordinates, this.props.coords, this.props.display)){
        this.props.dispatch(addNewPost(post));
      } 
    })
    this.props.socket.on('edited_post', post => {
      if(withinRadius(post.coordinates, this.props.coords, this.props.display)){
        this.props.dispatch(updatePost(post));
      }
    })
  }

  componentDidUpdate(prevProps){
    //if editing, highlight the correct chosen category
    if(!prevProps.editPost && this.props.editPost){
      this.setState({
        borderAround: this.props.editPost.category.toLowerCase()
      })
    } 
  }

  componentWillMount(){
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount(){
    //need to turn sockets off or else they'll listen twice
    this.props.socket.off('new_post');
    this.props.socket.off('edited_post');
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e) => {
    console.log('e.target is', e.target)
    if(this.form.contains(e.target)){
      return
    }
    else{
      this.props.dispatch(postBeingEdited(null));
    }
  }

  generateButtons(){
    if(this.props.editPost){
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
      return (
        <button 
          type="submit" >Post
        </button>
      )
    }
  }

  checkIfFile(){
    if(this.img && this.img.files.length!==0){
      this.setState({uploadedFile: true});
    }
    else{
      this.setState({uploadedFile: false});
    }
  }

  render(){

    let editMode = this.props.editPost ? true : false;

    console.log('EDIT MODE IS', editMode, 'PROPS ARE', this.props.editPost);

    return(
      <div ref={div => this.div = div} className={`${this.props.postBeingEdited ? 'modal' : ''}`}>
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
          placeholder={this.props.display==="neighbors" ? "Write a Post For Your Neighborhood To See!" : "Write a Post For Your City To See!"}
          defaultValue={editMode && this.props.editPost.content}
        />

      <div className="bottom-options">
        <section className="radio-buttons">

        <input 
          defaultChecked={editMode && (this.props.editPost.category==='Crime' && true)}
          onClick={()=>this.setState({borderAround: 'crime'})} 
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
          onClick={()=>this.setState({borderAround: 'event'})} 
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
          defaultChecked={editMode && this.props.editPost.category==='Personal' && true}
          onClick={()=>this.setState({borderAround: 'personal'})} 
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
          onClick={()=>this.setState({borderAround: 'other'})} 
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

       {!editMode && 
       <React.Fragment> 
        <button 
          type="button"
          className="upload-photo"
          onClick={()=>this.img.click()}
        >
            <i className="fas fa-paperclip"></i> Attach Photo {this.state.uploadedFile && <i className="fas fa-file"></i>}
        </button>
        <input 
            type="file"
            accept="image/*"
            className="image-input"
            name="img"
            id="img"
            onChange={()=>this.checkIfFile(this.img)}
            ref={input => this.img = input} 
        />
        </React.Fragment>
       }
        {this.generateButtons()}
      </div>
    </form>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  coords: state.geolocation.coords,
  display: state.nav.display, 
  socket:state.socket.socket,
  postBeingEdited: state.posts.postBeingEdited,
});


export default connect(mapStateToProps)(CreatePost);