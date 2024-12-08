import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import ProteinSlider from "../components/proteinSlider";
import PurpleButton from "../components/purpleButton";
import DataCardHeart from "../components/dataCardHeart";
import NotificationLogOut from "../components/notificationLogOut";
import DataCardNoG from "../components/dataCardNoG";
import useApi from "./useApi";
import ellipseBackground from '/images/ellipse-background.png';
import { useToken } from "./tokenContext";

export default function RecipiesGenerator() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { tokenReady } = useToken();
  const api = useApi();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [lastConsumedRecipes, setLastConsumedRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const getRecipeHandler = async () => {
    if (!tokenReady) {
      console.error("Token not ready. Please wait...");
      return;
    }
    setLoading(true);
    try {
      const recipes = await api.getRecipes();
      navigate("/recipes-list", { state: { recipes: recipes.results } });
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLastConsumedRecipes = async () => {
    try {
      const response = await api.getLastConsumedRecipes();
      const recipesWithTitles = response.length
        ? await Promise.all(
            response.map(async (recipe) => {
              const recipeNameResponse = await api.getRecipeNameFromId(
                recipe.recipe_id
              );
              return {
                ...recipe,
                title: recipeNameResponse.success
                  ? recipeNameResponse.title
                  : "Unknown Recipe",
              };
            })
          )
        : [];
      setLastConsumedRecipes(recipesWithTitles);
    } catch (error) {
      console.error("Error fetching Last Consumed Recipes:", error.message);
      setLastConsumedRecipes([]);
    }
  };

  const fetchFavoriteRecipes = async () => {
    try {
      const response = await api.getFavoriteRecipes();
      const recipesWithTitles = response.length
        ? await Promise.all(
            response.map(async (recipe) => {
              const recipeNameResponse = await api.getRecipeNameFromId(
                recipe.recipe_id
              );
              return {
                ...recipe,
                title: recipeNameResponse.success
                  ? recipeNameResponse.title
                  : "Unknown Recipe",
              };
            })
          )
        : [];
      setFavoriteRecipes(recipesWithTitles);
    } catch (error) {
      console.error("Error fetching Favorite Recipes:", error.message);
      setFavoriteRecipes([]);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    
    if (tokenReady) {
      fetchLastConsumedRecipes();
      fetchFavoriteRecipes();
    }
  }, [tokenReady]);

  const toggleFavorite = async (recipeId) => {
    const isFavorite = favoriteRecipes.some(
      (recipe) => recipe.recipe_id === recipeId
    );

    if (isFavorite) {
      setFavoriteRecipes((prev) =>
        prev.filter((recipe) => recipe.recipe_id !== recipeId)
      );
      try {
        await api.removeRecipeFromFavorites(recipeId);
      } catch (error) {
        console.error(
          `Error removing recipe ${recipeId} from favorites:`,
          error.message
        );
      }
    } else {
      const recipeToAdd =
        lastConsumedRecipes.find((recipe) => recipe.recipe_id === recipeId) || {
          recipe_id: recipeId,
        };
      setFavoriteRecipes((prev) => [...prev, recipeToAdd]);
      try {
        await api.addRecipeToFavorites(recipeId);
      } catch (error) {
        console.error(
          `Error adding recipe ${recipeId} to favorites:`,
          error.message
        );
      }
    }
  };

  return (
    <div className="generalContainer flex">
      <SideBar />
      <div className="ContainerBody relative h-[1100px] grow bg-[#E5E9F0] p-[60px] z-[0] overflow-y-hidden">
        <h1 className="text-3xl font-bold text-[#182F40] font-kantumruy">
          Con hambre? busca una ...{" "}
          <span className="text-7xl font-light">Receta</span>
        </h1>

        <div className="slider&parragraph flex justify-evenly text-[#182F40] mt-[60px]">
          <div className="flex flex-col justify-between items-center">
            <ProteinSlider />
            <PurpleButton
              text={loading ? "Buscando recetas..." : "Solicita una receta"}
              onClick={getRecipeHandler}
              disabled={loading}
            />
          </div>
          <p className="w-[300px] text-2xl font-kantumruy">
            Te entregamos un listado de recetas que cumplen{" "}
            <span className="font-bold">casi perfectamente</span> tus requisitos
          </p>
        </div>

        <div className="flex justify-evenly text-[#182F40] mt-[100px]">
          {/* Últimas recetas */}
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold mb-[15px] font-kantumruy">
              Últimas recetas
            </div>
            {loading ? (
              <DataCardNoG
              boxWidth={470}
              leftRowInfo={["Generando Recetas"]}
              rightRowInfo={[" "]}
            />
            ) : lastConsumedRecipes.length === 0 ? (
              <DataCardNoG
                boxWidth={470}
                leftRowInfo={["No has hecho recetas"]}
                rightRowInfo={[""]}
              />
            ) : (
              <DataCardHeart
                boxWidth={470}
                rows={lastConsumedRecipes.map((recipe) => ({
                  recipeId: recipe.recipe_id,
                  leftText: `${recipe.title || "Unknown Recipe"} - Calorías: ${
                    recipe.calories || "N/A"
                  }`,
                  rightText: recipe.createdAt
                    ? new Date(recipe.createdAt).toLocaleDateString()
                    : "Invalid Date",
                  isFavorite: favoriteRecipes.some(
                    (fav) => fav.recipe_id === recipe.recipe_id
                  ),
                }))}
                onToggleFavorite={(recipeId) => {
                  toggleFavorite(recipeId);
                }}
              />
            )}
          </div>

          {/* Recetas favoritas */}
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold mb-[15px] font-kantumruy">
              Recetas favoritas
            </div>
            {loading ? (
              <DataCardNoG
              boxWidth={470}
              leftRowInfo={["Generando Recetas"]}
              rightRowInfo={[" "]}
            />
            ) : favoriteRecipes.length === 0 ? (
              <DataCardNoG
              boxWidth={470}
              leftRowInfo={["No tienes recetas favoritas"]}
              rightRowInfo={[" "]}
            />
            ) : (
              <DataCardHeart
                boxWidth={470}
                rows={favoriteRecipes.map((recipe) => ({
                  recipeId: recipe.recipe_id,
                  leftText: `${recipe.title || "Unknown Recipe"} - Calorías: ${
                    recipe.calories || "N/A"
                  }`,
                  rightText: recipe.createdAt
                    ? new Date(recipe.createdAt).toLocaleDateString()
                    : "Invalid Date",
                  isFavorite: true,
                }))}
                onToggleFavorite={(recipeId) => {
                  toggleFavorite(recipeId);
                }}
              />
            )}
          </div>
        </div>
        <img src={ellipseBackground} alt="elipse" className="absolute top-[-35%] left-[-10%] z-[-1]"/>
        <img src={ellipseBackground} alt="elipse" className="absolute top-[45%] left-[60%] z-[-1]"/>
        <img src="/images/logo-sin-texto.png" alt="logo" className="fixed bottom-[20px] right-[20px] w-[60px] h-[60px]" />

      </div>
      <NotificationLogOut />
    </div>
  );
}