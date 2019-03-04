import React from 'react';
import {connect} from 'react-redux';
import './about.scss';
import mockup from '../../img/mockup.png';
import { display, focusOn } from '../../actions/navigation'

export class About extends React.Component{
  componentDidMount(){
    document.title='DownTheBlock'
  }

  onClick(focus=""){
    this.props.dispatch(display(focus));
    this.props.dispatch(focusOn(focus));
  }

  render(){
    return(
      <React.Fragment>
        <section className="about">
          <article className="text">
            <h2>Your Neighborhood At Your Fingertips</h2>
            <p>
            DownTheBlock gives you a convenient way to stay informed by connecting you with all your neighbors. Lost a pet and desperately need your neighbors help to find him/her?  Hear a helicopter hovering above your house and don't know why? Join DownTheBlock today and you'll be up-to-date on everything happening close to home as well as in the broader community. From criminal activity to local events, you'll hear it all from here!
            </p>
            {!this.props.loggedIn && <button
              type="button"
              className="join-today"
              onClick={()=>this.onClick('registerUsername')} 
            > Join Your Neighborhood</button>}
          </article>
          <img className="mockup" src={mockup} alt="mockup"/>
        </section>
        <section className="about-icons">
          <div className="icon-holder">
            <i className="fas fa-map-marker-alt"></i>
            <p>Geofilter conveniently gives you access to your own community</p>
          </div>
          <div className="icon-holder">
            <i className="fas fa-edit"></i>
            <p>Post In Forums To Help Keep Your Neighborhood In The Loop</p>
          </div>
          <div className="icon-holder">
            <i className="fas fa-search"></i>
            <p>Easily Search And Filter Forums To Find What You're Interested In</p>
          </div>
          <div className="icon-holder">
            <i className="fas fa-comments"></i>
            <p>Directly Message Your Neighbors For A More Personal Experience</p>
          </div>
          
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
});

export default connect(mapStateToProps)(About);