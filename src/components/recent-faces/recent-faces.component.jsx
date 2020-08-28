import React from 'react';
import './recent-faces.styles.scss';

const RecentFaces = ({ recentGrabs, setState, route }) => {
	const grabs = new Set();

	for (let i = recentGrabs.length - 1; i >= 0; i--) {
		if ([...grabs].length === 4) {
			break;
		}

		if (grabs.has(recentGrabs[i])) {
			continue;
		} else {
			grabs.add(recentGrabs[i]);
		}
	}

	const handleClick = e => {
		const src = e.target.src;
		setState(prevState => ({ ...prevState, input: src }));
	};

	return route === 'home' ? (
		<div className='recent-grabs-container'>
			<h3 className='tr'>{'Recent Grabs:'}</h3>
			{[...grabs].map((grab, idx) => (
				<img
					className='recent-grab grower dimmer db mw5 br2 ba b--black-10 shadow-1 pointer'
					src={grab}
					alt='recent-grab'
					key={idx}
					onClick={handleClick}
				/>
			))}
		</div>
	) : null;
};

export default RecentFaces;
