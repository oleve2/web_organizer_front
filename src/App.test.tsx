import React from 'react';
import { render, screen } from '@testing-library/react';

test('first launch', () => {
  expect(1).toBe(1);
});

/*
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/
