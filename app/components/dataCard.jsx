export default function DataCard({boxWidth, leftRowInfo, rightRowInfo}) {

    return (
      <div className="container bg-[#A3BE8C] flex justify-center items-center h-[170px] rounded-[20px] text-[#182F40]"
            style={{ width: boxWidth }}>
        
        <div className="leftRow flex flex-col items-center font-bold pr-[40px]">
          {leftRowInfo.map((leftInfo, index) => (
            <div key={index} className="leftItem mt-[5px] mb-[5px]">
              {leftInfo}
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
      
    </div>
    )


}
