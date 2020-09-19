import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { SignIn } from '../components/sign-in/sign-in.component';

let wrapper;

describe('<SignIn />', () => {
	beforeAll(() => {
		const mockProps = {
			URL: '',
			route: '',
			setRoute: jest.fn(),
			setUser: jest.fn()
		};
		wrapper = shallow(<SignIn {...mockProps} />);
	});

	it('renders register component', () => {
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});
});
