import { useLocation } from "react-router-dom";
import SideBar from "../components/sideBar";
import NotificationLogOut from "../components/notificationLogOut";
import RecipeCard from "../components/recipeCard";
import ellipseBackground from "/images/ellipse-background.png";

export default function RecipiesList() {
  const location = useLocation();
  const { recipes } = location.state || { recipes: [] };

  return (
    <div className="generalContainer flex">
      <SideBar userName={{ Name: "Dafne", LastName: "Arriagada" }} />
      <div className="ContainerBody relative h-[1100px] grow bg-[#E5E9F0] p-[60px] z-[0] overflow-y-hidden">
        <h1 className="text-3xl text-[#182F40] font-bold">
          Con hambre? busca una ...{" "}
          <span className="text-7xl font-extralight">Receta</span>
        </h1>

        {/* Horizontal Scrollable Container */}
        <div className="flex justify-center">
          <div className="RecipeCardsContainer flex mt-[120px] w-full max-w-[1200px] overflow-x-auto gap-x-6 px-4 scrollbar-hide">
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  N={index + 1}
                  recipeName={recipe.title}
                  imageUrl={recipe.image}
                />
              ))
            ) : (
              <div>No recipes found!</div>
            )}
          </div>
        </div>

        <img
          src={ellipseBackground}
          alt="elipse"
          className="absolute top-[-35%] left-[-10%] z-[-1]"
        />
        <img
          src={ellipseBackground}
          alt="elipse"
          className="absolute top-[45%] left-[60%] z-[-1]"
        />
        <img
          src="/images/logo-sin-texto.png"
          alt="logo"
          className="fixed bottom-[20px] right-[20px] w-[60px] h-[60px]"
        />
      </div>
      <NotificationLogOut />
    </div>
  );
}