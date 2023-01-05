import { render, screen } from '@testing-library/react';
import App, { UserContext } from './App';

test('renders hello world', () => {
  render(<App />);
  const linkElement = screen.getByText(/MoviesForYou/i);
  expect(linkElement).toBeInTheDocument();
});

export function customRender(ui, userContext){
  return render(<UserContext.Provider value={userContext}>{ui}</UserContext.Provider>)
}


