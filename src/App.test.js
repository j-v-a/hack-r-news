import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { Search, Button, Table } from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	test('has a valid snapshot', () => {
		const component = renderer.create(<App />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe('Search', () => {
	const props = {
		value: 'searchTerm',
		onChange: () => 'onChange',
		onSubmit: () => 'onSubmit',
		children: 'Search'
	};
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Search {...props}>Search</Search>, div);
		ReactDOM.unmountComponentAtNode(div);
	});
	test('has a valid snapshot', () => {
		const component = renderer.create(<Search {...props}>Search</Search>);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe('Button', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<Button onClick={() => 'onClick'} classname="button">
				Give Me More
			</Button>,
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	});
	test('has a valid snapshot', () => {
		const component = renderer.create(
			<Button onClick={() => 'onClick'} classname="button">
				Give Me More
			</Button>
		);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe('Table', () => {
	const props = {
		list: [
			{ title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
			{ title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' }
		],
		onDismiss: () => 'onDismiss'
	};
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Table {...props} />, div);
	});
	test('has a valid snapshot', () => {
		const component = renderer.create(<Table {...props} />);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('shows two items in list', () => {
		const element = shallow(<Table {...props} />);
		expect(element.find('.table-row').length).toBe(2);
	});
});
