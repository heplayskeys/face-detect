import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import FaceDetect from '../components/face-detect/face-detect.component';

describe('<FaceDetect />', () => {
	it('returns correct face detect snapshot without props', () => {
		const wrapper = shallow(<FaceDetect />);
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});

	it('returns correct face detect snapshot with props', () => {
		const imageText = 'face-detect-img';
		const wrapper = shallow(<FaceDetect imageURL={imageText} />);
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});
});
