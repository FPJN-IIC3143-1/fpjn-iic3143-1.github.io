/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/searchBar';

// Mock the image import
jest.mock('/images/search-bar-icon.png', () => 'mocked-image-path');

describe('SearchBar', () => {
  it('renders correctly', () => {
    render(<SearchBar />);
    
    const container = screen.getByTestId('search-bar-container');
    const input = screen.getByTestId('search-bar-input');
    const icon = screen.getByTestId('search-bar-icon');
    
    expect(container).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    
    expect(input).toHaveAttribute('placeholder', 'Buscar...');
    expect(icon).toHaveAttribute('alt', 'search bar icon');
    expect(icon).toHaveAttribute('src', 'mocked-image-path');
  });

  it('has correct styling', () => {
    render(<SearchBar />);
    
    const input = screen.getByTestId('search-bar-input');
    const icon = screen.getByTestId('search-bar-icon');
    
    expect(input).toHaveClass(
      'w-[350px]',
      'h-[50px]',
      'text-lg',
      'rounded-[15px]'
    );
    
    expect(icon).toHaveClass(
      'absolute',
      'left-2',
      'w-[40px]',
      'h-[40px]'
    );
  });

  it('calls onSearch when input changes', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByTestId('search-bar-input');
    fireEvent.change(input, { target: { value: 'test search' } });
    
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('test search');
  });

  it('uses default onSearch if not provided', () => {
    render(<SearchBar />);
    const input = screen.getByTestId('search-bar-input');
    
    // This should not throw an error
    expect(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    }).not.toThrow();
  });
}); 
