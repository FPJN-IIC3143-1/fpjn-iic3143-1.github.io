import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PantryCard from './pantryCard';

const buildPantryCard = (props = {}) => {
  return <PantryCard {...props} />;
};

describe('PantryCard', () => {
  const mockApi = {
    updatePantry: jest.fn(),
    getPantry: jest.fn(),
  };

  const mockOnPantryUpdate = jest.fn();

  const defaultProps = {
    boxWidth: '100%',
    leftRowInfo: ['1 kg', '2 L'],
    rightRowInfo: ['Rice', 'Milk'],
    api: mockApi,
    onPantryUpdate: mockOnPantryUpdate,
  };

  it('renders correctly', () => {
    render(buildPantryCard(defaultProps));
    expect(screen.getByTestId('pantry-card')).toBeInTheDocument();
  });

  it('displays leftRowInfo and rightRowInfo correctly', () => {
    render(buildPantryCard(defaultProps));
    expect(screen.getByText('1 kg')).toBeInTheDocument();
    expect(screen.getByText('2 L')).toBeInTheDocument();
    expect(screen.getByText('Rice')).toBeInTheDocument();
    expect(screen.getByText('Milk')).toBeInTheDocument();
  });

  it('enters edit mode and allows quantity changes', () => {
    render(buildPantryCard(defaultProps));
    fireEvent.click(screen.getByTestId('save-or-edit-button'));
    expect(screen.getByText('Guardar Cambios')).toBeInTheDocument();

    const input = screen.getAllByRole('textbox')[0];
    fireEvent.change(input, { target: { value: '1.5' } });
    expect(input.value).toBe('1.5');
  });

  it('saves changes and calls API', async () => {
    mockApi.updatePantry.mockResolvedValueOnce({});
    mockApi.getPantry.mockResolvedValueOnce({});

    render(buildPantryCard(defaultProps));
    fireEvent.click(screen.getByText('Editar Despensa'));

    const input = screen.getAllByRole('textbox')[0];
    fireEvent.change(input, { target: { value: '1.5' } });

    fireEvent.click(screen.getByTestId('save-or-edit-button'));

    expect(mockApi.updatePantry).toHaveBeenCalledWith({
      ingredients: [
        { name: 'rice', quantity: { amount: 1.5, unit: 'kg' } },
        { name: 'milk', quantity: { amount: 2, unit: 'L' } },
      ],
    });

    await screen.findByText('Editar Despensa');
    expect(mockOnPantryUpdate).toHaveBeenCalled();
  });

  it('handles pagination correctly', () => {
    const propsWithMoreItems = {
      ...defaultProps,
      leftRowInfo: Array.from({ length: 10 }, (_, i) => `${i + 1} kg`),
      rightRowInfo: Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`),
    };

    render(buildPantryCard(propsWithMoreItems));

    expect(screen.getByText('1 kg')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('next-button'));

    expect(screen.getByText('9 kg')).toBeInTheDocument();
    expect(screen.getByText('Item 9')).toBeInTheDocument();
  });
});
