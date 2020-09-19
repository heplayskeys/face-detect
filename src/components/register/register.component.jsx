import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateRoute } from '../../redux/route/route.actions';
import './register.styles.scss';

export const Register = ({ URL, route, setRoute }) => {
	const [errorState, setErrorState] = useState('');

	const handleSubmit = async () => {
		const name = document.querySelector('#name').value;
		const email = document.querySelector('#email-address').value;
		const password = document.querySelector('#password').value;
		const confirmPassword = document.querySelector('#confirm-password').value;

		setErrorState('');

		if (
			name === '' ||
			email === '' ||
			password === '' ||
			confirmPassword === ''
		) {
			console.error('Error: Please fill out all fields');
			setErrorState('Please fill out all fields');
			return;
		}

		const resp = await fetch(`${URL}/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name,
				email,
				password,
				confirmPassword
			})
		});

		if (resp.status === 200) {
			alert('User created. Please sign in.');
			setRoute(route);
		} else {
			const errorMsg = await resp.json();
			console.error('Error:', errorMsg);
			setErrorState(`${errorMsg}`);
		}
	};

	const handleEnterKey = event => {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	};

	return (
		<div>
			<article
				id='form-container'
				className='mw6 center bg-white-20 br3 pa3 pa4-ns mv3 ba b--black-10 shadow-5'
			>
				<main className='pa4 black-80'>
					<div className='measure'>
						<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
							<legend className='f2 fw6 ph0 mh0'>Register</legend>
							<div className='mt3'>
								<label className='db fw6 lh-copy f6' htmlFor='name'>
									Name
								</label>
								<input
									className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
									maxLength={125}
									type='text'
									name='name'
									id='name'
									onKeyPress={handleEnterKey}
								/>
							</div>
							<div className='mt3'>
								<label className='db fw6 lh-copy f6' htmlFor='email-address'>
									Email
								</label>
								<input
									className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
									type='email'
									name='email-address'
									id='email-address'
									onKeyPress={handleEnterKey}
								/>
							</div>
							<div className='mv3'>
								<label className='db fw6 lh-copy f6' htmlFor='password'>
									Password
								</label>
								<input
									className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
									type='password'
									name='password'
									id='password'
									onKeyPress={handleEnterKey}
								/>
							</div>
							<div className='mv3'>
								<label className='db fw6 lh-copy f6' htmlFor='confirm-password'>
									Confirm Password
								</label>
								<input
									className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
									type='password'
									name='confirm-password'
									id='confirm-password'
									onKeyPress={handleEnterKey}
								/>
							</div>
							<div className='mt4'>
								<input
									className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
									type='submit'
									value='Register'
									onClick={handleSubmit}
								/>
							</div>
							<div className='lh-copy mt3'>
								<p
									className='f5 link black db bolder pointer'
									onClick={() => setRoute(route)}
								>
									{'<-- Back'}
								</p>
							</div>
						</fieldset>
					</div>
				</main>
			</article>
			{errorState ? (
				<div
					id='error-message'
					className='f4 mt4 dark-red animate__animated animate__heartBeat dib'
					style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}
				>
					{errorState}
				</div>
			) : null}
		</div>
	);
};

const mapStateToProps = state => ({
	route: state.setRoute.route
});

const mapDispatchToProps = dispatch => ({
	setRoute: route => dispatch(updateRoute(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
