/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PurpleButton from '../components/purpleButton';

describe('PurpleButton', () => {
  const defaultProps = {
    text: 'Test Button',
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<PurpleButton {...defaultProps} />);
    const button = screen.getByTestId('purple-button');
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test Button');
    expect(button).toHaveStyle({
      backgroundColor: '#4F378B',
      color: '#FFFFFF',
    });
  });

  it('renders with custom props', () => {
    const customProps = {
      ...defaultProps,
      bgColor: '#000000',
      textColor: '#FF0000',
    };
    
    render(<PurpleButton {...customProps} />);
    const button = screen.getByTestId('purple-button');
    
    expect(button).toHaveStyle({
      backgroundColor: '#000000',
      color: '#FF0000',
    });
  });

  it('calls onClick handler when clicked', () => {
    render(<PurpleButton {...defaultProps} />);
    const button = screen.getByTestId('purple-button');
    
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('changes style on hover', () => {
    render(<PurpleButton {...defaultProps} />);
    const button = screen.getByTestId('purple-button');
    
    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle({
      backgroundColor: '#7461AC',
      color: '#FFFFFF',
    });

    fireEvent.mouseLeave(button);
    expect(button).toHaveStyle({
      backgroundColor: '#4F378B',
      color: '#FFFFFF',
    });
  });

  it('renders with SVG icon', () => {
    render(<PurpleButton {...defaultProps} />);
    const icon = screen.getByTestId('purple-button-icon');
    
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('w-6', 'h-6', 'text-white', 'mr-[10px]');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
}); 
