import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingButton from './landingButton';

const buildLandingButton = (props = {}) => {
  return <LandingButton {...props} />;
};

describe('LandingButton', () => {
  it('renders correctly', () => {
    const props = {
        bgColor: 'red',
        textColor: 'blue',
        boxWidth: '100px',
        text: 'Click Me',
    };
    render(buildLandingButton(props));

    const button = screen.getByTestId('landing-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ backgroundColor: 'red', color: 'blue', width: '100px' });
    expect(button).toHaveTextContent('Click Me');
  });
});
