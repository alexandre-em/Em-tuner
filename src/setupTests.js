// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

const mediaDevicesMock = {
	enumerateDevices: jest.fn(),
	getUserMedia: () => jest.fn(Promise.resolve(MediaStreamMock)),
};

const MediaStreamMock = {
	getTracks: () => {
		return [{ stop:jest.fn(Promise.resolve()) }];
	}
}

Enzyme.configure({ adapter: new Adapter() });
global.navigator.mediaDevices = mediaDevicesMock;