import { useState } from 'react';
import React from 'react';

export default function PantryCard({boxWidth, leftRowInfo, rightRowInfo}) {
  const [currentPage, setCurrentPage] = useState(0);
  
  const handleEditPantry = () => {
    console.log("Edit Pantry Button: Pressed");
  }

  const ITEMS_PER_PAGE = 10;
  const totalItems = leftRowInfo.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const getPaginationArray = (currentPage, totalPages) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }).map((_, i) => i);
    }
  
    if (currentPage < 3) {
      return [0, 1, 2, 3, '...', totalPages - 1];
    }
  
    if (currentPage > totalPages - 4) {
      return [0, '...', totalPages - 3, totalPages - 2, totalPages - 1];
    }
  
    return [
      0,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages - 1
    ];
  };

  return (
    <div className="generalContainer flex flex-col"
      style={{ width: boxWidth }}>
      <div className="container bg-[#A3BE8C] flex flex-col rounded-[20px] h-[450px] text-[#182F40]">          
        <div className="items-container overflow-hidden flex-1 relative">
          <div className="flex flex-row h-full transition-transform duration-300 ease-in-out"
               style={{ transform: `translateX(-${currentPage * 100}%)` }}>
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} 
                className="flex-none w-full flex justify-center items-start pt-6 px-4" // Changed justify-start to justify-center
                style={{ width: boxWidth }}>
                <div className="flex flex-row justify-center w-full max-w-[80%]"> {/* Added container for centering */}
                  <div className="leftRow flex flex-col items-end font-bold pr-[40px]"> {/* Changed items-center to items-end */}
                    {leftRowInfo.slice(
                      pageIndex * ITEMS_PER_PAGE,
                      (pageIndex + 1) * ITEMS_PER_PAGE
                    ).map((leftInfo, index) => (
                      <div key={index} className="leftItem mt-[5px] mb-[5px]">
                        {leftInfo}
                      </div>
                    ))}
                  </div>

                  <div className="rightRow flex flex-col items-start">
                    {rightRowInfo.slice(
                      pageIndex * ITEMS_PER_PAGE,
                      (pageIndex + 1) * ITEMS_PER_PAGE
                    ).map((rightInfo, index) => (
                      <div key={index} className="rightItem mt-[5px] mb-[5px]">
                        {rightInfo}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center px-4 py-2">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`p-2 rounded-full ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#182F40] hover:bg-opacity-10'}`}
          >
            ←
          </button>

          {/* Pagination dots */}
          <div className="flex justify-center space-x-2">
            {getPaginationArray(currentPage, totalPages).map((pageNum, index) => (
              <React.Fragment key={index}>
                {pageNum === '...' ? (
                  <span className="px-1 text-[#182F40] opacity-50">...</span>
                ) : (
                  <button
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      currentPage === pageNum 
                        ? 'bg-[#182F40] scale-125' 
                        : 'bg-[#182F40] opacity-50'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className={`p-2 rounded-full ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#182F40] hover:bg-opacity-10'}`}
          >
            →
          </button>
        </div>
      </div>

      <div className="botContainer flex flex-col justify-center items-center pb-6 pt-5">
        <button className="EditPantryButton bg-[#4F378B] hover:bg-[#7461AC] w-[200px] h-[50px] rounded-[15px] text-[#FFFFFF] mt-[10px] 
          flex justify-center items-center max-w-fit text-base px-6 transition-colors duration-300"
        onClick={handleEditPantry}>
          <svg className="w-6 h-6 text-white mr-[10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
          </svg>
          Editar Despensa
        </button>
      </div>
    </div>
  )
}