import {
  // Links,
  // Meta,
  // Outlet,
  // Scripts,
  // ScrollRestoration,
} from "@remix-run/react";

import { useAuth0 } from "@auth0/auth0-react";
import SideBar from "../components/sideBar"; 
import DataCard from "../components/dataCard";
import PantryCard from "../components/pantryCard";
import NotificationLogOut from "../components/notificationLogOut";
import WelcomePopUp from "../components/welcomePopUp";
import useApi from "./useApi";
import { useState, useEffect } from "react";
import { useToken } from "./tokenContext";

export default function HomePage() {
  const api = useApi();
  useApi();
  // Checkear si el usuario está autenticado
  const { user } = useAuth0();
  const [showWelcome, setShowWelcome] = useState(false); // Start as false
  const [pantryItems, setPantryItems] = useState([]);
  const { tokenReady } = useToken(); 
  const [dataFetched, setDataFetched] = useState(false);
  
  useEffect(() => {
    // Check if first time user
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      setShowWelcome(true);
    }
  }, []);

  const handleWelcomeSubmit = () => {
    localStorage.setItem('hasVisitedBefore', 'true');
    setShowWelcome(false);
  };

  // Usar useApi para traer la data de la despensa
  const handlePantryChange = (pantryData) => {
    if (pantryData && pantryData.length > 0) {
      let ingredients = pantryData[0].ingredients;
  
      // Combine duplicate ingredients
      const combinedIngredients = ingredients.reduce((acc, curr) => {
        const existingItem = acc.find(item => 
          item.name.toLowerCase() === curr.name.toLowerCase() && 
          item.quantity.unit === curr.quantity.unit
        );
  
        if (existingItem) {
          existingItem.quantity.amount += curr.quantity.amount;
        } else {
          acc.push({
            ...curr,
            name: curr.name.charAt(0).toUpperCase() + curr.name.slice(1).toLowerCase() // Capitalize first letter
          });
        }
        return acc;
      }, []);
  
      // Sort ingredients alphabetically
      const sortedIngredients = combinedIngredients.sort((a, b) => 
        a.name.localeCompare(b.name)
      );
  
      setPantryItems(sortedIngredients);
    }
  };

  useEffect(() => { 

    if (tokenReady && !dataFetched) {
      console.log("Token is ready, fetching data...");
      
      Promise.all([api.getPantry()])
        .then(([pantryData]) => {
          console.log("Fetched Pantry Data:", pantryData);
          handlePantryChange(pantryData);
        })
        .catch(error => {
          console.error("Error fetching data:", error.message);
        });

      setDataFetched(true);
    }
  }, [tokenReady, dataFetched]);


  return (
    <div className="generalContainer flex">
      <SideBar/>
      <div className="Container relative h-[1100px] grow bg-[#E5E9F0] p-[60px]">
        {showWelcome && (
          <WelcomePopUp onSubmitSuccess={handleWelcomeSubmit} />
        )}
      <h1 className="text-4xl text-[#182F40]">
          Bienvenido/a, {user ? user.given_name : "Cargando..."}!
        </h1>

      {/*Data Cards*/}

      <div className="macros&pantryBox flex pt-[100px] justify-evenly">
        <div className="macrosBox flex flex-col items-center ">
          <div className="text-3xl text-[#182F40] font-bold pb-[5px]">Macros de hoy</div>
          <DataCard boxWidth={340} leftRowInfo={["80g", "200g", "50g", "2013kcal"]} rightRowInfo={["Proteínas", "Carbohidratos", "Grasas", "Calorías"]} />
          <div className="h-[20px]"></div>
        </div>
        <PantryCard 
          boxWidth={340}
          boxHeight={350} 
          leftRowInfo={pantryItems.map((item) => (
            `${item.quantity.amount} ${item.quantity.unit}`
          ))}
          rightRowInfo={pantryItems.map((item) => item.name)}
          api={api}
          onPantryUpdate={handlePantryChange}
          ITEMS_PER_PAGE={5}
        />
      </div>

        <div className="notificationsBox flex flex-col w-full items-center pt-[10px]">

          <div className="flex justify-start w-[830px]">
            <div className="text-3xl text-[#182F40] font-bold pb-[5px] pl-[50px]">Últimas notificaciones</div>
          </div>
          
          <div className="notificationsCard bg-[#A3BE8C] flex justify-center items-center h-[170px] rounded-[20px] text-[#182F40] w-[830px]">

            <div className="leftRow flex flex-col items-center font-bold pr-[40px] basis-1/5">
              {["09/09/2024", "07/09/2024", "07/09/2024", "07/09/2024"].map((leftInfo, index) => (
                <div key={index} className="leftItem mt-[5px] mb-[5px]">
                  {leftInfo}
                </div>
              ))}
            </div>

            <div className="rightRow flex flex-col items-start basis-3/5">
              {["Tus ingredientes frecuentes no están en tu despensa!", "No tienes pimiento!", "No hay yogurt para tus desayunos", "Se agotó el arroz en tu despensa!"].map((rightInfo, index) => (
                <div key={index} className="rightRow mt-[5px] mb-[5px]">
                  {rightInfo}
                </div>
              ))}
            </div>

          </div>

        </div>

      
      <img src="/images/ellipse-background.png" alt="elipse" className="absolute top-[50%] left-[50%] z-[-1]"/>

      <img src="/images/logo-sin-texto.png" alt="elipse" className="fixed top-[83%] left-[90%]"/>

      
    </div>
    <NotificationLogOut />
  </div>
);
}