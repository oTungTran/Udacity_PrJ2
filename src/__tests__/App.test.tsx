import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './Utils';
import App from '../App';

test('renders learn react link', async () => {
  renderWithProviders(<App />, { isRouter: true });
  const linkElement = await screen.findByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});
