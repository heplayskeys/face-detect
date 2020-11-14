import React from 'react';

const FaceCount = ({ numFaces, isPending }) => {
	return numFaces ? (
		<div className='mv2'>
			<h3>
				{'I am able to grab '}
				<span className='f2-ns f3 white'>{numFaces}</span>
				{`${numFaces === 1 ? ' face' : ' faces'} from your image!`}
			</h3>
		</div>
	) : isPending ? (
		<div className='mb2'>
			<h3 className='f3 mt2'>{'Counting faces...'}</h3>
		</div>
	) : (
		<p className='f4 mt3 mb3'>{'I am unable to grab faces from your image.'}</p>
	);
};

export default FaceCount;
