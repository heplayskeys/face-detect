import React, { useState } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation-component.jsx';
import Logo from './components/logo/logo.component.jsx';
import UserGreeting from './components/user-greeting/user-greeting.component.jsx';
import Rank from './components/rank/rank.component.jsx';
import ImageLinkForm from './components/image-link-form/image-link-form.component.jsx';
import FaceDetect from './components/face-detect/face-detect.component.jsx';
import RecentFaces from './components/recent-faces/recent-faces.component.jsx';

import Particles from 'react-particles-js';
import particlesOptions from './particleOptions.json';
import './App.scss';

const API_KEY = '3182a39c94ce4db19bb43ddec297b667';

function App() {
	const [input, setInput] = useState('');
	const [imageURL, setURL] = useState('');
	const [faces, setFaces] = useState([]);
	const [recentGrabs, setRecents] = useState([]);

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
	};

	return (
		<div className='App'>
			<Particles className='particles' params={particlesOptions} />
			<Navigation />
			<Logo />
			<UserGreeting user={'Steven'} />
			<Rank />
			<ImageLinkForm
				input={input}
				handleInput={handleInput}
				handleSubmit={handleSubmit}
				numFaces={faces.length}
				recentGrabs={recentGrabs}
			/>
			<FaceDetect imageURL={imageURL} faces={faces} />
			{recentGrabs.length ? (
				<RecentFaces recentGrabs={recentGrabs} setInput={setInput} />
			) : null}
		</div>
	);
}

export default App;

// https://cdn.travelpulse.com/images/99999999-9999-9999-9999-999999999999/aa6644a7-d3b4-8673-5851-f6fb07743484/630x355.jpg
