import React from 'react';
import { connect } from 'react-redux';
import { updateRoute } from '../../redux/route/route.actions';
import AvatarIcon from '../avatar-icon/avatar-icon.component';
import './navigation.styles.scss';

export const Navigation = ({ route, setRoute, activeUser }) => {
	const displayRoute = {
		register: 'Sign In',
		signin: 'Register',
		home: 'Sign Out'
	};

	return (
		<nav className='flex justify-end'>
			{activeUser ? (
				<AvatarIcon />
			) : (
				<p
					className='sign-out link dim black underline pa3 pointer'
					onClick={() => setRoute(route)}
				>
					{displayRoute[route]}
				</p>
			)}
		</nav>
	);
};

const mapStateToProps = state => ({
	route: state.setRoute.route,
	activeUser: state.setUser.activeUser
});

const mapDispatchToProps = dispatch => ({
	setRoute: route => dispatch(updateRoute(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
