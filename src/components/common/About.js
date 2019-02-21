import React from 'react';

export default class About extends React.Component{

  componentDidMount(){
    document.title = 'About';
  }

  render(){
    return(
      <p className="about" id="about">
        Are you curious about what’s going on in your neighborhood? Hear a helicopter hovering around your house and can’t figure out why? Lost a pet and desperately need your neighbors help to find him/her? Wouldn’t it be helpful if there was a convenient way to directly communicate with all your nearby neighbors, especially if you don’t have their phone numbers? Neighborhood Watch is here to help. Make an account, allow the app to use your location, and you’ll be immediately placed in a forum with everyone nearby also on the app. Neighbors can then easily communicate to each other about any recent criminal activity, accidents, robberies, events, parties, etc. that are happening nearby so everyone’s in the loop. And you can even send your neighbor a DM!
      </p>
    );
  }
}
