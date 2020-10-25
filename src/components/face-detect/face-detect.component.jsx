import React, { useState } from 'react';
import BoundingBox from '../bounding-box/bounding-box.component.jsx';
import './face-detect.styles.scss';

const FaceDetect = ({ imageURL, detectedFaces, error }) => {
	const [boundingBoxes, setBoundingBoxes] = useState([]);

	const createBoundingBoxes = () => {
		setBoundingBoxes(
			detectedFaces.map((face, idx) => <BoundingBox key={idx} face={face} />)
		);
	};

	return imageURL && !error ? (
		<div className='ma center'>
			<div className='absolute mt4 db display-image-container'>
				<img
					id='face-detect-img'
					className='ba br3 b--white shadow-3 animate__animated animate__bounceIn detect-img'
					src={imageURL}
					alt='face-detect'
					onLoad={createBoundingBoxes}
				/>
				{boundingBoxes}
			</div>
		</div>
	) : (
		<div className='f4 mt4 dark-red animate__animated animate__bounceIn dib'>
			{error}
		</div>
	);
};

export default FaceDetect;
