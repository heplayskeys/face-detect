import { InputActionTypes } from './input.types';

const INITIAL_STATE = {
	input: ''
};

const inputReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case InputActionTypes.CHANGE_INPUT_FIELD:
			return {
				...state,
				input: action.payload
			};

		default:
			return state;
	}
};

export default inputReducer;
