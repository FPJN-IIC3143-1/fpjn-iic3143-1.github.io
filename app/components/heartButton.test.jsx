import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeartButton from './heartButton';

const buildHeartButton = (props = {}) => {
  return <HeartButton {...props} />;
};

describe('HeartButton', () => {
  it('renders correctly', () => {
    render(buildHeartButton());
    expect(screen.getByTestId('heart-button')).toBeInTheDocument();
  });

  it('changes svg fill when clicked', () => {
    render(buildHeartButton());
    const button = screen.getByTestId('heart-button');
    fireEvent.click(button);
    expect(button.querySelector('svg').getAttribute('fill')).toBe('currentColor');
  });
});
