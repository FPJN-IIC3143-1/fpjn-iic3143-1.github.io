/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeartButton from '../components/heartButton';

describe('HeartButton', () => {
  it('renders in unfavorited state by default', () => {
    render(<HeartButton />);
    
    const button = screen.getByTestId('heart-button');
    const outlineIcon = screen.getByTestId('heart-icon-outline');
    
    expect(button).toBeInTheDocument();
    expect(outlineIcon).toBeInTheDocument();
    expect(button).toHaveClass('bg-gray-200', 'text-gray-500');
    expect(button).toHaveAttribute('aria-label', 'Add to favorites');
  });

  it('renders in favorited state when isFavorite is true', () => {
    render(<HeartButton isFavorite={true} />);
    
    const button = screen.getByTestId('heart-button');
    const filledIcon = screen.getByTestId('heart-icon-filled');
    
    expect(button).toBeInTheDocument();
    expect(filledIcon).toBeInTheDocument();
    expect(button).toHaveClass('bg-[#4F378B]', 'text-white');
    expect(button).toHaveAttribute('aria-label', 'Remove from favorites');
  });

  it('calls onToggle when clicked', () => {
    const mockOnToggle = jest.fn();
    render(<HeartButton onToggle={mockOnToggle} />);
    
    const button = screen.getByTestId('heart-button');
    fireEvent.click(button);
    
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('has correct styling in both states', () => {
    const { rerender } = render(<HeartButton isFavorite={false} />);
    
    let button = screen.getByTestId('heart-button');
    expect(button).toHaveClass(
      'flex',
      'items-center',
      'justify-center',
      'w-8',
      'h-8',
      'rounded-full',
      'transition-colors',
      'duration-300',
      'bg-gray-200',
      'text-gray-500'
    );
    
    rerender(<HeartButton isFavorite={true} />);
    button = screen.getByTestId('heart-button');
    expect(button).toHaveClass(
      'flex',
      'items-center',
      'justify-center',
      'w-8',
      'h-8',
      'rounded-full',
      'transition-colors',
      'duration-300',
      'bg-[#4F378B]',
      'text-white'
    );
  });

  it('renders SVG icons with correct attributes', () => {
    const { rerender } = render(<HeartButton isFavorite={false} />);
    
    let icon = screen.getByTestId('heart-icon-outline');
    expect(icon).toHaveAttribute('fill', 'none');
    expect(icon).toHaveAttribute('stroke', 'currentColor');
    expect(icon).toHaveClass('w-5', 'h-5');
    
    rerender(<HeartButton isFavorite={true} />);
    icon = screen.getByTestId('heart-icon-filled');
    expect(icon).toHaveAttribute('fill', 'currentColor');
    expect(icon).toHaveClass('w-5', 'h-5');
  });

  it('uses default onToggle if not provided', () => {
    render(<HeartButton />);
    const button = screen.getByTestId('heart-button');
    
    // This should not throw an error
    expect(() => {
      fireEvent.click(button);
    }).not.toThrow();
  });
}); 
