import React from 'react';
import {connect} from 'react-redux';
import {API_BASE_URL} from '../../config';
import socketIOClient from "socket.io-client";
import Post from './Post';
import { fetchPosts } from '../../actions/posts';
import { filterPostsBySearch, filterByCategory } from '../common/helper-functions'

export class PostsList extends React.Component{

  constructor(){
    super();
    this.state = {
      posts_data: [],
      endpoint: `${API_BASE_URL}`
    };
    this.socket = socketIOClient(this.state.endpoint); 
  }

  getPosts = posts =>{
    console.log('posts being recieved', posts);
    this.setState({ posts_data: posts });
  }

  changePosts = () => {
    this.socket.emit("initial_data");
  }
  
  componentDidMount(){
    this.props.dispatch(fetchPosts(this.props.coords));
    this.socket.emit("initial_data");
    this.socket.on("get_posts", this.getPosts);
    this.socket.on("changed_posts", this.changePosts);
  }

  componentWillUnmount(){
    this.socket.off("get_posts");
    this.socket.off("changed_posts");
  }

  generatePosts(){
    let posts = this.state.posts_data.map((post, index)=> <Post key={index} postId={post.id} {...post} />);

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
  posts: PostsList.posts_data,
  coords: state.geolocation.coords,
  searchTerm: state.posts.searchTerm,
  categoryFilter: state.posts.categoryFilter,
});

export default connect(mapStateToProps)(PostsList)

