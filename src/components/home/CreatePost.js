import React from 'react';
import {connect} from 'react-redux';
// import {reduxForm, Field, focus} from 'redux-form';
// import Input from '../common/input';
import {submitPost} from '../../actions/posts';
// import {required, nonEmpty, unSelected} from '../common/validators';
import {todaysDate} from '../common/helper-functions';

export class CreatePost extends React.Component{
  // onSubmit(values){
    // values.date = todaysDate();
    // values.coordinates = "placeholder";
    // return this.props.dispatch(submitPost(values, this.props.currentPetId, this.props.currentPostId));
  // }

  onSubmit(e){
    e.preventDefault();
    const values={content: this.content.value, category: this.category.value, date: todaysDate(), coordinates: 'placeholder'};
    this.props.dispatch(submitPost(values));
    this.content.value = "";
    this.category.value="";
  }

  render(){
    return(
      <form onSubmit={(e)=> this.onSubmit(e)}>
          
        <textarea 
          required 
          ref={input => this.content = input} 
          type="textarea" 
          id="content" 
          name="content" 
          placeholder="Write a Post For Your Neighborhood To See!" 
        />

        <select 
          ref={(input) => this.category = input}
          id="category" 
          required 
        >
          <option defaultValue value = "">Choose a Category</option>
          <option value = "crime">Crime</option>
          <option value = "event">Event</option>
          <option value = "personal">Personal</option>
        </select>
     
        <button 
          type="submit" >Post
        </button>
    </form>
    );
  }
}

export default connect()(CreatePost);