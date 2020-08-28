import React from 'react';

const FaceCount = ({ numFaces }) => {
	return numFaces ? (
		<div className='mb2'>
			<h3>
				{'I am able to grab '}
				<span className='f2-ns f3 white'>{numFaces}</span>
				{' faces from your image!'}
			</h3>
		</div>
	) : (
		<div className='mb2'>
			<h3 className='f3'>{'Counting faces...'}</h3>
		</div>
	);
};

export default FaceCount;
