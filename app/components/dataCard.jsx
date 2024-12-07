export default function DataCard({boxWidth, page='homepage', leftRowInfo, rightRowInfo}) {

    return (
      <>
      <div className="container bg-[#A3BE8C] flex justify-center items-center h-[170px] rounded-[20px] text-[#182F40]"
            style={{ width: boxWidth }}>
        
        <div className="leftRow flex flex-col items-center font-bold pr-[40px]">
          {leftRowInfo.map((leftInfo, index) => (
            <div key={index} className="leftItem mt-[5px] mb-[5px]">
              {console.log('aaaa = ', rightRowInfo[3])}
              {rightRowInfo[3] === "Calorías" && index === 3 ? 
                `${leftInfo} kcal` : 
                (page === 'homepage' || page === 'history' ? 
                  `${leftInfo} g` : 
                  leftInfo
                )
              }
            </div>
          ))}
        </div>

        <div className="rightRow flex flex-col items-start">
          {rightRowInfo.map((rightInfo, index) => (
            <div key={index} className="rightRow mt-[5px] mb-[5px]">
              {rightInfo}
            </div>
          ))}
        </div>
      </div>
      <div className="h-[20px]"></div>
      
      </>
    )
}
