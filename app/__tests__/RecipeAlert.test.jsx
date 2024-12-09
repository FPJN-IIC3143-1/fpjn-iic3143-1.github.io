/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeAlert from '../components/recipeAlert';

describe('RecipeAlert', () => {
  const defaultProps = {
    title: 'Test Alert Title',
    onConfirm: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all elements', () => {
    render(<RecipeAlert {...defaultProps} />);

    expect(screen.getByTestId('recipe-alert-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-alert-container')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-alert-info-icon')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-alert-close-icon')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-alert-title')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-alert-confirm')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-alert-cancel')).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    render(<RecipeAlert {...defaultProps} />);
    
    const titleElement = screen.getByTestId('recipe-alert-title');
    expect(titleElement).toHaveTextContent('Test Alert Title');
  });

  it('calls onConfirm when confirm button is clicked', () => {
    render(<RecipeAlert {...defaultProps} />);
    
    const confirmButton = screen.getByTestId('recipe-alert-confirm');
    fireEvent.click(confirmButton);
    
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<RecipeAlert {...defaultProps} />);
    
    const cancelButton = screen.getByTestId('recipe-alert-cancel');
    fireEvent.click(cancelButton);
    
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    expect(defaultProps.onConfirm).not.toHaveBeenCalled();
  });

  it('calls onClose when close icon is clicked', () => {
    render(<RecipeAlert {...defaultProps} />);
    
    const closeIcon = screen.getByTestId('recipe-alert-close-icon');
    fireEvent.click(closeIcon);
    
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    expect(defaultProps.onConfirm).not.toHaveBeenCalled();
  });

  it('has correct button text', () => {
    render(<RecipeAlert {...defaultProps} />);
    
    expect(screen.getByTestId('recipe-alert-confirm')).toHaveTextContent('Descontar');
    expect(screen.getByTestId('recipe-alert-cancel')).toHaveTextContent('Volver');
  });

  it('has correct styling', () => {
    render(<RecipeAlert {...defaultProps} />);
    
    expect(screen.getByTestId('recipe-alert-overlay')).toHaveClass(
      'fixed',
      'inset-0',
      'flex',
      'items-center',
      'justify-center',
      'bg-black',
      'bg-opacity-30',
      'z-50'
    );

    expect(screen.getByTestId('recipe-alert-container')).toHaveClass(
      'bg-white',
      'rounded-lg',
      'shadow-lg',
      'w-[400px]'
    );

    expect(screen.getByTestId('recipe-alert-confirm')).toHaveClass(
      'w-[160px]',
      'h-[50px]',
      'bg-black',
      'text-white',
      'rounded-[12px]'
    );

    expect(screen.getByTestId('recipe-alert-cancel')).toHaveClass(
      'w-[160px]',
      'h-[50px]',
      'bg-gray-300',
      'text-gray-700',
      'rounded-[12px]'
    );
  });
}); 
