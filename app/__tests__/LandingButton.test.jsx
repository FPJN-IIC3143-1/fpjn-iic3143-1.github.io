/** @jest-environment jsdom */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LandingButton from '../components/landingButton';

describe('LandingButton', () => {
  const defaultProps = {
    bgColor: '#FFFFFF',
    textColor: '#000000',
    boxWidth: '200px',
    text: 'Test Button',
    onClick: jest.fn(),
  };

  it('renders with the correct text and styles', () => {
    const { getByText } = render(<LandingButton {...defaultProps} />);
    const button = getByText('Test Button');
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({
      backgroundColor: '#FFFFFF',
      color: '#000000',
      width: '200px',
    });
  });

  it('calls onClick handler when clicked', () => {
    const { getByText } = render(<LandingButton {...defaultProps} />);
    const button = getByText('Test Button');
    
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('changes style on hover', () => {
    const { getByText } = render(<LandingButton {...defaultProps} />);
    const button = getByText('Test Button');
    
    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle({
      backgroundColor: '#D0BCFE',
      color: '#381E72',
    });

    fireEvent.mouseLeave(button);
    expect(button).toHaveStyle({
      backgroundColor: '#FFFFFF',
      color: '#000000',
    });
  });
}); 
