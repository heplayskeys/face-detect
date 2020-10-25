import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setInputField } from '../../redux/input/input.actions';
import FaceCount from '../face-count/face-count.component.jsx';
import './image-link-form.styles.scss';

export const ImageLinkForm = props => {
	const {
		input,
		handleSubmit,
		numFaces,
		recentGrabs,
		setInput,
		URL,
		userID,
		isPending
	} = props;
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);

	const submitFile = async () => {
		try {
			if (!file) {
				throw new Error('Please select a valid file');
			}
			const formData = new FormData();

			formData.append('file', file[0]);

			const request = await fetch(`${URL}/image/${userID}`, {
				method: 'POST',
				body: formData
			});

			const response = await request.json();

			setLoading(false);
			setInput(response.Location);
			document.querySelector('.grab-btn').click();
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpload = async e => {
		e.preventDefault();
		setLoading(true);
		submitFile();
		document.querySelector('#file-upload-input').value = '';
	};

	return (
		<div>
			{numFaces || recentGrabs.length ? (
				<div>
					<FaceCount numFaces={numFaces} isPending={isPending} />
				</div>
			) : (
				<p className='f4 mt3 mb3'>
					{'Grab and count the faces in your image!'}
				</p>
			)}
			<div className='center'>
				<div
					id='input-container'
					className='br3 shadow-5 center form justify-around'
					style={{ padding: '1.5rem' }}
				>
					<input
						className='user-input pa2 f4 w-75-ns'
						type='text'
						placeholder='input image URL here'
						onChange={e => setInput(e.target.value)}
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
			{loading ? (
				<div className='ma center'>
					<h3 className='f3 mt3 animate__animated animate__pulse animate__infinite'>
						{'Uploading image...'}
					</h3>
				</div>
			) : (
				<div className='center'>
					<div
						id='input-container'
						className='br3 shadow-5 center form justify-around'
						style={{ padding: '0.75rem' }}
					>
						<form id='imageForm' style={{ width: '100%' }}>
							<input
								id='file-upload-input'
								className='user-file-input pa2 f4 w-75-ns'
								type='file'
								accept='image/*'
								onChange={event => setFile(event.target.files)}
								style={{ overflow: 'hidden' }}
							/>
							<button
								className='upload-btn w-20-ns f4 grow link ph3 pv2 dib white mybg'
								onClick={e => handleUpload(e)}
							>
								{'upload'}
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = state => ({
	isPending: state.getFaces.isPending
});

const mapDispatchToProps = dispatch => ({
	setInput: inputVal => dispatch(setInputField(inputVal))
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageLinkForm);
