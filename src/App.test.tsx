import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Task Flow header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Task Flow/i);
  expect(headerElement).toBeInTheDocument();
});
