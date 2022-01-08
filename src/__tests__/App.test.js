import React from 'react';
import { shallow } from 'enzyme';

import App from 'App';
import Tuner from 'components/Tuner';

const app = shallow(<App />);
const tuner = (props = {}) => { return shallow(<Tuner {...props} />); }

describe('Tuner component tests', () => {
  it('Should render the tuner', () => {
    const props = { show: true };
    const component = tuner(props);
    const wrapper = component.find(`[data-test='tuner']`);
    expect(wrapper).toHaveLength(1);
  });

  it('Should not render the tuner', () => {
    const props = { show: false };
    const component = tuner(props);
    const wrapper = component.find(`[data-test='tuner']`);
    expect(wrapper).toHaveLength(0);
  });

  it('Should render the tuner by default', () => {
    const component = tuner();
    const wrapper = component.find(`[data-test='tuner']`);
    expect(wrapper).toHaveLength(1);
  });
});

describe('Application tests', () => {
  it('Should renderthe tuner', () => {
    const component = app;
    const wrapper = component.find(Tuner);
    expect(wrapper).toHaveLength(1);
  })
})