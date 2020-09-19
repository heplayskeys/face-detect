import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import UserGreeting from '../components/user-greeting/user-greeting.component';

describe('<UserGreeting />', () => {
	it('returns the correct greeting text and snapshot', () => {
		const name = 'Enzyme';
		const wrapper = shallow(<UserGreeting name={name} />);
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});
});
