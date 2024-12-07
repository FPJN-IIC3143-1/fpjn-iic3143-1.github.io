import React from "react";

export default function RecipeAlert({ title, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg px-8 py-6 w-[400px]">
        <div className="flex justify-between items-center mb-6">
          <i className="text-black text-xl not-italic">ⓘ</i>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex justify-center items-center mb-6">
          <span className="text-lg font-semibold text-[#182F40] leading-tight">
            {title}
          </span>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="w-[160px] h-[50px] bg-black text-white rounded-[12px] text-center hover:bg-gray-800"
          >
            Descontar
          </button>
          <button
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