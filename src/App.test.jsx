import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const { getByText } = render(<App />);
  context('when the component loads', () => {
    it('renders', () => {
      expect(getByText('Hello, world!')).not.toBeNull();
    });
  });
});
