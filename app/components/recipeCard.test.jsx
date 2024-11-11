import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecipeCard from './recipeCard';

const buildRecipeCard = (props = {}) => {
  return <RecipeCard {...props} />;
};

describe('RecipeCard', () => {
  it('renders correctly', () => {
    render(buildRecipeCard());
    expect(screen.getByTestId('recipe-card'))
      .toBeInTheDocument();
  });

  it('calls navigate when the button is clicked', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(buildRecipeCard());
    fireEvent.click(screen.getByTestId('choose-recipe-button'));
    expect(consoleLogSpy).toHaveBeenCalledWith('choose recipe');
  });

  it('renders the correct leftRowInfo', () => {
    render(buildRecipeCard({ leftRowInfo: ['left1', 'left2'] }));
    expect(screen.getByText('left1')).toBeInTheDocument();
    expect(screen.getByText('left2')).toBeInTheDocument();
  });

  it('renders the correct rightRowInfo', () => {
    render(buildRecipeCard({ rightRowInfo: ['right1', 'right2'] }));
    expect(screen.getByText('right1')).toBeInTheDocument();
    expect(screen.getByText('right2')).toBeInTheDocument();
  });
});
