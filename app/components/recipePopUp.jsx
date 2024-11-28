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
      <button className="RecipeButton bg-[#4F378B] hover:bg-[#7461AC] w-[220px] h-[53px] rounded-[16px] text-[#FFFFFF] hover:text-[#FFFFFF]"
        onClick={handleOpenPopUp}>
        Ver Receta Completa
      </button>

      {isVisible && (
        <div id="RecipePopUpContainer" className="RecipePopUpContainer bg-gray-900 bg-opacity-50 w-full h-full rounded-[20px] m-[2px]
          flex absolute top-0 right-0 left-0 bottom-0 transition-all duration-100 ease-in">
          <div className="RecipePopUp flex relative justify-center items-center bg-[#4F378B] w-[600px] h-[90%] rounded-[20px] m-auto p-10">
            <button className="CloseButton absolute top-0 right-0 m-5 
              bg-[#381E72] w-[30px] h-[30px] rounded-[50%] text-[#EADDFF] hover:bg-[#EADDFF] hover:text-[#4F378B] font-bold"
              onClick={handleClosePopUp}> X </button>
            <div className="RecipePopUpContent flex flex-col justify-start items-left w-full h-full mt-10 overflow-y-auto">
              <div className="RecipePopUpHeader flex flex-col justify-center items-left w-full">
                <div className="text-2xl text-gray-100 font-bold font-serif">Receta {num}:</div>
                <div className="RecipeTitle text-gray-300 text-4xl text-gray-150 ">{title}</div>
              </div>
              <div className="text-xl text-gray-100 mt-5 font-serif">Ingredientes:</div>
              <div className="RecipeIngredients text-gray-300 text-sm text-gray-150">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="IngredientItem">• {ingredient}</div>
                ))}
              </div>
              <div className="text-xl text-gray-100 mt-5 font-serif">Pasos:</div>
              <div className="RecipeSteps text-gray-300 text-sm text-gray-150">
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