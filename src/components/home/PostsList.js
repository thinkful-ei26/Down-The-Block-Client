import React from 'react';
import {connect} from 'react-redux';
import Post from './Post';
import { fetchPosts } from '../../actions/posts';
import { filterPostsBySearch, filterByCategory } from '../common/helper-functions'

export class PostsList extends React.Component{
  componentDidMount(){
    this.props.dispatch(fetchPosts(this.props.coords));
  }

  generatePosts(){
    let posts = this.props.posts.map((post, index)=> <Post key={index} postId={post.id} {...post} />);

    if(this.props.searchTerm){
      posts = filterPostsBySearch(this.props.searchTerm, posts);
    }

    if(this.props.categoryFilter){
      posts = filterByCategory(this.props.categoryFilter, posts)
    }
    return posts;
  }

  render(){
    return(
      <section className="posts-list">
        {this.generatePosts()}
      </section>

    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  coords: state.geolocation.coords,
  searchTerm: state.posts.searchTerm,
  categoryFilter: state.posts.categoryFilter,
});

export default connect(mapStateToProps)(PostsList)

