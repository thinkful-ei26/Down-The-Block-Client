import React from 'react';
import {connect} from 'react-redux';
import {submitPost} from '../../actions/posts';
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
    const values={content: this.content.value, category: this.form.category.value ? this.form.category.value : "Other", date: todaysDate(), coordinates: this.props.coords};
    this.props.dispatch(submitPost(values, this.props.coords));
    this.content.value = "";
    this.form.category.value="Other";
  }

  render(){
    console.log(this.state.borderAround);
    return(
      <form 
        className="post-form" 
        onSubmit={(e)=> this.onSubmit(e)}
        ref={form => this.form = form}
        style={this.state.style}
        onMouseLeave={()=>this.setState({borderAround: ''})}
      >
          
        <textarea 
          required 
          ref={input => this.content = input} 
          type="textarea" 
          id="content" 
          name="content" 
          placeholder="Write a Post For Your Neighborhood To See!" 
        />

      <div className="bottom-options">
      <section className="radio-buttons">

      <input type="radio" id="crime" name="category" value="Crime" />
        <label 
          onClick={()=>this.setState({borderAround: 'crime'})} 
          className={`crime ${this.state.borderAround==='crime' &&'border'}`}
          htmlFor="crime"
        >
          Crime
        </label>

        <input type="radio" id="event" name="category" value="Event"/>
        <label 
          onClick={()=>this.setState({borderAround: 'event'})} 
          className={`event ${this.state.borderAround==='event' &&'border'}`}
          htmlFor="event">
          Event
        </label>

        <input type="radio" id="personal" name="category" value="Personal"/>
        <label 
          htmlFor="personal"
          onClick={()=>this.setState({borderAround: 'personal'})} 
          className={`personal ${this.state.borderAround==='personal' &&'border'}`}
          >Personal
        </label>

        <input defaultChecked type="radio" id="other" name="category" value="Other"/>
        <label
          htmlFor="other"
          onClick={()=>this.setState({borderAround: 'other'})} 
          className={`other ${this.state.borderAround==='other' && 'border'}`}
          >
        Other
        </label>

      </section>
     
        <button 
          className="submit-post"
          type="submit" >Post
        </button>
      </div>
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