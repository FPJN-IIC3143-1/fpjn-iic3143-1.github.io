/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingButton from '../components/landingButton';

describe('LandingButton', () => {
  const mockProps = {
    bgColor: '#FF0000',
    textColor: '#FFFFFF',
    boxWidth: '200px',
    text: 'Test Button',
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct props', () => {
    render(<LandingButton {...mockProps} />);
    const button = screen.getByText('Test Button');
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({
      backgroundColor: '#FF0000',
      color: '#FFFFFF',
      width: '200px',
    });
  });

  it('calls onClick handler when clicked', () => {
    render(<LandingButton {...mockProps} />);
    const button = screen.getByText('Test Button');
    
    fireEvent.click(button);
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('changes style on hover', () => {
    render(<LandingButton {...mockProps} />);
    const button = screen.getByText('Test Button');
    
    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle({
      backgroundColor: '#D0BCFE',
      color: '#381E72',
    });

    fireEvent.mouseLeave(button);
    expect(button).toHaveStyle({
      backgroundColor: '#FF0000',
      color: '#FFFFFF',
    });
  });
}); 
