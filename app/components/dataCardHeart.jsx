import React, { useState } from "react";

export default function DataCardHeart({
  boxWidth,
  rows,
  onToggleFavorite,
  itemsPerPage = 3, 
}) {
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRows = rows.slice(startIndex, endIndex);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div
      className="container bg-[#A3BE8C] flex flex-col justify-center items-center rounded-[20px] text-[#182F40]"
      style={{ width: boxWidth }}
    >
      {currentRows.map((row, index) => (
        <div
          key={index}
          className="row flex justify-between items-center w-full px-[20px] py-[10px] border-b last:border-none"
        >
          {/* Left Row Content */}
          <div className="leftContent">
            <p className="font-bold">{row.leftText}</p>
            <p className="text-sm text-gray-600">{row.rightText}</p>
          </div>

          {/* Heart Button */}
          <button
            onClick={() => onToggleFavorite(row.recipeId)}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${
              row.isFavorite
                ? "bg-[#4F378B] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
            style={{
              minWidth: "30px",
              minHeight: "30px", 
            }}
            aria-label={
              row.isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {row.isFavorite ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(rows.length / itemsPerPage) }).map(
          (_, pageIndex) => (
            <div
              key={pageIndex}
              onClick={() => handlePageChange(pageIndex)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  handlePageChange(pageIndex); 
                }
              }}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                pageIndex === currentPage ? "bg-gray-800" : "bg-gray-300"
              }`}
              style={{
                transition: "background-color 0.3s ease",
              }}
              role="button" 
              tabIndex={0} 
              aria-label={`Go to page ${pageIndex + 1}`}
            ></div>
          )
        )}
      </div>
      <div
  className="container bg-[#A3BE8C] flex flex-col justify-center items-center rounded-[20px] text-[#182F40] pb-6"
  style={{ width: boxWidth }}
    ></div>
    </div>
  );
}