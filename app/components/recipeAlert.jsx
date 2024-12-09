import React from "react";

export default function RecipeAlert({ title, onConfirm, onClose }) {
  return (
    <div data-testid="recipe-alert-overlay" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div data-testid="recipe-alert-container" className="bg-white rounded-lg shadow-lg px-8 py-6 w-[400px]">
        <div className="flex justify-between items-center mb-6">
          <i data-testid="recipe-alert-info-icon" className="text-black text-xl not-italic">ⓘ</i>
          <button
            data-testid="recipe-alert-close-icon"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex justify-center items-center mb-6">
          <span data-testid="recipe-alert-title" className="text-lg font-semibold text-[#182F40] leading-tight">
            {title}
          </span>
        </div>

        <div className="flex justify-between">
          <button
            data-testid="recipe-alert-confirm"
            onClick={onConfirm}
            className="w-[160px] h-[50px] bg-black text-white rounded-[12px] text-center hover:bg-gray-800"
          >
            Descontar
          </button>
          <button
            data-testid="recipe-alert-cancel"
            onClick={onClose}
            className="w-[160px] h-[50px] bg-gray-300 text-gray-700 rounded-[12px] text-center hover:bg-gray-400"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
