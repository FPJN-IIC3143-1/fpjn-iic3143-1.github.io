import React, { useState } from 'react';
import HeartButton from './heartButton'; // Ensure HeartButton is imported

export default function DataCardHeart({ boxWidth, rows, onToggleFavorite, itemsPerPage = 3 }) {
    const [currentPage, setCurrentPage] = useState(0);
  
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRows = rows.slice(startIndex, endIndex);
  
    const handlePageChange = (pageIndex) => {
      setCurrentPage(pageIndex);
    };
  
    return (
      <div
        className="p-6 rounded-lg shadow-lg"
        style={{ width: `${boxWidth}px`, backgroundColor: '#A3BE8C' }}
      >
        {currentRows.map((row, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b last:border-none pb-4 mb-4"
          >
            <div>
              <span className="font-bold text-lg">{row.leftText}</span>
              <br />
              <span className="text-sm text-gray-600">{row.rightText}</span>
            </div>
            <HeartButton
              isFavorite={row.isFavorite}
              onToggle={() => onToggleFavorite(startIndex + index)}
            />
          </div>
        ))}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: Math.ceil(rows.length / itemsPerPage) }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              onClick={() => handlePageChange(pageIndex)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                pageIndex === currentPage ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
    );
  }
  