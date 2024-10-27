


export default function LandingButton({ bgColor, textColor, boxWidth, text, onClick}) {
  console.log('onClick prop:', onClick);
  return <>
  
  <button 
    className="landing-button-box flex justify-center items-center h-[72px] rounded-[60px] 
    text-4xl shadow-landingButton transition-colors duration-300"
    style={{ backgroundColor: bgColor, color: textColor, width: boxWidth }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = "#D0BCFE", e.target.style.color = "#381E72")}
    onMouseLeave={(e) => (e.target.style.backgroundColor = bgColor, e.target.style.color = textColor)}
    onClick={onClick}
  > 
    {text}   
  </button>
  
  </>
}