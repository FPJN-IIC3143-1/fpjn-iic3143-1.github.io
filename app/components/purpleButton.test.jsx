import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PurpleButton from './purpleButton';

const buildPurpleButton = (props = {}) => {
  return <PurpleButton {...props} />;
};

describe('PurpleButton', () => {
  it('renders correctly', () => {
    render(buildPurpleButton());
    expect(screen.getByTestId('purple-button'))
      .toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();

    render(buildPurpleButton({ onClick }));
    fireEvent.click(screen.getByTestId('purple-button'));
    expect(onClick).toHaveBeenCalled();
  });
});
