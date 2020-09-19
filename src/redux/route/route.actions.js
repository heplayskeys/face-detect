import { RouteActionTypes } from './route.types';

const getRoute = route => {
	switch (route) {
		case 'signin':
			return 'register';

		case 'register':
			return 'signin';

		case 'signout':
			return 'register';

		case 'login':
			return 'home';

		case 'home':
			return 'signout';

		default:
			return 'signin';
	}
};

export const updateRoute = route => {
	const routePayload = getRoute(route);

	return {
		type: RouteActionTypes.CHANGE_ROUTE,
		payload: routePayload
	};
};
