import SideBar from "../components/sideBar";
import ProteinSlider from "../components/proteinSlider";
import SearchBar from "../components/searchBar";
import PurpleButton from "../components/purpleButton";
import DataCardHeart from "../components/dataCardHeart";
import HeartButton from "../components/heartButton"; 
import NotificationLogOut from "../components/notificationLogOut";
import ellipseBackground from '/images/ellipse-background.png';
import { useAuth0 } from '@auth0/auth0-react';
import { useToken } from './tokenContext';
import useApi from './useApi';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const headerText = "Con hambre? busca una ... ";
const headerSpanText = "Receta";
const firstParagraphText = "Te entregamos un listado de recetas que cumplen ";
const spanParagraphText = "casi perfectamente ";
const lastParagraphText = "tus requisitos";
const mockLastConsumedRecipes = [
  {
    recipe_id: "644387",
    consumedAt: "2024-12-08T02:49:32.763Z",
    calories: 169,
    carbs: 7,
    protein: 2,
    user: "user123",
  },
  {
    recipe_id: "1003464",
    consumedAt: "2024-12-07T10:20:00.000Z",
    calories: 200,
    carbs: 10,
    protein: 4,
    user: "user123",
  },
  {
    recipe_id: "715415",
    consumedAt: "2024-12-06T18:15:00.000Z",
    calories: 250,
    carbs: 15,
    protein: 5,
    user: "user123",
  },
  {
    recipe_id: "523487",
    consumedAt: "2024-12-05T14:45:00.000Z",
    calories: 180,
    carbs: 9,
    protein: 6,
    user: "user123",
  },
  {
    recipe_id: "812345",
    consumedAt: "2024-12-04T13:30:00.000Z",
    calories: 210,
    carbs: 8,
    protein: 5,
    user: "user123",
  },
  {
    recipe_id: "923456",
    consumedAt: "2024-12-03T12:00:00.000Z",
    calories: 300,
    carbs: 20,
    protein: 10,
    user: "user123",
  },
  {
    recipe_id: "634289",
    consumedAt: "2024-12-02T08:15:00.000Z",
    calories: 160,
    carbs: 5,
    protein: 3,
    user: "user123",
  },
  {
    recipe_id: "789123",
    consumedAt: "2024-12-01T20:30:00.000Z",
    calories: 195,
    carbs: 12,
    protein: 7,
    user: "user123",
  },
  {
    recipe_id: "478901",
    consumedAt: "2024-11-30T19:45:00.000Z",
    calories: 220,
    carbs: 11,
    protein: 6,
    user: "user123",
  },
  {
    recipe_id: "345678",
    consumedAt: "2024-11-29T15:00:00.000Z",
    calories: 240,
    carbs: 14,
    protein: 8,
    user: "user123",
  },
];

const mockRecipeNames = {
  644387: "Spaghetti Bolognese",
  1003464: "Chicken Salad",
  715415: "Vegetarian Pizza",
  523487: "Beef Stroganoff",
  812345: "Grilled Salmon",
  923456: "Pasta Carbonara",
  634289: "Greek Salad",
  789123: "Margarita Pizza",
  478901: "Vegetable Stir Fry",
  345678: "Lentil Soup",
};

const mockFavoriteRecipes = [
  {
    recipe_id: "644387",
    addedAt: "2024-11-10T15:30:00.000Z",
    user: "user123",
  },
  {
    recipe_id: "715415",
    addedAt: "2024-11-05T14:00.000Z",
    user: "user123",
  },
  {
    recipe_id: "923456",
    addedAt: "2024-10-25T16:30:00.000Z",
    user: "user123",
  },
  {
    recipe_id: "812345",
    addedAt: "2024-10-20T12:15:00.000Z",
    user: "user123",
  },
];

