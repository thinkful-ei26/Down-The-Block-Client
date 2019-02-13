import React from 'react';
import ForumHeader from './ForumHeader';
import {connect} from 'react-redux';
import { fetchPosts } from '../../actions/posts';

export class Forum extends React.Component{

  componentWillMount(){
    this.props.dispatch(fetchPosts());
  }

  render(){
    console.log(this.props.posts)
    return(
      <section className="forum">
        <ForumHeader type={this.props.display} />
        {this.props.posts}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  display: state.nav.display,
  posts: state.posts.posts,
});

export default connect(mapStateToProps)(Forum)

