import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import MainPage from '../components/main-page/main-page.component';

let wrapper;

describe('<MainPage />', () => {
	beforeEach(() => {
		const mockProps = {
			input: '',
			route: 'signin',
			activeUser: null,
			detectedFaces: [],
			isPending: false,
			setInput: jest.fn(),
			setRoute: jest.fn(),
			setUser: jest.fn(),
			updateUser: jest.fn(),
			getFaces: jest.fn()
		};
		wrapper = shallow(<MainPage {...mockProps} />);
	});

	it('renders main page component successfully', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('renders sign in and register pages from setPage function', () => {
		expect(shallowToJson(wrapper)).toMatchSnapshot();
		wrapper.setProps({ route: 'register' });
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});

	it('renders main page component with signed in user and sign out', () => {
		wrapper.setProps({ activeUser: {}, route: 'home' });
		expect(shallowToJson(wrapper)).toMatchSnapshot();
		wrapper.setProps({ activeUser: null, route: 'signin' });
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});
});
