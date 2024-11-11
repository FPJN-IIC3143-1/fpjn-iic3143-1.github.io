import React from 'react';
import { useState } from 'react';

export default function RecipePopUp({ num = 0, title = '', ingredients = [], steps = [] }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenPopUp = () => {
    setIsVisible(true);
  };

  const handleClosePopUp = () => {
    setIsVisible(false);
  };

  return (
    <>
      <button className="RecipeButton bg-[#4F378B] hover:bg-[#D0BCFE] w-[220px] h-[53px] rounded-[16px] text-[#EADDFF] hover:text-[#381E72]"
        onClick={handleOpenPopUp}
        data-testid="recipe-button">
        Ver Receta Completa
      </button>

      {isVisible && (
        <div id="RecipePopUpContainer" className="RecipePopUpContainer bg-gray-900 bg-opacity-50 w-full h-full rounded-[20px] m-[2px]
          flex absolute top-0 right-0 left-0 bottom-0 transition-all duration-100 ease-in"
          data-testid="recipe-pop-up">
          <div className="RecipePopUp flex relative justify-center items-center bg-[#4F378B] w-[600px] h-[90%] rounded-[20px] m-auto p-10">
            <button className="CloseButton absolute top-0 right-0 m-5 
              bg-[#381E72] w-[30px] h-[30px] rounded-[50%] text-[#EADDFF] hover:bg-[#EADDFF] hover:text-[#4F378B] font-bold"
              onClick={handleClosePopUp} data-testid="close-button"> X </button>
            <div className="flex flex-col justify-start w-full h-full mt-10 overflow-y-auto RecipePopUpContent items-left">
              <div className="flex flex-col justify-center w-full RecipePopUpHeader items-left">
                <div className="font-serif text-2xl font-bold text-gray-100">Receta {num}:</div>
                <div className="text-4xl text-gray-300 RecipeTitle text-gray-150 ">{title}</div>
              </div>
              <div className="mt-5 font-serif text-xl text-gray-100">Ingredientes:</div>
              <div className="text-sm text-gray-300 RecipeIngredients text-gray-150">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="IngredientItem">• {ingredient}</div>
                ))}
              </div>
              <div className="mt-5 font-serif text-xl text-gray-100">Pasos:</div>
              <div className="text-sm text-gray-300 RecipeSteps text-gray-150">
                {steps.map((step, index) => (
                  <div key={index} className="StepItem">{index + 1}. {step}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
