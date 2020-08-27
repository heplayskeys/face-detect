import React, { useState } from 'react';
import Clarifai from 'clarifai';
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

const API_KEY = '3182a39c94ce4db19bb43ddec297b667';

function App() {
	const [input, setInput] = useState('');
	const [imageURL, setURL] = useState('');
	const [faces, setFaces] = useState([]);
	const [recentGrabs, setRecents] = useState([]);
	const [route, setRoute] = useState('signin');
	const [activeUser, setActiveUser] = useState({});

	const app = new Clarifai.App({
		apiKey: API_KEY
	});

	const handleInput = e => {
		setInput(e.target.value);
	};

	const handleSubmit = async () => {
		if (!input.length) {
			return;
		}

		if (faces.length) {
			setFaces([]);
			setURL('');
		}

		setURL(input);
		setRecents([...recentGrabs, input]);

		try {
			const request = await app.models.predict(
				Clarifai.FACE_DETECT_MODEL,
				input
			);
			const detectedFaces = request.outputs[0].data.regions.map(region => {
				const {
					region_info: { bounding_box }
				} = region;
				return { ...bounding_box };
			});
			setFaces(detectedFaces);
		} catch (err) {
			console.log('Oops!', err);
		}
		setInput('');

		const resp = await fetch('http://localhost:3001/image', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: activeUser.id
			})
		});

		const userEntries = await resp.json();
		setActiveUser({ ...activeUser, entries: userEntries });
	};

	const setPage = () => {
		if (route === 'register') {
			return <Register onRouteChange={setRoute} />;
		} else {
			return <SignIn onRouteChange={setRoute} setActiveUser={setActiveUser} />;
		}
	};

	return (
		<div className='App'>
			<Particles className='particles' params={particlesOptions} />
			<Navigation route={route} onRouteChange={setRoute} />
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
					/>
					<FaceDetect imageURL={imageURL} faces={faces} />
				</div>
			)}
			{recentGrabs.length ? (
				<RecentFaces
					recentGrabs={recentGrabs}
					setInput={setInput}
					route={route}
				/>
			) : null}
		</div>
	);
}

export default App;
