import React, { useState, useEffect } from "react";
import RecipePopUp from "./recipePopUp";
import RecipeAlert from "./recipeAlert";
import useApi from "../routes/useApi";

export default function RecipeCard({ N, recipeName, imageUrl, recipeId }) {
  const [showPopup, setShowPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { getRecipeInformation, registerRecipeConsumption} = useApi();

  const handlePopupOpen = async () => {
    setLoading(true);
    setError(null);
    try {
      const info = await getRecipeInformation(recipeId);
      setRecipeInfo(info);
      setShowPopup(true);
    } catch (err) {
      setError("Failed to fetch recipe information.");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMakeRecipe = () => {
    setShowAlert(true);
  };

  const handleConfirm = async () => {
    setShowAlert(false);
    try {
      const response = await registerRecipeConsumption(recipeId);
      console.log(response);
      alert(`${response.message}`);
    } catch (err) {
      alert(`Error al registrar la receta: ${err.message}`);
      console.error(err.message);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setRecipeInfo(null);
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
          <button
            className="RecipeButton bg-[#4F378B] hover:bg-[#7461AC] w-[220px] h-[50px] rounded-[16px] text-[#FFFFFF]"
            onClick={handlePopupOpen}
          >
            View Recipe
          </button>
          <button
            className="RecipeButton bg-[#4F378B] hover:bg-[#7461AC] w-[220px] h-[50px] rounded-[16px] text-[#FFFFFF]"
            onClick={handleMakeRecipe}
          >
            Hacer Receta
          </button>
        </div>
      </div>

      {/* Render RecipePopup */}
      {showPopup && (
       <RecipePopUp
        num={N}
        title={recipeName}
        ingredients={recipeInfo.extendedIngredients || []}
        steps={recipeInfo.analyzedInstructions?.[0]?.steps || []}
        summary={recipeInfo.summary || ""}
        readyInMinutes={recipeInfo.readyInMinutes || null}
        servings={recipeInfo.servings || null}
        onClose={handleClosePopup}
      />
      )}

      {/* Render RecipeAlert for "Hacer Receta" */}
      {showAlert && (
        <RecipeAlert
          title="Agregar Receta a Historial"
          onConfirm={handleConfirm}
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
}