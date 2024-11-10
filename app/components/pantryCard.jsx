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
        <button className="EditPantryButton bg-[#4F378B] hover:bg-[#D0BCFE] w-[200px] h-[50px] rounded-[16px] text-[#EADDFF] hover:text-[#381E72] mt-[10px]"
          onClick={handleEditPantry}>
          Editar Despensa
        </button>
      </div>
    </div>
  )
}