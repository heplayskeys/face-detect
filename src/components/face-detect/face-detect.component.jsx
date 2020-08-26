import React from 'react';
import BoundingBox from '../bounding-box/bounding-box.component.jsx';
import './face-detect.styles.scss';

const FaceDetect = ({ imageURL, faces }) => {
	const inputImage = document.querySelector('#face-detect-img');

	return imageURL ? (
		<div className='ma center'>
			<div className='absolute mt4 db'>
				<img
					id='face-detect-img'
					className='ba br3 b--white shadow-3 animate__animated animate__bounceIn detect-img'
					src={imageURL}
					alt='face-detect'
				/>
				{inputImage && inputImage !== undefined
					? faces.map((face, idx) => <BoundingBox key={idx} face={face} />)
					: null}
			</div>
		</div>
	) : null;
};

export default FaceDetect;
