import React, { useState } from 'react';
import './user-profile.styles.scss';
import { connect } from 'react-redux';
import { updateUserName } from '../../redux/user/user.actions';

const Profile = ({ activeUser, updateUserName }) => {
	const [errorState, setErrorState] = useState('');
	const URL = 'http://localhost:3001';

	const handleNameChange = async () => {
		const name = document.querySelector('#name').value;
		const id = activeUser.id;

		setErrorState('');

		if (name === activeUser.name) {
			return;
		}

		if (name === '' || name.length > 15) {
			console.error('Error: Name must be between 1-10 characters in length');
			setErrorState('Name must be between 1-10 characters');
			return;
		}

		const resp = await fetch(`${URL}/register`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.sessionStorage.getItem('token')
			},
			body: JSON.stringify({
				id,
				name
			})
		});

		const data = await resp.json();

		if (resp.status === 200) {
			updateUserName(activeUser, name);
			alert('Name updated.');
			document.querySelector('#name').value = '';
		} else {
			const errorMsg = await resp.json();
			console.error('Error:', errorMsg);
			setErrorState(`${errorMsg}`);
		}
	};

	const handleEnterKey = event => {
		if (event.key === 'Enter') {
			handleNameChange();
		}
	};

	const handlePasswordChange = async () => {
		const oldPassword = document.querySelector('#old-password').value;
		const newPassword = document.querySelector('#new-password').value;
		const confirmPassword = document.querySelector('#confirm-password').value;

		setErrorState('');

		if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
			console.error('Error: Please fill out all password fields');
			setErrorState('Please fill out all password fields');
			return;
		}

		if (newPassword !== confirmPassword) {
			console.error('Error: Passwords do not match');
			setErrorState('Passwords do not match');
			return;
		}

		const id = activeUser.id;

		const resp = await fetch(`${URL}/register`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.sessionStorage.getItem('token')
			},
			body: JSON.stringify({
				id,
				oldPassword,
				newPassword
			})
		});

		if (resp.status === 200) {
			alert('Password updated.');
			document.querySelector('#old-password').value = '';
			document.querySelector('#new-password').value = '';
			document.querySelector('#confirm-password').value = '';
		} else {
			const errorMsg = await resp.json();
			console.error('Error:', errorMsg);
			setErrorState(`${errorMsg}`);
		}
	};

	return (
		<div>
			<article id='profile-form-container' className='mw6 center'>
				<main
					className='pa4 black-80'
					style={{ paddingTop: '0', width: '100%' }}
				>
					<div className='measure'>
						<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
							<legend
								className='f3 fw6 ph0 mh0'
								style={{ display: 'flex', justifyContent: 'center' }}
							>{`${activeUser.name}'s Profile`}</legend>
							<div
								className='br-100 ba h3 w3 flex'
								style={{
									margin: '0 auto',
									background: 'url("http://tachyons.io/img/logo.jpg")'
								}}
							>
								<div
									className='br-100 ba'
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										width: '3rem',
										height: '3rem',
										margin: 'auto',
										marginTop: 'auto',
										background: 'rgba(0, 0, 0, 0.75)'
									}}
								>
									<span
										style={{
											color: '#fff',
											fontFamily: 'system-ui',
											fontStyle: 'italic'
										}}
									>
										{activeUser.name[0].toUpperCase()}
									</span>
								</div>
							</div>
							<div className='mt3'>
								<input
									className='pa2 input-reset bg-transparent hover-bg-black hover-white w-100 hvr-blk'
									maxLength={15}
									placeholder={activeUser.name}
									type='text'
									name='name'
									id='name'
									onKeyPress={handleEnterKey}
									style={{ borderWidth: '1px' }}
								/>
							</div>
							<div className='mt3'>
								<input
									className='b ph3 pv2 input-reset b--black bg-transparent grow pointer f6 dib'
									type='submit'
									value='Update Name'
									onClick={handleNameChange}
									style={{ border: 'black solid 1px' }}
								/>
							</div>
							<hr className='mt4 mb4 shadow-4' />
							<div className='mv3'>
								<span className='db fw6 lh-copy f6'>Old Password</span>
								<input
									className='b pa2 input-reset bg-transparent hover-bg-black hover-white w-100 hvr-blk'
									type='password'
									name='old-password'
									id='old-password'
									style={{ borderWidth: '1px' }}
								/>
							</div>
							<div className='mv3'>
								<span className='db fw6 lh-copy f6'>New Password</span>
								<input
									className='b pa2 input-reset bg-transparent hover-bg-black hover-white w-100 hvr-blk'
									type='password'
									name='new-password'
									id='new-password'
									style={{ borderWidth: '1px' }}
								/>
							</div>
							<div className='mv3'>
								<span className='db fw6 lh-copy f6'>Confirm Password</span>
								<input
									className='b pa2 input-reset bg-transparent hover-bg-black hover-white w-100 hvr-blk'
									type='password'
									name='confirm-password'
									id='confirm-password'
									style={{ borderWidth: '1px' }}
								/>
							</div>
							<div>
								<input
									className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
									type='submit'
									value='Change Password'
									onClick={handlePasswordChange}
								/>
							</div>
						</fieldset>
					</div>
				</main>
			</article>
			{errorState ? (
				<div
					id='error-message'
					className='mt2 dark-red animate__animated animate__heartBeat dib'
					style={{
						whiteSpace: 'pre-wrap',
						display: 'flex',
						justifyContent: 'center'
					}}
				>
					{errorState}
				</div>
			) : null}
		</div>
	);
};

const mapStateToProps = state => ({
	activeUser: state.setUser.activeUser
});

const mapDispatchToProps = dispatch => ({
	updateUserName: (user, name) => dispatch(updateUserName(user, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
