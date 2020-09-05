import { RouteActionTypes } from './route.types';

const INITIAL_STATE = {
	route: 'signin'
};

const routeReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case RouteActionTypes.CHANGE_ROUTE:
			return {
				...state,
				route: action.payload
			};

		default:
			return state;
	}
};

export default routeReducer;
