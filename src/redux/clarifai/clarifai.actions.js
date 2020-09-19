import { ClarifaiActionTypes } from './clarifai.types';

const URL = 'https://boiling-brushlands-70070.herokuapp.com';

export const requestClarifai = input => async dispatch => {
	if (!input) {
		dispatch({
			type: ClarifaiActionTypes.CLEAR_FACES,
			payload: []
		});
		return;
	}

	dispatch({ type: ClarifaiActionTypes.REQUEST_CLARIFAI_PENDING });
	const apiCall = await fetch(`${URL}/imageurl`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			input
		})
	}).then(data => data);

	try {
		const request = await apiCall.json();
		dispatch({
			type: ClarifaiActionTypes.REQUEST_CLARIFAI_SUCCESS,
			payload: getDetectedFaces(request.outputs[0].data.regions)
		});
	} catch (err) {
		dispatch({
			type: ClarifaiActionTypes.REQUEST_CLARIFAI_FAILED,
			payload: err
		});
	}
};

const getDetectedFaces = faces => {
	const detectedFaces = faces.map(region => {
		const {
			region_info: { bounding_box }
		} = region;

		return { ...bounding_box };
	});
	return detectedFaces;
};
