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

  it('changes style on mouse enter and leave', () => {
    const props = {
        bgColor: '#4F378B',
        textColor: '#FFFFFF',
        text: 'Click Me',
    };
    render(buildPurpleButton(props));

    const button = screen.getByTestId('purple-button');
    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle({ backgroundColor: '#7461AC', color: '#FFFFFF' });

    fireEvent.mouseLeave(button);
    expect(button).toHaveStyle({ backgroundColor: '#4F378B', color: '#FFFFFF' });
  });
});
