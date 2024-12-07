import { useState } from "react";


export default function ProteinSlider() {

  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  }

  return (<>
    
  <div className="flex flex-col">
    <div className="flex justify-between mb-[8px]">
      <p>Proteina a ingerir</p>
      {sliderValue > 0 ? <p>{sliderValue} g</p> : <p>0 - 200 g</p>}
    </div>
    <input 
      className="appearance-none h-[5px] w-[330px] bg-[#ffffff] cursor-pointer rounded-[20px]" 
      type="range" 
      min={0} 
      max={200} 
      defaultValue={0}
      onChange={handleSliderChange}
      />
  </div>

  </>);
}