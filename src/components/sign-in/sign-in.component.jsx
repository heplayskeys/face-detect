import React, { useState } from 'react';
import './sign-in.styles.scss';

const SignIn = ({ URL, setState }) => {
	const [errorState, setErrorState] = useState('');

	const handleSubmit = async () => {
		const email = document.querySelector('#email-address').value;
		const password = document.querySelector('#password').value;

		setErrorState('');

		if (email === '' || password === '') {
			console.error('Invalid email and password');
			setErrorState('Invalid email and password');
			return;
		}

		const resp = await fetch(`${URL}/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				password
			})
		});

		const activeUser = await resp.json();

		if (resp.status === 200) {
			setState(prevState => ({ ...prevState, activeUser, route: 'home' }));
		} else {
			console.error('Invalid email and password');
			setErrorState('Invalid email and password');
		}
	};

	const handleEnterKey = event => {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	};

	return (
		<div>
			<article className='mw6 center bg-white-20 br3 pa3 pa3-ns mv3 ba b--black-10 shadow-5'>
				<main className='pa4 black-80'>
					<div className='measure'>
						<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
							<legend className='f2 fw6 ph0 mh0'>Sign In</legend>
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
							<div className='mt4'>
								<input
									className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
									type='submit'
									value='Sign in'
									onClick={handleSubmit}
								/>
							</div>
							<div className='lh-copy mt3'>
								<p
									className='f5 link black db bolder mb1 pointer'
									onClick={() =>
										setState(prevState => ({ ...prevState, route: 'register' }))
									}
								>
									Register
								</p>
							</div>
						</fieldset>
					</div>
				</main>
			</article>
			{errorState ? (
				<div className='f4 mt4 dark-red animate__animated animate__heartBeat'>
					{errorState}
				</div>
			) : null}
		</div>
	);
};

export default SignIn;
