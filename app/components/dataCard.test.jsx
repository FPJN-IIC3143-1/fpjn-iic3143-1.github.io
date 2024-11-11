import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataCard from './dataCard';

const buildDataCard = (props = {}) => {
  return <DataCard {...props} />;
};

describe('DataCard', () => {
  it('renders correctly', () => {
    const props = {
      boxWidth: '100px',
      leftRowInfo: ['Left 1', 'Left 2'],
      rightRowInfo: ['Right 1', 'Right 2'],
    };

    render(buildDataCard(props));
    expect(screen.getByTestId('data-card')).toBeInTheDocument();
  });

  it('displays leftRowInfo correctly', () => {
    const props = {
      leftRowInfo: ['Left 1', 'Left 2'],
    };
    render(buildDataCard(props));
    expect(screen.getByText('Left 1')).toBeInTheDocument();
    expect(screen.getByText('Left 2')).toBeInTheDocument();
  });

  it('displays rightRowInfo correctly', () => {
    const props = {
      rightRowInfo: ['Right 1', 'Right 2'],
    };
    render(buildDataCard(props));
    expect(screen.getByText('Right 1')).toBeInTheDocument();
    expect(screen.getByText('Right 2')).toBeInTheDocument();
  });

  it('has correct styles', () => {
    const props = {
      boxWidth: '100px',
    };
    render(buildDataCard(props));
    expect(screen.getByTestId('data-card')).toHaveStyle({ width: '100px' });
  });
});
