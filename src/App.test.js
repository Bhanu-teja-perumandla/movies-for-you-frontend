import { render, screen } from '@testing-library/react';
import App from './App';
import SignIn from './Components/SignIn/SignIn';

test('renders hello world', () => {
  render(<App />);
  const linkElement = screen.getByText(/MoviesForYou/i);
  expect(linkElement).toBeInTheDocument();
});
