import React from 'react'; 
import { connect } from 'react-redux';
import { addComment } from '../../actions/comments';

export class PostAddComment extends React.Component {
    constructor(props){
        super(props);

        this.test='';
    }
    onSubmit(e) {
        console.log(this.test)
        e.preventDefault();
        this.props.dispatch(addComment(this.test, this.props.currentUser.id, this.props.form));   
        this.content.value="";    
    }  

    handleKeyDown(e){
        if (e.keyCode === 13 && !e.shiftKey)
        {
            //form should submit
            console.log('this.content.value=', this.content.value);
            this.test=this.content.value
            console.log('this.test=', this.test);
            this.onSubmit(e);
        }
        else if(e.keyCode===13 && e.shiftKey){
            console.log('this.content.value=', this.content.value);
          this.test = this.content.value + ' <br/> ';
          console.log('this.test=', this.test);
        }
    }

    render() {   
        return (
            <form 
                onSubmit={(e)=> this.onSubmit(e)}
                ref={form => this.form = form}
                className="comment-form"
            >

                <div className="comment-profile-photo-avatar">
                    {!this.props.currentUser.photo ? 
                        <p className="initials">
                            {this.props.currentUser.firstName[0]}
                            {this.props.currentUser.lastName[0]}
                        </p>
                        :
                        <img className="comment-profile-photo" src={this.props.currentUser.photo.url} alt="profile"/> 
                    }
                </div>

                <textarea 
                    className="comment-textarea" 
                    ref={input => this.content = input} 
                    type="textarea" 
                    id="content" 
                    name="content" 
                    placeholder="Write a Comment"
                    onKeyDown={(e)=>this.handleKeyDown(e)} 
                    // defaultValue={editMode ? this.props.editPost.content : ""}
                />
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
        coords: state.geolocation.coords,
        postsArray: state.posts.posts  
    }
  };
  
export default connect(mapStateToProps)(PostAddComment)

