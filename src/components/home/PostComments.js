import React from 'react';
import {connect} from 'react-redux';
import Comment from './Comment';
import './comments.css';
import { fetchPosts } from '../../actions/posts';

export class PostComments extends React.Component{

  componentDidMount() {
    this.props.dispatch(fetchPosts(this.props.coords));
  }

  
  generateComments(){
    console.log(this.props);
    if(this.props.postsArray.length > 0){
      return this.props.postsArray.map((comment, index)=> <Comment key={index} {...comment} />)
    };
  }

  render(){
    return(
      <div className="comments-list">
        {this.generateComments()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
  postsArray: state.posts.posts, 
  coords: state.geolocation.coords
  }
}
export default connect(mapStateToProps)(PostComments)