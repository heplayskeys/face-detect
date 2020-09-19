import * as UserActions from '../redux/user/user.actions';
import userReducer from '../redux/user/user.reducer';

import * as RouteActions from '../redux/route/route.actions';
import routeReducer from '../redux/route/route.reducer';

import * as InputActions from '../redux/input/input.actions';
import inputReducer from '../redux/input/input.reducer';

import clarifaiReducer from '../redux/clarifai/clarifai.reducer';

describe('User Reducer', () => {
	const INITIAL_STATE = {
		activeUser: null
	};

	const mockUser = {
		name: 'User Profile',
		entries: 99
	};

	it('should return initial state', () => {
		expect(userReducer(undefined, {})).toEqual(INITIAL_STATE);
		expect(userReducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
	});

	it('should return updated active user state', () => {
		expect(
			userReducer(INITIAL_STATE, UserActions.setUserProfile(mockUser))
		).toEqual({ activeUser: mockUser });
	});

	it('should return updated active user entries state', () => {
		expect(
			userReducer(INITIAL_STATE, UserActions.updateUserEntries(mockUser))
		).toEqual({ activeUser: { ...mockUser, entries: 100 } });
	});

	it('should return updated active user entries state', () => {
		expect(
			userReducer(
				INITIAL_STATE,
				UserActions.updateUserEntries({ ...mockUser, entries: 49 })
			)
		).toEqual({ activeUser: { ...mockUser, entries: 50 } });
	});
});

describe('Route Reducer', () => {
	const INITIAL_STATE = {
		route: 'signin'
	};

	it('should return initial state', () => {
		expect(routeReducer(undefined, RouteActions.updateRoute(''))).toEqual(
			INITIAL_STATE
		);
		expect(routeReducer(INITIAL_STATE, RouteActions.updateRoute(''))).toEqual(
			INITIAL_STATE
		);
	});

	it('should return updated route states', () => {
		expect(
			routeReducer(INITIAL_STATE, RouteActions.updateRoute('signin'))
		).toEqual({ route: 'register' });

		expect(
			routeReducer(INITIAL_STATE, RouteActions.updateRoute('register'))
		).toEqual(INITIAL_STATE);

		expect(
			routeReducer(INITIAL_STATE, RouteActions.updateRoute('signout'))
		).toEqual({ route: 'register' });

		expect(
			routeReducer(INITIAL_STATE, RouteActions.updateRoute('login'))
		).toEqual({ route: 'home' });

		expect(
			routeReducer(INITIAL_STATE, RouteActions.updateRoute('home'))
		).toEqual({ route: 'signout' });
	});
});

describe('Input Reducer', () => {
	const INITIAL_STATE = {
		input: ''
	};

	it('should return initial state', () => {
		expect(inputReducer(undefined, InputActions.setInputField(''))).toEqual(
			INITIAL_STATE
		);
		expect(inputReducer(INITIAL_STATE, InputActions.setInputField(''))).toEqual(
			INITIAL_STATE
		);
	});

	it('should return updated route state', () => {
		expect(
			inputReducer(INITIAL_STATE, InputActions.setInputField('Input Text'))
		).toEqual({ input: 'Input Text' });
	});
});

describe('Clarifai Reducer', () => {
	const INITIAL_STATE = {
		detectedFaces: [],
		errorMsg: '',
		isPending: false
	};

	it('should return initial state', () => {
		expect(clarifaiReducer(undefined, {})).toEqual(INITIAL_STATE);
	});

	it('should return pending request state', () => {
		expect(
			clarifaiReducer(INITIAL_STATE, {
				type: 'REQUEST_CLARIFAI_PENDING'
			})
		).toEqual({ ...INITIAL_STATE, isPending: true });
	});

	it('should return successful request state', () => {
		expect(
			clarifaiReducer(INITIAL_STATE, {
				type: 'REQUEST_CLARIFAI_SUCCESS',
				payload: [1, 2, 3, 4, 5]
			})
		).toEqual({ ...INITIAL_STATE, detectedFaces: [1, 2, 3, 4, 5] });
	});

	it('should return error request state', () => {
		expect(
			clarifaiReducer(INITIAL_STATE, {
				type: 'REQUEST_CLARIFAI_FAILED',
				payload: 'Request Error Message'
			})
		).toEqual({ ...INITIAL_STATE, errorMsg: 'Request Error Message' });
	});

	it('should return cleared request state', () => {
		expect(
			clarifaiReducer(INITIAL_STATE, {
				type: 'CLEAR_FACES',
				payload: []
			})
		).toEqual(INITIAL_STATE);
	});
});