export default function RecipiesGenerator() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const api = useApi();
  const { tokenReady } = useToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [lastConsumedRecipes, setLastConsumedRecipes] = useState([]);
  const [lastConsumedRecipeNames, setLastConsumedRecipeNames] = useState([]);

  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteRecipeNames, setFavoriteRecipeNames] = useState([]);

  const getRecipeHandler = async () => {
    if (!tokenReady) {
      console.error("Token not ready. Please wait...");
      return;
    }
    setLoading(true);
    try {
      const recipes = await api.getRecipes();
      console.log("API Response:", recipes);
  
      if (recipes.success) {
        navigate("/recipes-list", { state: { recipes: recipes.results } });
      } else {
        console.error("Failed to fetch recipes: Success flag is false");
        alert("Failed to fetch recipes. Please try again later.");
      }
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
      alert("An error occurred while fetching recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchLastConsumedRecipes = async () => {
      try {
        let lastRecipes;
        if (tokenReady) {
          // Uncomment this when the real API is functional
          // lastRecipes = await api.getLastConsumedRecipes(3);
          lastRecipes = await new Promise((resolve) =>
            setTimeout(() => resolve(mockLastConsumedRecipes), 500)
          );
        } else {
          lastRecipes = mockLastConsumedRecipes;
        }

        console.log("Last Consumed Recipes:", lastRecipes);
        setLastConsumedRecipes(lastRecipes);

        const recipeNames = lastRecipes.map((recipe) => {
          const recipeId = parseInt(recipe.recipe_id, 10);
          return mockRecipeNames[recipeId] || "Unknown Recipe";
        });

        setLastConsumedRecipeNames(recipeNames);
      } catch (error) {
        console.error("Error fetching Last Consumed Recipes Data:", error.message);
      }
    };

    const fetchFavoriteRecipes = async () => {
      try {
        let favoriteRecipes;
        if (tokenReady) {
          // Uncomment this when the real API is functional
          // favoriteRecipes = await api.getFavoriteRecipes();
          favoriteRecipes = await new Promise((resolve) =>
            setTimeout(() => resolve(mockFavoriteRecipes), 500)
          );
        } else {
          favoriteRecipes = mockFavoriteRecipes;
        }

        console.log("Favorite Recipes:", favoriteRecipes);
        setFavoriteRecipes(favoriteRecipes);

        const recipeNames = favoriteRecipes.map((recipe) => {
          const recipeId = parseInt(recipe.recipe_id, 10);
          return mockRecipeNames[recipeId] || "Unknown Recipe";
        });

        setFavoriteRecipeNames(recipeNames);
      } catch (error) {
        console.error("Error fetching Favorite Recipes Data:", error.message);
      }
    };

    if (tokenReady) {
      fetchLastConsumedRecipes();
      fetchFavoriteRecipes();
    }
  }, [tokenReady]);

  const toggleFavorite = async (recipeId) => {
    const isAlreadyFavorite = favoriteRecipes.some((recipe) => recipe.recipe_id === recipeId);

    if (isAlreadyFavorite) {
      setFavoriteRecipes((prevFavorites) =>
        prevFavorites.filter((recipe) => recipe.recipe_id !== recipeId)
      );

      // Uncomment this when the real API is functional
      /*
      try {
        await api.removeRecipeFromFavorites(recipeId);
        console.log(`Recipe ${recipeId} removed from favorites`);
      } catch (error) {
        console.error(`Error removing recipe ${recipeId} from favorites:`, error.message);
      }
      */
    } else {
      setFavoriteRecipes((prevFavorites) => [
        ...prevFavorites,
        { recipe_id: recipeId, addedAt: new Date().toISOString() },
      ]);

      // Uncomment this when the real API is functional
      /*
      try {
        await api.addRecipeToFavorites(recipeId);
        console.log(`Recipe ${recipeId} added to favorites`);
      } catch (error) {
        console.error(`Error adding recipe ${recipeId} to favorites:`, error.message);
      }
      */
    }
  };

  const isFavorite = (recipeId) => {
    return favoriteRecipes.some((recipe) => recipe.recipe_id === recipeId);
  };

  return (
    <div className="generalContainer flex">
      <SideBar />
      <div className="ContainerBody relative h-[1100px] grow bg-[#E5E9F0] p-[60px] z-[0] overflow-y-hidden">
        <h1 className="text-3xl font-bold text-[#182F40] font-kantumruy">
          {headerText}
          <span className="text-7xl font-light">{headerSpanText}</span>
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
            {firstParagraphText}
            <span className="font-bold">{spanParagraphText}</span>
            {lastParagraphText}
          </p>
        </div>

        <div className="flex justify-evenly text-[#182F40] mt-[100px]">
  {/* Últimas recetas Section */}
  <div className="flex flex-col items-center">
    <div className="text-3xl font-bold mb-[15px] font-kantumruy">Últimas recetas</div>
    <DataCardHeart
      boxWidth={470}
      rows={lastConsumedRecipes.map((recipe, index) => ({
        leftText: `${lastConsumedRecipeNames[index] || "Receta desconocida"} - Calorías: ${recipe.calories}`,
        rightText: new Date(recipe.consumedAt).toLocaleDateString(),
        isFavorite: isFavorite(recipe.recipe_id),
      }))}
      onToggleFavorite={(index) => toggleFavorite(lastConsumedRecipes[index].recipe_id)}
    />
    <div className="h-[20px]"></div>
    <SearchBar />
  </div>

  {/* Recetas favoritas Section */}
  <div className="flex flex-col items-center">
    <div className="text-3xl font-bold mb-[15px] font-kantumruy">Recetas favoritas</div>
    <DataCardHeart
      boxWidth={470}
      rows={favoriteRecipes.map((recipe) => ({
        leftText: mockRecipeNames[recipe.recipe_id] || "Receta desconocida",
        rightText: new Date(recipe.addedAt).toLocaleDateString(),
        isFavorite: true,
      }))}
      onToggleFavorite={(index) => toggleFavorite(favoriteRecipes[index].recipe_id)}
    />
    <div className="h-[20px]"></div>
    <SearchBar />
  </div>
</div>
  
        {/* Background images and Logo */}
        <img src={ellipseBackground} alt="elipse" className="absolute top-[-35%] left-[-10%] z-[-1]" />
        <img src={ellipseBackground} alt="elipse" className="absolute top-[45%] left-[60%] z-[-1]" />
        <img src="/images/logo-sin-texto.png" alt="logo" className="fixed bottom-[20px] right-[20px] w-[60px] h-[60px]" />
      </div>
      <NotificationLogOut />
    </div>
  );
}