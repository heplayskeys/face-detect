import React from 'react';
import { connect } from 'react-redux';
import { setInputField } from '../../redux/input/input.actions';
import FaceCount from '../face-count/face-count.component.jsx';
import './image-link-form.styles.scss';

const ImageLinkForm = props => {
	const { input, handleSubmit, numFaces, recentGrabs, setInput } = props;

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
						className='user-input f4 pa2 w-75-ns'
						type='text'
						placeholder='input image URL here'
						onChange={setInput}
						value={input}
					/>
					<button
						className='grab-btn w-20-ns f4 grow link ph3 pv2 dib white mybg'
						onClick={handleSubmit}
					>
						{'grab'}
					</button>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	setInput: e => dispatch(setInputField(e.target.value))
});

export default connect(null, mapDispatchToProps)(ImageLinkForm);
