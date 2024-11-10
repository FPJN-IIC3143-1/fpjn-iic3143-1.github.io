import { useEffect, useState } from 'react';
import SideBar from "../components/sideBar";
import PantryCard from "../components/pantryCard";
import PurpleButton from "../components/purpleButton";
import NotificationLogOut from "../components/notificationLogOut";
import { useAuth0 } from '@auth0/auth0-react';
import useApi from './useApi';
import { useToken } from './tokenContext';

export default function Pantry() {
  const [pantryItems, setPantryItems] = useState([]);

  // Checkear si el usuario está autenticado
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  // Usar useApi para traer la data de la despensa
  const api = useApi();
  const { tokenReady } = useToken(); 
  const [dataFetched, setDataFetched] = useState(false);

  const handlePantryChange = (pantryData) => {
    if (pantryItems){
      setPantryItems(pantryData);
    } else {
      console.error("No pantry data found in response");
    }
  }

  useEffect(() => { 
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

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
  }, [isAuthenticated, loginWithRedirect, tokenReady, dataFetched]);

  const handleQuantityChange = (id, newQuantity) => {
    setPantryItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="generalContainer flex">
      <SideBar userName={{ Name: "Dafne", LastName: "Arriagada" }} />

      <div className="Container relative h-[1100px] grow bg-[#E5E9F0] p-[60px] z-[0]">

        <h1 className="text-2xl font-bold text-[#182F40] tracking-wider leading-tight mb-2">Qué hay hoy en tu ...</h1>
        
        <h2 className="text-6xl font-thin text-[#182F40] tracking-wide leading-none mb-[30px]">Despensa</h2>

        <div className="flex lg:flex-row md:flex-row sm:flex-col space-x-12 justify-center items-start">
          
          {/* Pantry Item List */}
          <div className="w-1/2 flex flex-col items-center">
            <PantryCard 
              boxWidth={340} 
              leftRowInfo={pantryItems.map((item) => 
                
                  <span key={`quantity-${item.id}`}>{item.quantity}</span> 
    
              )} 
              rightRowInfo={pantryItems.map((item) => (
                <span key={`name-${item.id}`}>{item.name}</span> 
              ))} 
            />
            <div className="flex justify-center mt-4">
              <PurpleButton text={"Editar Despensa"} />
            </div>
          </div>
            
          {/* Add new purchases */}
          <div className="w-1/2 flex flex-col items-center">
            <div className="bg-[#A3BE8C] rounded-[20px] p-6 w-full flex flex-col items-center justify-center text-[#182F40]">
              <h3 className="text-3xl font-bold mb-4">¿Compraste?</h3>
              <form className="flex flex-col space-y-4 w-full max-w-xs text-center">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="rounded-lg p-2 border border-gray-300 bg-[#F5F5F5] w-full text-center"
                  required
                />
                <input
                  type="text"
                  placeholder="Cantidad, gramaje o volumen"
                  className="rounded-lg p-2 border border-gray-300 bg-[#F5F5F5] w-full text-center"
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  required
                />
              </form>
            </div>
            <div className="flex justify-center mt-4">
              <PurpleButton text="Ingresa nuevo alimento" icon="➕" />
            </div>
          </div>

        </div>

        {/* Background Shapes and Logo */}
        <img src="/images/ellipse-background.png" alt="decorative ellipse" className="absolute top-[50%] left-[50%] z-[-1]" />
        <img src="/images/logo-sin-texto.png" alt="logo" className="fixed bottom-[20px] right-[20px] w-[60px] h-[60px]" />
        <img src="/images/logo-sin-texto.png" alt="logo" className="fixed bottom-[20px] right-[20px] w-[60px] h-[60px]" />
        
        <NotificationLogOut />
      </div>
    </div>
  );
}

