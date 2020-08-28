import React, { useState, useEffect } from 'react';
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

function App() {
	const initialState = {
		input: '',
		imageURL: '',
		faces: [],
		recentGrabs: [],
		route: 'signin',
		activeUser: {}
	};

	useEffect(() => {
		if (route === 'signout') {
			resetApplication();
		}
	});

	const [
		{ input, imageURL, faces, recentGrabs, route, activeUser },
		setState
	] = useState(initialState);

	const [errorState, setErrorState] = useState('');

	const handleInput = e => {
		const userInput = e.target.value;
		setState(prevState => ({ ...prevState, input: userInput }));
	};

	const handleSubmit = async () => {
		if (!input.length) {
			return;
		}

		setErrorState('');

		if (faces.length) {
			setState(prevState => ({ ...prevState, faces: [], imageURL: '' }));
		}

		try {
			const apiCall = await fetch(`${URL}/imageurl`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					input
				})
			});
			const request = await apiCall.json();

			const detectedFaces = request.outputs[0].data.regions.map(region => {
				const {
					region_info: { bounding_box }
				} = region;
				return { ...bounding_box };
			});
			setState(prevState => ({
				...prevState,
				imageURL: input,
				recentGrabs: [...recentGrabs, input]
			}));
			setState(prevState => ({
				...prevState,
				faces: detectedFaces
			}));
		} catch (err) {
			console.error('Unable to complete request');
			setErrorState('Unable to complete request');
			return;
		}

		setState(prevState => ({ ...prevState, input: '' }));

		const resp = await fetch(`${URL}/image`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: activeUser.id
			})
		});

		const userEntries = await resp.json();
		setState(prevState => ({
			...prevState,
			activeUser: { ...activeUser, entries: userEntries }
		}));
	};

	const setPage = () => {
		if (route === 'register') {
			return <Register URL={URL} setState={setState} />;
		} else {
			return <SignIn URL={URL} setState={setState} />;
		}
	};

	const resetApplication = () => {
		setState({ ...initialState });
	};

	return (
		<div className='App'>
			<Particles className='particles' params={particlesOptions} />
			<Navigation
				route={route}
				setState={setState}
				resetApplication={resetApplication}
			/>
			{route !== 'home' ? (
				setPage()
			) : (
				<div>
					<Logo />
					<UserGreeting name={activeUser.name} />
					<Rank entries={activeUser.entries} />
					<ImageLinkForm
						input={input}
						handleInput={handleInput}
						handleSubmit={handleSubmit}
						numFaces={faces.length}
						recentGrabs={recentGrabs}
						setState={setState}
					/>
					<FaceDetect imageURL={imageURL} faces={faces} error={errorState} />
				</div>
			)}
			{recentGrabs.length ? (
				<RecentFaces
					recentGrabs={recentGrabs}
					setState={setState}
					route={route}
					error={errorState}
				/>
			) : null}
		</div>
	);
}

export default App;
