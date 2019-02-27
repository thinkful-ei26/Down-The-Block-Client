import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import LandingPage from './components/onboarding/LandingPage';
import HomePage from './components/home/HomePage';
import SettingsPage from './components/settings/SettingsPage';
import {refreshAuthToken} from './actions/auth';
import Navbar from './components/common/Navbar';
import SidebarNav from './components/home/SidebarNav';

export class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }


    render() {        
        return (
            <div id="app" className="app" >
                {/* Always show the navbar! */}
                <Route path="/" component={Navbar} />
                {/* {this.props.coords && <Route path="/" component={SidebarNav} />} */}
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/home" component={HomePage}></Route>
                {/* <Route exact path="/settings" component={SettingsPage}></Route> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null,
    coords: state.geolocation.coords,
});

export default withRouter(connect(mapStateToProps)(App));
