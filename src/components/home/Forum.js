import React from 'react';
import ForumHeader from './ForumHeader';
import PostsList from './PostsList';
import CreatePost from './CreatePost';
import {connect} from 'react-redux';
import './main.css'

export class Forum extends React.Component{

  render(){
    return(
      <section className="forum">
        <ForumHeader type={this.props.display} />
        {!this.props.postBeingEdited && <CreatePost/>}
        {this.props.postBeingEdited && 
          <div className="modal">
            <CreatePost editPost={this.props.postBeingEdited}/>
          </div>
        } 
        {this.props.coords && <PostsList/>}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  display: state.nav.display,
  coords: state.geolocation.coords,
  postBeingEdited: state.posts.postBeingEdited,
});

export default connect(mapStateToProps)(Forum)

