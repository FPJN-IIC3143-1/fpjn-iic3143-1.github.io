import { useNavigate } from "@remix-run/react";
import RecipePopUp from "./recipePopUp";

export default function RecipeCard({ N, recipeName, imageUrl }) {
  const navigate = useNavigate();

  const handleMakeRecipe = () => {
    navigate("./make-recipe");
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

        {/* Action Button */}
        <div className="botContainer flex flex-col justify-center items-center pb-6 pt-5">
          <RecipePopUp
            num={N}
            title={recipeName}
            ingredients={[]}
            steps={[]}
          />
          <button
            className="RecipeButton bg-[#4F378B] hover:bg-[#7461AC] w-[220px] h-[50px] rounded-[16px] text-[#FFFFFF] hover:text-[#FFFFFF] mt-[20px]"
            onClick={handleMakeRecipe}
          >
            Hacer Receta
          </button>
        </div>
      </div>
    </div>
  );
}