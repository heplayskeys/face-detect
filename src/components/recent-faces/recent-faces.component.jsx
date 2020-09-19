import React from 'react';
import { connect } from 'react-redux';
import { setInputField } from '../../redux/input/input.actions';
import './recent-faces.styles.scss';

export const RecentFaces = ({ recentGrabs, route, setInput }) => {
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
		setInput(src);
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

const mapStateToProps = state => ({
	input: state.setInput.input,
	route: state.setRoute.route
});

const mapDispatchToProps = dispatch => ({
	setInput: input => dispatch(setInputField(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentFaces);
