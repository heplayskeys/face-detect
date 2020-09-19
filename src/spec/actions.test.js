import * as InputActions from '../redux/input/input.actions';
import { InputActionTypes } from '../redux/input/input.types';

import * as UserActions from '../redux/user/user.actions';
import { UserActionTypes } from '../redux/user/user.types';

import * as RouteActions from '../redux/route/route.actions';
import { RouteActionTypes } from '../redux/route/route.types';

import * as ClarifaiActions from '../redux/clarifai/clarifai.actions';
import { ClarifaiActionTypes } from '../redux/clarifai/clarifai.types';
import { mockStore } from '../setupTests';

describe('Input Actions', () => {
	const mockInput = 'Sample Text for Testing';

	const expectedAction = {
		type: InputActionTypes.CHANGE_INPUT_FIELD,
		payload: mockInput
	};

	it('creates redux action for input field', () => {
		expect(InputActions.setInputField(mockInput)).toEqual(expectedAction);
	});
});

describe('User Actions', () => {
	const mockUser = {
		id: 1,
		name: 'Test User',
		email: 'test@user.test',
		entries: 0
	};

	it('creates redux action for setting user profile', () => {
		const expectedAction = {
			type: UserActionTypes.SET_USER,
			payload: mockUser
		};

		expect(UserActions.setUserProfile(mockUser)).toEqual(expectedAction);
	});

	it('creates redux action for updating user entries', () => {
		const expectedAction = {
			type: UserActionTypes.UPDATE_ENTRIES,
			payload: {
				...mockUser,
				entries: mockUser.entries + 1
			}
		};

		expect(UserActions.updateUserEntries(mockUser)).toEqual(expectedAction);
	});
});

describe('Route Actions', () => {
	const mockRouteMap = {
		signin: 'register',
		register: 'signin',
		signout: 'register',
		login: 'home',
		home: 'signout',
		default: 'signin'
	};

	it('creates redux action for setting the default route', () => {
		const expectedAction = {
			type: RouteActionTypes.CHANGE_ROUTE,
			payload: mockRouteMap['default']
		};

		expect(RouteActions.updateRoute('default')).toEqual(expectedAction);
	});

	it('creates redux action for setting the signin route', () => {
		const expectedAction = {
			type: RouteActionTypes.CHANGE_ROUTE,
			payload: mockRouteMap['signin']
		};

		expect(RouteActions.updateRoute('signin')).toEqual(expectedAction);
	});

	it('creates redux action for setting the register route', () => {
		const expectedAction = {
			type: RouteActionTypes.CHANGE_ROUTE,
			payload: mockRouteMap['register']
		};

		expect(RouteActions.updateRoute('register')).toEqual(expectedAction);
	});

	it('creates redux action for setting the signout route', () => {
		const expectedAction = {
			type: RouteActionTypes.CHANGE_ROUTE,
			payload: mockRouteMap['signout']
		};

		expect(RouteActions.updateRoute('signout')).toEqual(expectedAction);
	});

	it('creates redux action for setting the login route', () => {
		const expectedAction = {
			type: RouteActionTypes.CHANGE_ROUTE,
			payload: mockRouteMap['login']
		};

		expect(RouteActions.updateRoute('login')).toEqual(expectedAction);
	});

	it('creates redux action for setting the home route', () => {
		const expectedAction = {
			type: RouteActionTypes.CHANGE_ROUTE,
			payload: mockRouteMap['home']
		};

		expect(RouteActions.updateRoute('home')).toEqual(expectedAction);
	});
});

describe('Clarifai Actions', () => {
	const store = mockStore();

	beforeEach(() => {
		store.clearActions();
	});

	it('handles clarifai request api with no input', () => {
		store.dispatch(ClarifaiActions.requestClarifai());
		const action = store.getActions()[0];

		const expectedAction = {
			type: ClarifaiActionTypes.CLEAR_FACES,
			payload: []
		};

		expect(action).toEqual(expectedAction);
	});

	it('handles clarifai request api with input (PENDING)', () => {
		const testInput = 'Clarifai Test Input';
		store.dispatch(ClarifaiActions.requestClarifai(testInput));
		const action = store.getActions()[0];

		const expectedAction = {
			type: ClarifaiActionTypes.REQUEST_CLARIFAI_PENDING
		};

		expect(action).toEqual(expectedAction);
	});
});
