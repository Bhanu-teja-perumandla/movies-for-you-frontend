import { render, screen } from '@testing-library/react';
import App, { FavMoviesContext, UserContext, YourRatingsContext } from './App';

test('renders hello world', () => {
  render(<App />);
  const linkElement = screen.getByText(/MoviesForYou/i);
  expect(linkElement).toBeInTheDocument();
});


