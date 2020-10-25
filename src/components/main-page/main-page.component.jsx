import React, { useState, useEffect } from 'react';
import Navigation from '../navigation/navigation.component.jsx';
import Logo from '../logo/logo.component.jsx';
import UserGreeting from '../user-greeting/user-greeting.component.jsx';
import Rank from '../rank/rank.component.jsx';
import ImageLinkForm from '../image-link-form/image-link-form.component.jsx';
import FaceDetect from '../face-detect/face-detect.component.jsx';
import RecentFaces from '../recent-faces/recent-faces.component.jsx';
import SignIn from '../sign-in/sign-in.component.jsx';
import Register from '../register/register.component.jsx';

import Particles from 'react-particles-js';
import particlesOptions from '../../particleOptions.json';
import './main-page.styles.scss';

const URL = 'https://boiling-brushlands-70070.herokuapp.com';

const MainPage = ({
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
			window.sessionStorage.removeItem('token');

			fetch(`${URL}/image/${activeUser.id}`, {
				method: 'DELETE'
			});

			resetApplication();
		}
	});

	const [{ imageURL, recentGrabs }, setState] = useState(initialState);
	const [errorState, setErrorState] = useState('');

	const handleSubmit = async () => {
		if (!input.length) {
			return;
		}

		await getFaces(false);
		setErrorState('');
		await getFaces(input);

		setState({
			imageURL: input,
			recentGrabs: [...recentGrabs, input]
		});

		await fetch(`${URL}/image`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.sessionStorage.getItem('token')
			},
			body: JSON.stringify({
				id: activeUser.id
			})
		});

		await updateUser(activeUser);
		setInput();
	};

	const setPage = () => {
		if (route === 'register') {
			return <Register URL={URL} />;
		} else {
			return <SignIn URL={URL} />;
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
			<Navigation route={route} />
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
						URL={URL}
						userID={activeUser.id}
					/>
					{isPending ? (
						<div className='ma center'>
							<h3 className='f3 mt3 animate__animated animate__pulse animate__infinite'>
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

export default MainPage;
