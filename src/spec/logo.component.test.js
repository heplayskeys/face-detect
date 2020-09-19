import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Logo from '../components/logo/logo.component';

describe('<Logo />', () => {
	it('returns correct logo snapshot', () => {
		const wrapper = shallow(<Logo />);
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});
});
