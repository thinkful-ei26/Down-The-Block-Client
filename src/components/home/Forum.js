import React from 'react';
import ForumHeader from './ForumHeader';
import PostsList from './PostsList';
import {connect} from 'react-redux';
import { fetchPosts } from '../../actions/posts';

export class Forum extends React.Component{

  componentWillMount(){
    this.props.dispatch(fetchPosts());
  }

  render(){
    return(
      <section className="forum">
        <ForumHeader type={this.props.display} />
        <PostsList/>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  display: state.nav.display,
});

export default connect(mapStateToProps)(Forum)

