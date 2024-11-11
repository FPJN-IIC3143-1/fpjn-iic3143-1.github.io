import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'jest-mock';
import NotificationLogOut from './notificationLogOut';

const buildNotificationLogOut = (props = {}) => {
  return <NotificationLogOut {...props} />;
};

const logout = jest.fn();

jest.mock('@auth0/auth0-react');
const mockedUseAuth0 = mocked(useAuth0, true);

describe('NotificationLogOut', () => {
  beforeEach(() => {
    mockedUseAuth0.mockReturnValue({
      logout: logout,
    });
  });

  it('renders correctly', () => {
    render(buildNotificationLogOut());

    const button = screen.getByTestId('notification-log-out');
    expect(button).toBeInTheDocument();
  });

  it('triggers handleNotifications on notification button click', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(buildNotificationLogOut());
    
    const button = screen.getByTestId('notification-button');

    fireEvent.click(button);
    expect(consoleLogSpy).toHaveBeenCalledWith("Notification");
  });

  it('triggers logout on log out button click', () => {
    render(buildNotificationLogOut());
    const button = screen.getByTestId('log-out-button');

    fireEvent.click(button);
    expect(logout).toHaveBeenCalled();
  });
});
