import React from 'react';
import FaceCount from '../face-count/face-count.component.jsx';
import './image-link-form.styles.scss';

const ImageLinkForm = ({
	input,
	handleInput,
	handleSubmit,
	numFaces,
	recentGrabs
}) => {
	return (
		<div>
			{numFaces || recentGrabs.length ? (
				<div>
					<FaceCount numFaces={numFaces} />
				</div>
			) : (
				<p className='f4 mb4'>{'Grab and count the faces in your image!'}</p>
			)}
			<div className='center'>
				<div
					id='input-container'
					className='pa4 br3 shadow-5 center form justify-around'
				>
					<input
						className='user-input f4 pa2 w-75'
						type='text'
						placeholder='input image URL here'
						onChange={handleInput}
						value={input}
					/>
					<button
						className='grab-btn w-20 f4 grow link ph3 pv2 dib white mybg'
						onClick={handleSubmit}
					>
						{'grab'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ImageLinkForm;
