import { useState } from "react";

export default function ProteinSlider({ 
  initialValue = 0, 
  min = 0, 
  max = 200, 
  onChange = () => {} 
}) {
  const [sliderValue, setSliderValue] = useState(initialValue);

  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setSliderValue(newValue);
    onChange(newValue);
  }

  return (
    <div data-testid="protein-slider-container" className="flex flex-col">
      <div className="flex justify-between mb-[8px]">
        <p data-testid="protein-slider-label">Proteina a ingerir</p>
        <p data-testid="protein-slider-value">
          {sliderValue > 0 ? `${sliderValue} g` : '0 - 200 g'}
        </p>
      </div>
      <input 
        data-testid="protein-slider-input"
        className="appearance-none h-[5px] w-[330px] bg-[#ffffff] cursor-pointer rounded-[20px]" 
        type="range" 
        min={min} 
        max={max} 
        value={sliderValue}
        onChange={handleSliderChange}
      />
    </div>
  );
}
