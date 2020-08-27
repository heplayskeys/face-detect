import React from 'react';
import './navigation-styles.scss';

const Navigation = ({ route, onRouteChange }) => {
	const displayRoute = {
		signin: 'Sign In',
		register: 'Register',
		signout: 'Sign Out'
	};

	const getRoute = () => {
		switch (route) {
			case 'signin':
				return 'register';

			case 'home':
				return 'signout';

			case 'signout':
				return 'register';

			default:
				return 'signin';
		}
	};

	return (
		<nav className='flex justify-end'>
			<p
				className='f3 link dim black underline pa3 pointer'
				onClick={() => onRouteChange(getRoute())}
			>
				{displayRoute[getRoute()]}
			</p>
		</nav>
	);
};

export default Navigation;
