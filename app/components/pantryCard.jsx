import { useState } from 'react';
import React from 'react';

export default function PantryCard({boxWidth, boxHeight=450, leftRowInfo, rightRowInfo, api, onPantryUpdate, ITEMS_PER_PAGE = 7}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuantities, setEditedQuantities] = useState([]);
  
  const handleEditPantry = () => {
    // Initialize editedQuantities with current values
    const quantities = leftRowInfo.map(info => {
      const [amount, unit] = info.split(' ');
      return { amount, unit };
    });
    setEditedQuantities(quantities);
    setIsEditing(true);
  };

  const handleSavePantry = async () => {
    try {
      // Format the changes for API
      const ingredientsToUpdate = editedQuantities.map((quantity, index) => ({
        name: rightRowInfo[index].toLowerCase(),
        quantity: {
          amount: parseFloat(quantity.amount),
          unit: quantity.unit
        }
      })).filter(item => !isNaN(item.quantity.amount)); // Ensure valid numbers only
  
      // Update pantry with new quantities in a single call
      await api.updatePantry({ 
        ingredients: ingredientsToUpdate 
      });
  
      // Fetch and update pantry data
      const updatedPantryData = await api.getPantry();
      onPantryUpdate(updatedPantryData);
      setIsEditing(false);
  
    } catch (error) {
      console.error('Error updating pantry:', error);
    }
  };

  const handleQuantityChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*\.?\d*$/.test(value)) return;

    setEditedQuantities(prev => {
      const newQuantities = [...prev];
      newQuantities[index] = {
        ...newQuantities[index],
        amount: value
      };
      return newQuantities;
    });
  };

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
      <div className={`container bg-[#A3BE8C] flex flex-col rounded-[20px] h-[${boxHeight}px] text-[#182F40]`}>          
        <div className="flex justify-center w-full pb-0 mb-0">
          <h3 className="text-3xl font-bold my-6">Despensa</h3>
        </div>
        <div className="items-container overflow-hidden flex-1 relative">
          <div className="flex flex-row h-full transition-transform duration-300 ease-in-out"
               style={{ transform: `translateX(-${currentPage * 100}%)` }}>
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} 
                className="flex-none w-full flex justify-center items-start pt-2 px-4" // Changed justify-start to justify-center
                style={{ width: boxWidth }}>
                <div className="flex flex-row justify-center w-full max-w-[80%]"> {/* Added container for centering */}
                <div className="leftRow flex flex-col items-end font-bold pr-[40px]">
                {leftRowInfo.slice(
                  pageIndex * ITEMS_PER_PAGE,
                  (pageIndex + 1) * ITEMS_PER_PAGE
                ).map((leftInfo, index) => {
                  const actualIndex = pageIndex * ITEMS_PER_PAGE + index;
                  if (isEditing) {
                    // eslint-disable-next-line no-unused-vars
                    const [_, unit] = leftInfo.split(' ');
                    return (
                      <div key={index} className="leftItem h-[28px] mt-[5px] mb-[5px] flex items-center justify-end w-[120px]">
                        <input
                          type="text"
                          value={editedQuantities[actualIndex]?.amount || ''}
                          onChange={(e) => handleQuantityChange(actualIndex, e.target.value)}
                          className="h-[28px] w-[60px] text-right px-1 mr-2 rounded border border-gray-300 leading-none"
                        />
                        <span className="w-[40px] h-[28px] flex items-center">{unit}</span>
                      </div>
                    );
                  }
                  return (
                    <div key={index} className="leftItem h-[28px] mt-[5px] mb-[5px] w-[120px] text-right flex items-center justify-end">
                      {leftInfo}
                    </div>
                  );
                })}
              </div>

              <div className="rightRow flex flex-col items-start">
                {rightRowInfo.slice(
                  pageIndex * ITEMS_PER_PAGE,
                  (pageIndex + 1) * ITEMS_PER_PAGE
                ).map((rightInfo, index) => (
                  <div key={index} className="rightItem h-[28px] mt-[5px] mb-[5px] w-[150px] flex items-center">
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
          className={`p-2 rounded-full ${
            currentPage === 0 
              ? 'text-[#182F40] opacity-70 cursor-not-allowed' 
              : 'text-[#182F40] hover:bg-[#182F40] hover:bg-opacity-10'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

          {/* Pagination dots */}
          <div className="flex justify-center space-x-2">
            {getPaginationArray(currentPage, totalPages).map((pageNum, index) => (
              <React.Fragment key={index}>
                {pageNum === '...' ? (
                  <span className="px-1 text-[#182F40] font-bold opacity-50">...</span>
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
            className={`p-2 rounded-full ${
              currentPage === totalPages - 1 
                ? 'text-[#182F40] opacity-70 cursor-not-allowed' 
                : 'text-[#182F40] hover:bg-[#182F40] hover:bg-opacity-10'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="botContainer flex flex-col justify-center items-center pb-6 pt-5">
        <button 
          className="EditPantryButton flex justify-center items-center bg-[#4F378B] hover:bg-[#7461AC] w-[200px] h-[50px] rounded-[16px] text-[#FFFFFF] hover:text-[#FFFFFF] mt-[10px]"
          onClick={isEditing ? handleSavePantry : handleEditPantry}
        >
        <svg className="w-6 h-6 text-white mr-[10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
        </svg>
          {isEditing ? 'Guardar Cambios' : 'Editar Despensa'}
        </button>
      </div>
    </div>
  )
}