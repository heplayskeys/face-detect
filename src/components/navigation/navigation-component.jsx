import React from 'react';
import { connect } from 'react-redux';
import { updateRoute } from '../../redux/route/route.actions';
import './navigation-styles.scss';

const Navigation = ({ route, setRoute }) => {
	const displayRoute = {
		register: 'Sign In',
		signin: 'Register',
		home: 'Sign Out'
	};

	return (
		<nav className='flex justify-end'>
			<p
				className='sign-out f3 link dim black underline pa3 pointer'
				onClick={() => setRoute(route)}
			>
				{displayRoute[route]}
			</p>
		</nav>
	);
};

const mapStateToProps = state => ({
	route: state.setRoute.route
});

const mapDispatchToProps = dispatch => ({
	setRoute: route => dispatch(updateRoute(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
