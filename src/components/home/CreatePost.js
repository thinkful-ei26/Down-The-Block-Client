import React from 'react';
import {connect} from 'react-redux';
// import {reduxForm, Field, focus} from 'redux-form';
// import Input from '../common/input';
import {submitPost} from '../../actions/posts';
// import {required, nonEmpty, unSelected} from '../common/validators';
import {todaysDate} from '../common/helper-functions';

export class CreatePost extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      borderAround: '',
    }
  }

  onSubmit(e){
    e.preventDefault();
    const values={content: this.content.value, category: this.form.category.value ? this.form.category.value : "other", date: todaysDate(), coordinates: 'placeholder'};
    this.props.dispatch(submitPost(values, this.props.coords));
    this.content.value = "";
    this.form.category.value="other";
  }

  render(){
  
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
          placeholder="Write a Post For Your Neighborhood To See!" 
        />

        <input type="radio" id="crime" name="category" value="crime" />
        <label 
          onClick={()=>this.setState({borderAround: 'crime'})} 
          className={`crime ${this.state.borderAround==='crime' &&'border'}`}
          htmlFor="crime"
        >
          Crime
        </label>

        <input type="radio" id="event" name="category" value="event"/>
        <label 
          onClick={()=>this.setState({borderAround: 'event'})} 
          className={`event ${this.state.borderAround==='event' &&'border'}`}
          htmlFor="event">
          Event
        </label>

        <input type="radio" id="personal" name="category" value="personal"/>
        <label 
          htmlFor="personal"
          onClick={()=>this.setState({borderAround: 'personal'})} 
          className={`personal ${this.state.borderAround==='personal' &&'border'}`}
          >Personal
        </label>

        <input defaultChecked type="radio" id="other" name="category" value="other"/>
        <label
          htmlFor="other"
          onClick={()=>this.setState({borderAround: 'other'})} 
          className={`other ${this.state.borderAround==='other' &&'border'}`}
          >
          
        Other
        </label>
     
        <button 
          type="submit" >Post
        </button>
    </form>
    );
  }
}

// let style = ({
//   [this.state.borderAround]: {
//     border: '1px solid black',
//   },
// })

const mapStateToProps = state => ({
  coords: state.geolocation.coords
});


export default connect(mapStateToProps)(CreatePost);