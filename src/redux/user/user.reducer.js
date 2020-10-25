import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
	activeUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UserActionTypes.SET_USER:
			return {
				...state,
				activeUser: action.payload
			};

		case UserActionTypes.UPDATE_ENTRIES:
			return {
				...state,
				activeUser: action.payload
			};

		case UserActionTypes.UPDATE_NAME:
			return {
				...state,
				activeUser: action.payload
			};

		default:
			return state;
	}
};

export default userReducer;
