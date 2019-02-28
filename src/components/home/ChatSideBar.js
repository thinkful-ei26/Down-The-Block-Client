import React, { Component } from 'react';

export default class SideBar extends Component{
		
	render(){
		const { user } = this.props
		return (
			<div id="side-bar">
					<div className="heading">
						<div className="app-name"><b>Chat</b></div>
					</div>
					<div className="current-user">
						<span></span>
					</div>
			</div>
		);
	}
}