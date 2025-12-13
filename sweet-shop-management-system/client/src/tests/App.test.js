import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Sweet Shop Management/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders the dashboard link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});