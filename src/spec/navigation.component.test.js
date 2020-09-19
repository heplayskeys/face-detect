import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Navigation } from '../components/navigation/navigation.component';

let wrapper;

describe('<Navigation />', () => {
	beforeEach(() => {
		const mockProps = {
			route: 'signin',
			setRoute: jest.fn(),
			activeUser: null
		};
		wrapper = shallow(<Navigation {...mockProps} />);
	});

	it('renders the navigation component successfully for signin', () => {
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});

	it('renders the navigation component successfully for register', () => {
		wrapper.setProps({ route: 'register' });
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});

	it('renders the navigation component successfully for home', () => {
		wrapper.setProps({ route: 'home', activeUser: { name: 'Enzyme' } });
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});
});
