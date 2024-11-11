import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProteinSlider from './proteinSlider';

const buildProteinSlider = (props = {}) => {
  return <ProteinSlider {...props} />;
};

describe('ProteinSlider', () => {
  it('renders correctly', () => {
    render(buildProteinSlider());
    expect(screen.getByTestId('protein-slider'))
      .toBeInTheDocument();
  });
});
