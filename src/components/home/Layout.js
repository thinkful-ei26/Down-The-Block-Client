import React, { Component } from 'react';
import ChatContainer from './ChatContainer'
import { connect } from 'react-redux';

class Layout extends Component {
	
	constructor(props) {
	  super(props);
	}

	componentWillMount() {
		this.initSocket()
	}

	/*
	*	Connect to and initializes the socket.
	*/
	initSocket = ()=>{
		this.props.socket.on('connect', ()=>{
			console.log("Connected");
		});
	}

	/*
	* 	Sets the user property in state 
	*	@param user {id:number, name:string}
	*/	
	setUser = ()=>{
		const { socket, user } = this.props
		socket.emit('USER_CONNECTED', user);
	}

	render() {
    console.log('PROPS IN LAYOUT', this.props)
		const { socket, user } = this.props;
		return (
			<div className="container">
				{
					!user ?	
					''
					:
					<ChatContainer socket={socket} user={user} setUser={this.setUser} />
				}
			</div>
		);
	}
}

const mapStateToProps = state => {
    console.log(state); 
    return {
        user: state.auth.currentUser,
        coords: state.geolocation.coords,
        socket:state.socket.socket 
    }
  };
  
export default connect(mapStateToProps)(Layout)