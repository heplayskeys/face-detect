import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateRoute } from './redux/route/route.actions';
import { setUserProfile, updateUserEntries } from './redux/user/user.actions';
import { setInputField } from './redux/input/input.actions';
import { requestClarifai } from './redux/clarifai/clarifai.actions';
import Navigation from './components/navigation/navigation-component.jsx';
import Logo from './components/logo/logo.component.jsx';
import UserGreeting from './components/user-greeting/user-greeting.component.jsx';
import Rank from './components/rank/rank.component.jsx';
import ImageLinkForm from './components/image-link-form/image-link-form.component.jsx';
import FaceDetect from './components/face-detect/face-detect.component.jsx';
import RecentFaces from './components/recent-faces/recent-faces.component.jsx';
import SignIn from './components/sign-in/sign-in.component.jsx';
import Register from './components/register/register.component.jsx';

import Particles from 'react-particles-js';
import particlesOptions from './particleOptions.json';
import './App.scss';

const URL = 'https://boiling-brushlands-70070.herokuapp.com';

const App = ({
	input,
	route,
	setRoute,
	activeUser,
	setUser,
	setInput,
	updateUser,
	getFaces,
	detectedFaces,
	isPending
}) => {
	const initialState = {
		imageURL: '',
		recentGrabs: []
	};

	useEffect(() => {
		if (route === 'signout' && activeUser) {
			resetApplication();
		}
	});

	const [{ imageURL, recentGrabs }, setState] = useState(initialState);
	const [errorState, setErrorState] = useState('');

	const handleSubmit = async () => {
		if (!input.length) {
			return;
		}

		setErrorState('');
		await getFaces(input);

		setState(prevState => ({
			...prevState,
			imageURL: input,
			recentGrabs: [...recentGrabs, input]
		}));

		setInput();

		await fetch(`${URL}/image`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: activeUser.id
			})
		});

		updateUser(activeUser);
	};

	const setPage = () => {
		if (route === 'register') {
			return <Register URL={URL} setState={setState} />;
		} else {
			return <SignIn URL={URL} setState={setState} />;
		}
	};

	const resetApplication = () => {
		setRoute();
		setUser();
		setInput();
		getFaces(false);
		setState({ ...initialState });
	};

	return (
		<div className='App'>
			<Particles className='particles' params={particlesOptions} />
			<Navigation route={route} setState={setState} />
			{!activeUser ? (
				setPage()
			) : (
				<div>
					<Logo />
					<UserGreeting name={activeUser.name} />
					<Rank />
					<ImageLinkForm
						input={input}
						handleSubmit={handleSubmit}
						numFaces={detectedFaces.length}
						recentGrabs={recentGrabs}
						setState={setState}
					/>
					{isPending ? (
						<div className='ma center'>
							<h3 className='f3 animate__animated animate__pulse animate__infinite'>
								{'Grabbing faces...'}
							</h3>
						</div>
					) : (
						<FaceDetect
							imageURL={imageURL}
							detectedFaces={detectedFaces}
							error={errorState}
						/>
					)}
				</div>
			)}
			{recentGrabs.length ? (
				<RecentFaces recentGrabs={recentGrabs} error={errorState} />
			) : null}
		</div>
	);
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
