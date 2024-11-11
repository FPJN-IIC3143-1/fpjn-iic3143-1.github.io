import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './searchBar';
import searchBarIcon from '/images/search-bar-icon.png'

describe('SearchBar', () => {
  it('renders correctly', () => {
    render(<SearchBar />);
    expect(screen.getByTestId('search-bar'))
      .toBeInTheDocument();
  });

  it('renders the input correctly', () => {
    render(<SearchBar />);
    expect(screen.getByTestId('search-bar-input'))
      .toBeInTheDocument();
  });

  it('renders the icon correctly', () => {
    render(<SearchBar />);
    expect(screen.getByTestId('search-bar-icon'))
      .toBeInTheDocument();
  });
});
