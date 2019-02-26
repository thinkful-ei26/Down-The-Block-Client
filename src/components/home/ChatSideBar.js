import React, { Component } from 'react';

export default class SideBar extends Component{
		
	render(){
		const { user } = this.props
		return (
			<div id="side-bar">
					<div className="heading">
						<div className="app-name">Private Messages</div>
					</div>
					<div className="current-user">
						<span>{user.name}</span>
					</div>
			</div>
		);
	}
}