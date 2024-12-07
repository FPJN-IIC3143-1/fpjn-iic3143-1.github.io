import React, { useState } from "react";
import RecipePopUp from "./recipePopUp";
import RecipeAlert from "./recipeAlert";

export default function RecipeCard({ N, recipeName, imageUrl }) {
  const [showPopup, setShowPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false); 

  const handleMakeRecipe = () => {
    setShowAlert(true); 
  };

  const handleConfirm = () => {
    setShowAlert(false); 
    console.log("Confirmed 'Hacer Receta'");
  };

  const handleCloseAlert = () => {
    setShowAlert(false); 
  };

  const handleClosePopup = () => {
    setShowPopup(false); 
  };

  return (
    <div className="recipe-card flex flex-col items-center">
      <div className="title text-[#182F40] text-4xl font-bold">Receta {N}</div>

      {/* Green Background Container */}
      <div className="container bg-[#A3BE8C] flex flex-col rounded-[20px] text-[#182F40] w-[320px] mt-4 shadow-lg">
        {/* Recipe Image */}
        <img
          src={imageUrl}
          alt={recipeName}
          className="recipe-image w-full h-[180px] object-cover rounded-t-[20px]"
        />

        {/* Recipe Name */}
        <div className="subtitle text-[#182F40] text-2xl w-full text-center mt-4 px-4">
          {recipeName}
        </div>

        {/* Action Buttons */}
        <div className="botContainer flex flex-col justify-center items-center pb-6 pt-5 space-y-4">
       
          <RecipePopUp
            num={N}
            title={recipeName}
            ingredients={[ ]}
            steps={[]}
            onClose={handleClosePopup}
          />
          <button
            className="RecipeButton bg-[#4F378B] hover:bg-[#7461AC] w-[220px] h-[50px] rounded-[16px] text-[#FFFFFF]"
            onClick={handleMakeRecipe}
          >
            Hacer Receta
          </button>
        </div>
      </div>

      {/* Render RecipeAlert for "Hacer Receta" */}
      {showAlert && (
        <RecipeAlert
          title="Descontar alimentos de la despensa y contarlos en los macros"
          onConfirm={handleConfirm}
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
}