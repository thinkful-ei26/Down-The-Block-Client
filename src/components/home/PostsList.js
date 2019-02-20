import React from 'react';
import {connect} from 'react-redux';
import {API_BASE_URL} from '../../config';
import socketIOClient from "socket.io-client";
import Post from './Post';
import { fetchPosts } from '../../actions/posts';
import { filterPostsBySearch, filterByCategory } from '../common/helper-functions'
import {updatePost} from '../../actions/posts';
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
    console.log(this.state.posts_data);
  }

  updatePostsInState = res => {
    console.log(res);
    const new_array = this.state.posts_data.map(post => {
        console.log('post:', post);

        if (post.id === res.postId) {
            post.comments.push(res.id);
            post.userId = res.userId;
            return post;
        }
        return post;
    })
    this.setState({ posts_data:new_array });
    console.log(this.state);
    this.dispatch(updatePost(new_array));
  };
  
  componentDidMount(){
    this.props.dispatch(fetchPosts(this.props.coords, this.props.display));
    this.socket.emit("initial_data");
    this.socket.on("get_posts", this.getPosts);
    this.socket.on("commentAdded", this.updatePostsInState);
  }

  componentWillUnmount(){
    this.socket.off("get_posts");
    this.socket.off("commentAdded", this.updatePostsInState);
  }

  generatePosts(){
    let posts = [];

    if(this.state.posts_data.postsArray === undefined) {
        if(this.state.posts_data.length > 0) {
          console.log(this.state.posts_data);
          posts = this.state.posts_data.map((post, index)=> <Post key={index} postId={post.id} {...post} />);
          console.log('posts after map:', posts);
        }
    }

    if(this.props.searchTerm) {
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
  display: state.nav.display 
});

export default connect(mapStateToProps)(PostsList)

