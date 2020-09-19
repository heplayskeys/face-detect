import React from 'react';
import { connect } from 'react-redux';
import { updateRoute } from './redux/route/route.actions';
import { setUserProfile, updateUserEntries } from './redux/user/user.actions';
import { setInputField } from './redux/input/input.actions';
import { requestClarifai } from './redux/clarifai/clarifai.actions';
import MainPage from './components/main-page/main-page.component';
// import './App.scss';

const App = props => {
	return <MainPage {...props} />;
};

const mapStateToProps = state => ({
	input: state.setInput.input,
	route: state.setRoute.route,
	activeUser: state.setUser.activeUser,
	detectedFaces: state.getFaces.detectedFaces,
	isPending: state.getFaces.isPending
});

const mapDispatchToProps = dispatch => ({
	setInput: () => dispatch(setInputField('')),
	setRoute: () => dispatch(updateRoute('')),
	setUser: () => dispatch(setUserProfile(null)),
	updateUser: entries => dispatch(updateUserEntries(entries)),
	getFaces: input => dispatch(requestClarifai(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
