import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { ImageLinkForm } from '../components/image-link-form/image-link-form.component';

let wrapper;

describe('<ImageLinkForm />', () => {
	beforeEach(() => {
		const mockProps = {
			input: '',
			handleSubmit: jest.fn(),
			numFaces: 0,
			recentGrabs: [],
			setInput: jest.fn()
		};

		wrapper = shallow(<ImageLinkForm {...mockProps} />);
	});

	it('renders image link form without face detect component', () => {
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});

	it('renders image link form with face detect component', () => {
		wrapper.setProps({ numFaces: 10 });
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});
});
