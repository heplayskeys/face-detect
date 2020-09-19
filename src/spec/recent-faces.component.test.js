import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { RecentFaces } from '../components/recent-faces/recent-faces.component';

let wrapper;

describe('<RecentFaces />', () => {
	beforeAll(() => {
		const mockProps = {
			recentGrabs: [0],
			route: 'home',
			setInput: jest.fn()
		};
		wrapper = shallow(<RecentFaces {...mockProps} />);
	});

	it('renders the recent faces component with length 1', () => {
		expect(shallowToJson(wrapper)).toMatchSnapshot();
		expect(wrapper.find('img')).toHaveLength(1);
	});

	it('renders the recent faces component with length 3', () => {
		wrapper.setProps({ recentGrabs: [0, 1, 2] });
		expect(shallowToJson(wrapper)).toMatchSnapshot();
		expect(wrapper.find('img')).toHaveLength(3);
	});

	it('renders the recent faces component with length 4', () => {
		wrapper.setProps({ recentGrabs: [0, 1, 2, 3] });
		expect(shallowToJson(wrapper)).toMatchSnapshot();
		expect(wrapper.find('img')).toHaveLength(4);
	});

	it('renders the recent faces component with length 4 as maximum count', () => {
		wrapper.setProps({ recentGrabs: [0, 1, 2, 3, 4, 5, 6, 7] });
		expect(shallowToJson(wrapper)).toMatchSnapshot();
		expect(wrapper.find('img')).toHaveLength(4);
	});
});
