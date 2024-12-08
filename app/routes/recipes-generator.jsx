
import SideBar from "../components/sideBar";
import ProteinSlider from "../components/proteinSlider";
import SearchBar from "../components/searchBar";
import PurpleButton from "../components/purpleButton";
import DataCard from "../components/dataCard"
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


export default function RecipiesGenerator() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const api = useApi();
  const { tokenReady } = useToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [lastConsumedRecipes, setLastConsumedRecipes] = useState([]);
  // const [lastConsumedRecipesTitles, setLastConsumedRecipesTitles] = useState([]);


  const getRecipeHandler = async () => { // ToDo: Nombre poco descriptivo !!
    if (!tokenReady) {
      console.error("Token not ready. Please wait...");
      return;
    }
    setLoading(true);
    try {
      const recipes = await api.getRecipes();
      console.log(recipes)
      navigate("/recipes-list", { state: { recipes: recipes.results } });
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (tokenReady) {
      Promise.all([api.getLastConsumedRecipes()])
        .then(([lastConsumedRecipes]) => {
          setLastConsumedRecipes(lastConsumedRecipes);
        })
        .catch(error => {
          console.error("Error fetching Last Consumed Recipes Data:", error.message);
        });
    }
  }, [tokenReady]); // WARNING: no agregar 'api' a la lista de dependencias. Esto causará un bucle infinito


  useEffect(() => {
    if (tokenReady && lastConsumedRecipes.length > 0) {
      console.log("Last Consumed Recipes:", lastConsumedRecipes);

      // este endpoint da problemas.
      
      // console.log((async () => {api.getRecipeInformation(lastConsumedRecipes[0]["recipe_id"])})());

      // lastConsumedRecipes.forEach(recipe => {
      //   console.log(recipe["recipe_id"]);
      //   (async () => {
      //     try {
      //       const recipeData = await api.getRecipeInformation(recipe["recipe_id"]);
      //       console.log('Recipe Data inside fetch title:', recipeData);
      //     } catch (error) {
      //       console.error("Failed to fetch recipe data:", error);
      //     }
      //   })();
      // });
    }
  }
  , [tokenReady, lastConsumedRecipes]);





  return (
    <div className="generalContainer flex">
      <SideBar />
      <div className="ContainerBody relative h-[1100px] grow bg-[#E5E9F0] p-[60px] z-[0] overflow-y-hidden">
        <h1 className="text-3xl text-[#182F40] font-bold">
          {headerText}<span className="text-7xl font-extralight">{headerSpanText}</span>
        </h1>

        <div className="slider&parragraph flex justify-evenly text-[#182F40] mt-[60px]">
          <div className="flex flex-col justify-between items-center">
            <ProteinSlider />
            <PurpleButton
              text={loading ? "Cargando..." : "Solicita una receta"}
              onClick={getRecipeHandler}
              disabled={loading}
            />
          </div>

          <p className="w-[300px] text-2xl">
            {firstParagraphText}
            <span className="font-bold">{spanParagraphText}</span>
            {lastParagraphText}
          </p>
        </div>

        <div className="flex justify-evenly text-[#182F40] mt-[100px]">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold mb-[15px]">Últimas recetas</div>
            <DataCard page='recipes-generator' boxWidth={470} leftRowInfo={["Almuerzo", "Desayuno", "Desayuno", "Cena"]} rightRowInfo={["Arroz con pollo al pesto", "Yogurt con semillas y frutas", "Smoothie rojo", "Ensalada de Quinoa"]} />
            <div className="h-[20px]"></div>
            <SearchBar/>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold mb-[15px]">Recetas favoritas</div>
            <DataCard page='recipes-generator' boxWidth={470} leftRowInfo={["Almuerzo", "Desayuno", "Desayuno", "Cena"]} rightRowInfo={["Arroz con pollo al pesto", "Yogurt con semillas y frutas", "Smoothie rojo", "Ensalada de Quinoa"]} />
            <div className="h-[20px]"></div>
            <SearchBar/>
          </div>
        </div>

        {/* Background images and Logo */}
        <img src={ellipseBackground} alt="elipse" className="absolute top-[-35%] left-[-10%] z-[-1]"/>
        <img src={ellipseBackground} alt="elipse" className="absolute top-[45%] left-[60%] z-[-1]"/>
        <img src="/images/logo-sin-texto.png" alt="logo" className="fixed bottom-[20px] right-[20px] w-[60px] h-[60px]" />

      </div>
      <NotificationLogOut />
    </div>
  );

}