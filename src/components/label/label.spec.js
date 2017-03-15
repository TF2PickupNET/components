import React from 'react';
import test from 'ava';

import Label from './label';
import { shallow } from '/tests/helpers/enzyme';

test('should render a label tag with the children inside', (t) => {
  const wrapper = shallow(<Label for="some">Content</Label>);

  t.deepEqual(wrapper.find('label').length, 1);
  t.deepEqual(wrapper.find('label').text(), 'Content');
});
