
export default function RecipePopUp({num=0, title='', ingredients=[], steps=[]}) {
  // TODO: Logica para scroll en el popUp

  // logica para mostrar la receta
  const handleOpenPopUp = () => {
    const popUpContainer = document.getElementById("RecipePopUpContainer");
    popUpContainer.style.display = "flex";
  };

  const handleClosePopUp = () => {
    const popUpContainer = document.getElementById("RecipePopUpContainer");
    popUpContainer.style.display = "none";
  }

  return(
    <>
      <button className="RecipeButton bg-[#4F378B] hover:bg-[#D0BCFE] w-[220px] h-[53px] rounded-[16px] text-[#EADDFF] hover:text-[#381E72]"
        onClick={handleOpenPopUp}>
        Ver Receta Completa
      </button>

      <div id="RecipePopUpContainer" className="RecipePopUpContainer bg-gray-900 bg-opacity-50 w-full h-full rounded-[20px] m-[2px]
          hidden absolute top-0 right-0 left-0 bottom-0 transition-all duration-100 ease-in">
        <div className="RecipePopUp flex relative justify-center items-center bg-[#4F378B] w-[600px] h-[90%] rounded-[20px] m-auto p-10">
          <button className="CloseButton absolute top-0 right-0 m-5 
            bg-[#381E72] w-[30px] h-[30px] rounded-[50%] text-[#EADDFF] hover:bg-[#EADDFF] hover:text-[#4F378B] font-bold"
            onClick={handleClosePopUp}> X </button>
          <div className="RecipePopUpHeader flex flex-col justify-center items-left w-full h-[10%]">
            <div className="text-2xl text-gray-100 font-bold font-serif">Receta {num}:</div>
            <div className="RecipeTitle text-gray-300 text-4xl text-gray-150 ">{title}</div>
            <div className="text-xl text-gray-100 mt-5 font-serif">Ingredientes:</div>
            {/* Mapeo de ingredientes */}
            <div className="RecipeIngredients text-gray-300 text-sm text-gray-150">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="IngredientItem">• {ingredient}</div>
              ))}
            </div>
            <div className="text-xl text-gray-100 mt-5 font-serif">Pasos:</div>
            {/* Mapeo de pasos */}
            <div className="RecipeSteps text-gray-300 text-sm text-gray-150">
              {steps.map((step, index) => (
                <div key={index} className="StepItem">{index + 1}. {step}</div>
              ))}
            </div>


            
          </div> 
        </div>
      </div>
    </>
  )
}
