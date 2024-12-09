/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationLogOut from '../components/notificationLogOut';

// Mock the Auth0 hook
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    logout: jest.fn(),
  }),
}));

// Mock the NotisDropdown component
jest.mock('../components/notificationsDropdown.jsx', () => {
  return function MockNotisDropdown() {
    return <div data-testid="mocked-notifications-dropdown">Notifications Dropdown</div>;
  };
});

describe('NotificationLogOut', () => {
  it('renders correctly with all elements', () => {
    render(<NotificationLogOut />);
    
    expect(screen.getByTestId('notification-logout-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('notification-logout-container')).toBeInTheDocument();
    expect(screen.getByTestId('vertical-line-left')).toBeInTheDocument();
    expect(screen.getByTestId('vertical-line-right')).toBeInTheDocument();
    expect(screen.getByTestId('notification-button')).toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    expect(screen.getByTestId('notification-icon')).toBeInTheDocument();
    expect(screen.getByTestId('logout-icon')).toBeInTheDocument();
  });

  it('has correct button accessibility labels', () => {
    render(<NotificationLogOut />);
    
    expect(screen.getByLabelText('Toggle notifications')).toBeInTheDocument();
    expect(screen.getByLabelText('Log out')).toBeInTheDocument();
  });

  it('toggles notification dropdown on notification button click', () => {
    render(<NotificationLogOut />);
    
    // Initially dropdown should not be visible
    expect(screen.queryByTestId('mocked-notifications-dropdown')).not.toBeInTheDocument();
    
    // Click notification button
    fireEvent.click(screen.getByTestId('notification-button'));
    expect(screen.getByTestId('mocked-notifications-dropdown')).toBeInTheDocument();
    
    // Click again to hide
    fireEvent.click(screen.getByTestId('notification-button'));
    expect(screen.queryByTestId('mocked-notifications-dropdown')).not.toBeInTheDocument();
  });

  it('calls logout function with correct params when logout button is clicked', () => {
    const mockLogout = jest.fn();
    jest.spyOn(require('@auth0/auth0-react'), 'useAuth0').mockImplementation(() => ({
      logout: mockLogout,
    }));

    render(<NotificationLogOut />);
    
    fireEvent.click(screen.getByTestId('logout-button'));
    
    expect(mockLogout).toHaveBeenCalledWith({
      logoutParams: { returnTo: window.location.origin }
    });
  });

  it('has correct styling', () => {
    render(<NotificationLogOut />);
    
    const container = screen.getByTestId('notification-logout-container');
    expect(container).toHaveClass(
      'container',
      'bg-[#182F40]',
      'flex',
      'flex-row',
      'justify-center',
      'items-center',
      'w-[280px]',
      'h-[50px]',
      'rounded-[2px]',
      'gap-12',
      'px-8',
      'absolute',
      'top-0',
      'right-0',
      'm-1'
    );

    const buttons = [
      screen.getByTestId('notification-button'),
      screen.getByTestId('logout-button')
    ];

    buttons.forEach(button => {
      expect(button).toHaveClass(
        'flex',
        'justify-center',
        'items-center',
        'w-[40px]',
        'h-[50px]',
        'rounded-[8px]',
        'hover:border-white',
        'hover:border',
        'hover:border-solid',
        'border-none'
      );
    });

    const verticalLines = [
      screen.getByTestId('vertical-line-left'),
      screen.getByTestId('vertical-line-right')
    ];

    verticalLines.forEach(line => {
      expect(line).toHaveClass(
        'vertLine',
        'w-[0px]',
        'h-[25px]',
        'bg-gray-100',
        'border-x-gray-100',
        'border-x-solid',
        'rounded-[2px]',
        'border-x-2'
      );
    });
  });

  it('renders images with correct attributes', () => {
    render(<NotificationLogOut />);
    
    const notificationIcon = screen.getByTestId('notification-icon');
    expect(notificationIcon).toHaveAttribute('src', '/NotificationLogOut/notifications.png');
    expect(notificationIcon).toHaveAttribute('alt', 'notification');
    expect(notificationIcon).toHaveClass('w-[30px]', 'h-[40px]', 'pt-[7px]', 'pb-[7px]');

    const logoutIcon = screen.getByTestId('logout-icon');
    expect(logoutIcon).toHaveAttribute('src', '/NotificationLogOut/logout.png');
    expect(logoutIcon).toHaveAttribute('alt', 'logOut');
    expect(logoutIcon).toHaveClass('w-[30px]', 'h-[40px]', 'pt-[7px]', 'pb-[7px]');
  });
}); 
