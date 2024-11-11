import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import History from './history';

jest.mock('@auth0/auth0-react');
jest.mock('../components/sideBar', () => () => <div>Mocked SideBar</div>);

describe('History Route', () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      loginWithRedirect: jest.fn(),
    });
  });

  it('renders the History component correctly', () => {
    render(<History />);
    
    // Check if the mocked sidebar is rendered
    expect(screen.getByText(/Mocked SideBar/i)).toBeInTheDocument();
    
    // Check if the page header is rendered
    expect(screen.getByText(/Tus secretos solo conocidos por los/i)).toBeInTheDocument();
    
    // Check if the macronutrients section is rendered
    expect(screen.getByText(/Macro/i)).toBeInTheDocument();
    expect(screen.getByText(/Proteína/i)).toBeInTheDocument();
    
    // Check if the alimentos consumidos section is rendered
    expect(screen.getByText(/Alimentos/i)).toBeInTheDocument();
  });

  it('redirects to login if not authenticated', () => {
    const loginWithRedirect = jest.fn();
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect,
    });

    render(<History />);
    
    expect(loginWithRedirect).toHaveBeenCalled();
  });
});
