import { InputActionTypes } from './input.types';

export const setInputField = text => ({
	type: InputActionTypes.CHANGE_INPUT_FIELD,
	payload: text
});
