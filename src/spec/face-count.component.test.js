import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import FaceCount from '../components/face-count/face-count.component';

describe('<FaceCount />', () => {
	it('returns correct face count snapshot with no faces', () => {
		const wrapper = shallow(<FaceCount />);
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});

	it('returns correct face count snapshot with faces', () => {
		const numFaces = 5;
		const wrapper = shallow(<FaceCount numFaces={numFaces} />);
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});
});
