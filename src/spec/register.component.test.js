import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Register } from '../components/register/register.component';

let wrapper;

describe('<Register />', () => {
	beforeAll(() => {
		const mockProps = {
			URL: '',
			route: '',
			setRoute: jest.fn()
		};
		wrapper = shallow(<Register {...mockProps} />);
	});

	it('renders register component', () => {
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});
});
