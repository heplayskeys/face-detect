import React from 'react';
import { connect } from 'react-redux';
import { updateRoute } from '../../redux/route/route.actions';
import './navigation-styles.scss';

const Navigation = ({ route, setRoute, activeUser }) => {
	const displayRoute = {
		register: 'Sign In',
		signin: 'Register',
		home: 'Sign Out'
	};

	return (
		<nav className='flex justify-end'>
			{activeUser ? (
				<div className='tc grow pointer' style={{ padding: '1.5rem' }}>
					<p
						className='flex items-center justify-center br-100 pa3 m0 ba b--white h3 w3 f2 shadow-3 grow'
						style={{
							margin: 0,
							background: '#000',
							color: '#fff'
						}}
					>
						{activeUser.name[0].toUpperCase()}
					</p>
				</div>
			) : null}
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
	route: state.setRoute.route,
	activeUser: state.setUser.activeUser
});

const mapDispatchToProps = dispatch => ({
	setRoute: route => dispatch(updateRoute(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
