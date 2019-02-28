import React from 'react';
import ForumHeader from './ForumHeader';
import PostsList from './PostsList';
import CreatePost from './CreatePost';
import {connect} from 'react-redux';
import './main.scss'

export class Forum extends React.Component{
  whatToDisplay(){
      if(this.props.postBeingEdited){
        return (
          <div className="modal">
            <CreatePost editPost={this.props.postBeingEdited}/>
          </div>
        )
      }
      else{
        if(this.props.coords){
          return (
            <React.Fragment>
              <CreatePost/>
              <PostsList/>
            </React.Fragment>
          )
        }
      }
  }

  render(){
    return(
      <section className="forum">
        <ForumHeader type={this.props.display} />
        {this.whatToDisplay()}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return{
    display: state.nav.display,
    postBeingEdited: state.posts.postBeingEdited,
    showAnimation: state.nav.showAnimation,
    coords: state.geolocation.coords,
    currentUser: state.auth.currentUser
  }
};

export default connect(mapStateToProps)(Forum)