/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProteinSlider from '../components/proteinSlider';

describe('ProteinSlider', () => {
  it('renders with default props', () => {
    render(<ProteinSlider />);
    
    const container = screen.getByTestId('protein-slider-container');
    const label = screen.getByTestId('protein-slider-label');
    const value = screen.getByTestId('protein-slider-value');
    const input = screen.getByTestId('protein-slider-input');
    
    expect(container).toBeInTheDocument();
    expect(label).toHaveTextContent('Proteina a ingerir');
    expect(value).toHaveTextContent('0 - 200 g');
    expect(input).toHaveAttribute('type', 'range');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '200');
    expect(input).toHaveValue('0');
  });

  it('renders with custom initial value', () => {
    render(<ProteinSlider initialValue={50} />);
    
    const value = screen.getByTestId('protein-slider-value');
    const input = screen.getByTestId('protein-slider-input');
    
    expect(value).toHaveTextContent('50 g');
    expect(input).toHaveValue('50');
  });

  it('renders with custom min and max values', () => {
    render(<ProteinSlider min={10} max={300} />);
    
    const input = screen.getByTestId('protein-slider-input');
    
    expect(input).toHaveAttribute('min', '10');
    expect(input).toHaveAttribute('max', '300');
  });

  it('updates value display when slider changes', () => {
    render(<ProteinSlider />);
    
    const input = screen.getByTestId('protein-slider-input');
    const value = screen.getByTestId('protein-slider-value');
    
    fireEvent.change(input, { target: { value: '75' } });
    
    expect(value).toHaveTextContent('75 g');
    expect(input).toHaveValue('75');
  });

  it('calls onChange callback when value changes', () => {
    const mockOnChange = jest.fn();
    render(<ProteinSlider onChange={mockOnChange} />);
    
    const input = screen.getByTestId('protein-slider-input');
    
    fireEvent.change(input, { target: { value: '100' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('100');
  });

  it('has correct styling', () => {
    render(<ProteinSlider />);
    
    const container = screen.getByTestId('protein-slider-container');
    const input = screen.getByTestId('protein-slider-input');
    
    expect(container).toHaveClass('flex', 'flex-col');
    expect(input).toHaveClass(
      'appearance-none',
      'h-[5px]',
      'w-[330px]',
      'bg-[#ffffff]',
      'cursor-pointer',
      'rounded-[20px]'
    );
  });

  it('shows range text when value is 0', () => {
    render(<ProteinSlider />);
    const value = screen.getByTestId('protein-slider-value');
    expect(value).toHaveTextContent('0 - 200 g');
  });

  it('shows specific value when greater than 0', () => {
    render(<ProteinSlider initialValue={25} />);
    const value = screen.getByTestId('protein-slider-value');
    expect(value).toHaveTextContent('25 g');
  });
}); 
