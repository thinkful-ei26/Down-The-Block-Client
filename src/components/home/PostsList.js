import React from 'react';
import {connect} from 'react-redux';
import Post from './Post';
import { fetchPosts } from '../../actions/posts';

export class PostsList extends React.Component{
  componentWillMount(){
    this.props.dispatch(fetchPosts(this.props.coords));
  }

  generatePosts(){
    return this.props.posts.map((post, index)=> <Post key={index} {...post} />)
  }

  render(){
    console.log(this.props);
    return(
      <section className="posts-list">
        {this.generatePosts()}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  coords: state.geolocation.coords
});

export default connect(mapStateToProps)(PostsList)

