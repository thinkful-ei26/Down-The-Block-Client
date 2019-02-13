import React from 'react';
import {connect} from 'react-redux';
// import {reduxForm, Field, focus} from 'redux-form';
// import Input from '../common/input';
import {submitPost} from '../../actions/posts';
// import {required, nonEmpty, unSelected} from '../common/validators';
import {todaysDate} from '../common/helper-functions';

export class CreatePost extends React.Component{

  onSubmit(e){
    e.preventDefault();
    const values={content: this.content.value, category: this.form.category.value ? this.form.category.value : "other", date: todaysDate(), coordinates: 'placeholder'};
    this.props.dispatch(submitPost(values));
    this.content.value = "";
    this.form.category.value="other";
  }

  render(){
    return(
      <form 
        className="post-form" 
        onSubmit={(e)=> this.onSubmit(e)}
        ref={form => this.form = form}
      >
          
        <textarea 
          required 
          ref={input => this.content = input} 
          type="textarea" 
          id="content" 
          name="content" 
          placeholder="Write a Post For Your Neighborhood To See!" 
        />

        <input type="radio" id="crime" name="category" value="crime" />
        <label className="crime" htmlFor="crime">Crime</label>

        <input type="radio" id="event" name="category" value="event"/>
        <label className="event"  htmlFor="event">Event</label>

        <input type="radio" id="personal" name="category" value="personal"/>
        <label className="personal"  htmlFor="personal">Personal</label>

        <input defaultChecked type="radio" id="other" name="category" value="other"/>
        <label className="other"  htmlFor="other">Other</label>
     
        <button 
          type="submit" >Post
        </button>
    </form>
    );
  }
}

export default connect()(CreatePost);