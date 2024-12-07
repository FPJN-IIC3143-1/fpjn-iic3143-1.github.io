import { useState } from "react";

export default function RecipePopUp({
  num = 0,
  title = "",
  ingredients = [],
  steps = [],
  summary = "",
  readyInMinutes = null,
  servings = null,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClosePopUp = () => {
    setIsVisible(false);
    if (onClose) onClose(); // Notificar al componente padre que se cerró el popup
  };

  return (
    <>
      {isVisible && (
        <div
          className="RecipePopUpContainer bg-gray-900 bg-opacity-50 w-full h-full fixed top-0 left-0 flex items-center justify-center z-50"
        >
          <div
            className="RecipePopUp bg-[#4F378B] w-[700px] h-[80%] rounded-[20px] p-10 relative overflow-hidden"
          >
            {/* Botón de cerrar */}
            <button
              className="CloseButton absolute top-4 right-4 
              bg-[#381E72] w-[40px] h-[40px] rounded-[50%] text-[#EADDFF] hover:bg-[#EADDFF] hover:text-[#4F378B] font-bold"
              onClick={handleClosePopUp}
            >
              X
            </button>

            {/* Contenido del popup */}
            <div
              className="RecipePopUpContent flex flex-col justify-start items-left w-full h-full mt-10 overflow-y-auto pb-10"
            >
              {/* Encabezado */}
              <div className="RecipePopUpHeader flex flex-col justify-center items-left w-full">
                <div className="text-2xl text-gray-100 font-bold">Receta {num}:</div>
                <div className="RecipeTitle text-gray-300 text-4xl">{title}</div>
              </div>

              {/* Resumen */}
              {summary && (
                <div className="RecipeSummary text-gray-200 text-base mt-4">
                  <div dangerouslySetInnerHTML={{ __html: summary }} />
                </div>
              )}

              {/* Tiempo de preparación y porciones */}
              <div className="RecipeDetails text-gray-300 text-lg mt-4">
                {readyInMinutes && <div>⏱ Tiempo de preparación: {readyInMinutes} minutos</div>}
                {servings && <div>🍽 Porciones: {servings}</div>}
              </div>

              {/* Ingredientes */}
              <div className="text-xl text-gray-100 font-bold mb-[10px] mt-[30px]">Ingredientes:</div>
              <div className="RecipeIngredients text-base text-gray-300">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="IngredientItem">
                    • {ingredient.original}
                  </div>
                ))}
              </div>

              {/* Pasos */}
              <div className="text-xl text-gray-100 font-bold mb-[10px] mt-[20px]">Pasos:</div>
              <div className="RecipeSteps text-gray-100 text-base">
                {steps.length > 0
                  ? steps.map((step, index) => (
                      <div key={index} className="StepItem">
                        {index + 1}. {step.step}
                      </div>
                    ))
                  : "No hay pasos disponibles."}
              </div>
            </div>

            {/* Línea de pie de página */}
            <div className="RecipePopUpFooter flex justify-center items-center h-[2px] w-full bg-gray-100 mt-[60px] mb-[10px]"></div>
          </div>
        </div>
      )}
    </>
  );
}