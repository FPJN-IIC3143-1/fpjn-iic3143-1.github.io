/** @jest-environment jsdom */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataCard from '../components/dataCard';

describe('DataCard', () => {
  const defaultProps = {
    boxWidth: '300px',
    leftRowInfo: ['100', '200', '300', '400'],
    rightRowInfo: ['Protein', 'Carbs', 'Fat', 'Calorías']
  };

  it('renders correctly with all elements', () => {
    render(<DataCard {...defaultProps} />);
    
    expect(screen.getByTestId('data-card-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('data-card-container')).toBeInTheDocument();
    expect(screen.getByTestId('data-card-left-column')).toBeInTheDocument();
    expect(screen.getByTestId('data-card-right-column')).toBeInTheDocument();
    expect(screen.getByTestId('data-card-spacer')).toBeInTheDocument();
  });

  it('renders with correct width', () => {
    render(<DataCard {...defaultProps} />);
    
    const container = screen.getByTestId('data-card-container');
    expect(container).toHaveStyle({ width: '300px' });
  });

  it('renders all items from leftRowInfo and rightRowInfo', () => {
    render(<DataCard {...defaultProps} />);
    
    defaultProps.leftRowInfo.forEach((_, index) => {
      expect(screen.getByTestId(`left-item-${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`right-item-${index}`)).toBeInTheDocument();
    });
  });

  it('formats values correctly for homepage', () => {
    render(<DataCard {...defaultProps} page="homepage" />);
    
    expect(screen.getByTestId('left-item-0')).toHaveTextContent('100 g');
    expect(screen.getByTestId('left-item-1')).toHaveTextContent('200 g');
    expect(screen.getByTestId('left-item-2')).toHaveTextContent('300 g');
    expect(screen.getByTestId('left-item-3')).toHaveTextContent('400 kcal');
  });

  it('formats values correctly for history page', () => {
    render(<DataCard {...defaultProps} page="history" />);
    
    expect(screen.getByTestId('left-item-0')).toHaveTextContent('100 g');
    expect(screen.getByTestId('left-item-1')).toHaveTextContent('200 g');
    expect(screen.getByTestId('left-item-2')).toHaveTextContent('300 g');
    expect(screen.getByTestId('left-item-3')).toHaveTextContent('400 kcal');
  });

  it('formats values correctly for other pages', () => {
    render(<DataCard {...defaultProps} page="other" />);
    
    expect(screen.getByTestId('left-item-0')).toHaveTextContent('100');
    expect(screen.getByTestId('left-item-1')).toHaveTextContent('200');
    expect(screen.getByTestId('left-item-2')).toHaveTextContent('300');
    expect(screen.getByTestId('left-item-3')).toHaveTextContent('400 kcal');
  });

  it('renders with empty arrays when no data provided', () => {
    render(<DataCard boxWidth="300px" />);
    
    expect(screen.getByTestId('data-card-left-column')).toBeEmptyDOMElement();
    expect(screen.getByTestId('data-card-right-column')).toBeEmptyDOMElement();
  });

  it('has correct styling', () => {
    render(<DataCard {...defaultProps} />);
    
    const container = screen.getByTestId('data-card-container');
    expect(container).toHaveClass(
      'container',
      'bg-[#A3BE8C]',
      'flex',
      'justify-center',
      'items-center',
      'h-[170px]',
      'rounded-[20px]',
      'text-[#182F40]'
    );

    const leftColumn = screen.getByTestId('data-card-left-column');
    expect(leftColumn).toHaveClass(
      'leftRow',
      'flex',
      'flex-col',
      'items-center',
      'font-bold',
      'pr-[40px]'
    );

    const rightColumn = screen.getByTestId('data-card-right-column');
    expect(rightColumn).toHaveClass(
      'rightRow',
      'flex',
      'flex-col',
      'items-start'
    );

    const spacer = screen.getByTestId('data-card-spacer');
    expect(spacer).toHaveClass('h-[20px]');
  });
}); 
