

export default function ProteinSlider() {

  return (<>
    
  <div className="flex flex-col">
    <div className="flex justify-between mb-[8px]">
      <p>Proteina a ingerir</p>
      <p>0 - 200 g</p>
    </div>
    <input className="appearance-none h-[5px] w-[330px] bg-[#ffffff] cursor-pointer rounded-[20px]" type="range" min={1} max={200} defaultValue={0}></input>
  </div>

  </>);
}