import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecipePopUp from './recipePopUp';

const buildRecipePopUp = (props = {}) => {
  return <RecipePopUp {...props} />;
};

describe('RecipePopUp', () => {
  it('renders correctly', () => {
    render(buildRecipePopUp());
    expect(screen.queryByTestId('recipe-pop-up')).not.toBeInTheDocument();
  });

  it('opens the pop-up when the recipe button is clicked', () => {
    render(buildRecipePopUp());
    fireEvent.click(screen.getByTestId('recipe-button'));
    expect(screen.getByTestId('recipe-pop-up')).toBeVisible();
  });

  it('closes the pop-up when the close button is clicked', () => {
    render(buildRecipePopUp());
    fireEvent.click(screen.getByTestId('recipe-button'));
    fireEvent.click(screen.getByTestId('close-button'));
    expect(screen.queryByTestId('recipe-pop-up')).not.toBeInTheDocument();
  });

  it('renders the correct title', () => {
    render(buildRecipePopUp({ title: 'Test Title' }));
    fireEvent.click(screen.getByTestId('recipe-button'));
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the correct num of recipe', () => {
    render(buildRecipePopUp({ num: 1 }));
    fireEvent.click(screen.getByTestId('recipe-button'));
    expect(screen.getByText('Receta 1:')).toBeInTheDocument();
  });

  it('renders the correct ingredients', () => {
    const ingredients = ['Ingredient 1', 'Ingredient 2'];
    render(buildRecipePopUp({ ingredients }));
    fireEvent.click(screen.getByTestId('recipe-button'));
    ingredients.forEach((ingredient) => {
      expect(screen.getByText(`• ${ingredient}`)).toBeInTheDocument();
    });
  });

  it('renders the correct steps', () => {
    const steps = ['Step 1', 'Step 2'];
    render(buildRecipePopUp({ steps }));
    fireEvent.click(screen.getByTestId('recipe-button'));
    steps.forEach((step, index) => {
      expect(screen.getByText(`${index + 1}. ${step}`)).toBeInTheDocument();
    });
  });
});
