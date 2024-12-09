export default function DataCard({
  boxWidth,
  page = 'homepage',
  leftRowInfo = [],
  rightRowInfo = []
}) {
  const getFormattedValue = (value, index) => {
    if (rightRowInfo[3] === "Calorías" && index === 3) {
      return `${value} kcal`;
    }
    return (page === 'homepage' || page === 'history') ? `${value} g` : value;
  };

  return (
    <div data-testid="data-card-wrapper">
      <div 
        data-testid="data-card-container"
        className="container bg-[#A3BE8C] flex justify-center items-center h-[170px] rounded-[20px] text-[#182F40]"
        style={{ width: boxWidth }}
      >
        <div 
          data-testid="data-card-left-column"
          className="leftRow flex flex-col items-center font-bold pr-[40px]"
        >
          {leftRowInfo.map((leftInfo, index) => (
            <div 
              key={index}
              data-testid={`left-item-${index}`}
              className="leftItem mt-[5px] mb-[5px]"
            >
              {getFormattedValue(leftInfo, index)}
            </div>
          ))}
        </div>

        <div 
          data-testid="data-card-right-column"
          className="rightRow flex flex-col items-start"
        >
          {rightRowInfo.map((rightInfo, index) => (
            <div 
              key={index}
              data-testid={`right-item-${index}`}
              className="rightRow mt-[5px] mb-[5px]"
            >
              {rightInfo}
            </div>
          ))}
        </div>
      </div>
      <div data-testid="data-card-spacer" className="h-[20px]" />
    </div>
  );
}
