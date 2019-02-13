import React from 'react';
import {connect} from 'react-redux';
import Post from './Post';
import { fetchPosts } from '../../actions/posts';

export class PostsList extends React.Component{
  componentWillMount(){
    this.props.dispatch(fetchPosts());
  }

  generatePosts(){
    return this.props.posts.map((post, index)=> <Post key={index} {...post} />)
  }

  render(){
    console.log(this.props.posts);
    return(
      <section className="posts-list">
        {this.generatePosts()}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps)(PostsList)

