import React from 'react';
import './register.styles.scss';

const Register = ({ URL, setState }) => {
	const handleSubmit = async () => {
		const name = document.querySelector('#name').value;
		const email = document.querySelector('#email-address').value;
		const password = document.querySelector('#password').value;
		const confirmPassword = document.querySelector('#confirm-password').value;

		if (
			name === '' ||
			email === '' ||
			password === '' ||
			confirmPassword === ''
		) {
			console.error('Please fill out all fields');
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
			setState(prevState => ({ ...prevState, route: 'signin' }));
		} else {
			const errorMsg = await resp.json();
			console.error('Error:', errorMsg);
		}
	};
	return (
		<article className='mw6 center bg-white-20 br3 pa3 pa4-ns mv3 ba b--black-10 shadow-5'>
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
								onClick={() =>
									setState(prevState => ({ ...prevState, route: 'signin' }))
								}
							>
								{'<-- Back'}
							</p>
						</div>
					</fieldset>
				</div>
			</main>
		</article>
	);
};

export default Register;
