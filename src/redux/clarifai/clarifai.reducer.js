import { ClarifaiActionTypes } from './clarifai.types';

const INITIAL_STATE = {
	detectedFaces: [],
	errorMsg: '',
	isPending: false
};

const clarifaiReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case ClarifaiActionTypes.REQUEST_CLARIFAI_PENDING:
			return {
				...state,
				isPending: true
			};

		case ClarifaiActionTypes.REQUEST_CLARIFAI_SUCCESS:
			return {
				...state,
				detectedFaces: action.payload,
				isPending: false
			};

		case ClarifaiActionTypes.REQUEST_CLARIFAI_FAILED:
			return {
				...state,
				errorMsg: action.payload,
				isPending: false
			};

		case ClarifaiActionTypes.CLEAR_FACES:
			return {
				...state,
				detectedFaces: action.payload
			};

		default:
			return state;
	}
};

export default clarifaiReducer;
