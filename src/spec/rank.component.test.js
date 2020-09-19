import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Rank } from '../components/rank/rank.component';

let wrapper;

describe('<Rank />', () => {
	beforeEach(() => {
		const mockProps = {
			entries: 10
		};
		wrapper = shallow(<Rank {...mockProps} />);
	});

	it('renders rank component with mock props', () => {
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});
});
