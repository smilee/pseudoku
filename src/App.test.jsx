import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const { getByTitle } = render(<App />);
  context('when the component loads', () => {
    it('renders', () => {
      expect(getByTitle('sudoku')).not.toBeNull();
    });
  });
});
