import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import BoundingBox from '../components/bounding-box/bounding-box.component';

describe('<BoundingBox />', () => {
	it('returns correct bounding box snapshot with no "face" prop', () => {
		const face = { left_col: 0, right_col: 0, top_row: 0, bottom_row: 0 };
		const wrapper = shallow(<BoundingBox face={face} />);
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});
});
