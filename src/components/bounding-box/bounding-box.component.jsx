import React from 'react';
import './bounding-box.styles.scss';

const calculateFaceLocation = data => {
	const inputImage = document.querySelector('#face-detect-img');
	const width = Number(inputImage.width);
	const height = Number(inputImage.height);

	return {
		left: data.left_col * width,
		top: data.top_row * height,
		right: width - data.right_col * width,
		bottom: height - data.bottom_row * height
	};
};

const BoundingBox = ({ face }) => {
	return (
		<div
			className='bounding-box grow animate__animated animate__fadeIn'
			style={calculateFaceLocation(face)}
		></div>
	);
};

export default BoundingBox;
