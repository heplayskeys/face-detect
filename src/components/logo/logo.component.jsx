import React from 'react';
import Tilt from 'react-tilt';
import faceLogo from './face.png';
import './logo.scss';

const Logo = () => {
	return (
		<div className='face-detect-logo ma4 mt0'>
			<Tilt
				className='Tilt br2 shadow-2'
				options={{ max: 25, scale: 1.15 }}
				style={{ height: 150, width: 150 }}
			>
				<div className='Tilt-inner pa3'>
					<img src={faceLogo} alt='Logo' />
					<div>face grabber</div>
				</div>
			</Tilt>
		</div>
	);
};

export default Logo;
