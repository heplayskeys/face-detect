import React from 'react';
import './rank-styles.scss';

const Rank = ({ entries }) => {
	return (
		<div className='rank-container dib ba b--white-50 br3 pa3 bg-black-10'>
			<div className='white f4'>{`You have contributed ${entries} images to face-grabber.`}</div>
		</div>
	);
};

export default Rank;
