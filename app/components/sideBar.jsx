import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DietaryPreferences from './dietary-preferences';
import { useAuth0 } from '@auth0/auth0-react';
import useApi from './useApi.jsx';
import { useToken } from './tokenContext';

jest.mock('@auth0/auth0-react');
jest.mock('./useApi.jsx');
jest.mock('./tokenContext');

describe('DietaryPreferences', () => {
  const mockLoginWithRedirect = jest.fn();
  const mockGetDailyGoal = jest.fn();
  const mockGetPreferences = jest.fn();
  const mockSetDailyGoal = jest.fn();
  const mockSetPreferences = jest.fn();

  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      loginWithRedirect: mockLoginWithRedirect,
    });

    useApi.mockReturnValue({
      getDailyGoal: mockGetDailyGoal,
      getPreferences: mockGetPreferences,
      setDailyGoal: mockSetDailyGoal,
      setPreferences: mockSetPreferences,
    });

    useToken.mockReturnValue({
      tokenReady: true,
    });
  });

  it('renders correctly', () => {
    render(<DietaryPreferences />);
    expect(screen.getByText(/Preferencias Alimenticias/i)).toBeInTheDocument();
  });

  it('fetches data on mount', async () => {
    mockGetDailyGoal.mockResolvedValueOnce({ goal: { protein: 100, carbs: 200, fats: 50, calories: 2000 } });
    mockGetPreferences.mockResolvedValueOnce({ diet: 'vegan', intolerances: ['celiac'] });

    render(<DietaryPreferences />);

    expect(mockGetDailyGoal).toHaveBeenCalled();
    expect(mockGetPreferences).toHaveBeenCalled();
  });

  it('allows editing and saving macro goals', async () => {
    render(<DietaryPreferences />);
    fireEvent.click(screen.getByText(/Editar objetivos/i));

    const proteinInput = screen.getByRole('spinbutton', { name: /Proteína/i });
    fireEvent.change(proteinInput, { target: { value: '150' } });

    fireEvent.click(screen.getByText(/Guardar objetivos/i));
    expect(mockSetDailyGoal).toHaveBeenCalledWith({
      protein: '150',
      carbs: '0',
      fats: '0',
      calories: '0',
    });
  });

  it('allows editing and saving dietary preferences', async () => {
    render(<DietaryPreferences />);
    fireEvent.click(screen.getByLabelText(/Celíaco\/a/i));

    fireEvent.click(screen.getByText(/Guardar preferencias/i));
    expect(mockSetPreferences).toHaveBeenCalledWith({
      diet: '',
      intolerances: ['celiac'],
    });
  });
});
