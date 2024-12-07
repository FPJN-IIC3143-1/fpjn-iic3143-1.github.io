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
    if (pantryData && pantryData.length > 0) {
      // Extract ingredients from first pantry object
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

  // Add validation function
  const isValidQuantityFormat = (input) => {
    // Matches patterns like "500 grams", "2.5 kg", "3 units"
    const regex = /^\d*\.?\d+\s+(g|kg|un|ml|lt|lata|tsp|tbsp|c|pt|qt|gal|oz|fl oz|lb")$/i;
    return regex.test(input);
  };

  // Update state to include validation feedback
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: {
      raw: '',      // For displaying the input
      amount: '',    // Parsed amount
      unit: 'gr'    // Parsed unit
    },
    quantityError: false
  });

  // Update handleItemChange
  const handleItemChange = (field, value) => {
    if (field === 'name') {
      setNewItem(prev => ({
        ...prev,
        name: value
      }));
    } else if (field === 'quantity') {
      // Always update the raw input
      setNewItem(prev => ({
        ...prev,
        quantity: {
          ...prev.quantity,
          raw: value
        },
        quantityError: false
      }));
  
      // Only parse if input matches expected format
      if (isValidQuantityFormat(value)) {
        const [amount, unit] = value.toLowerCase().split(/\s+/);
        setNewItem(prev => ({
          ...prev,
          quantityError: false,
          quantity: {
            ...prev.quantity,
            raw: value,
            amount: parseFloat(amount),
            unit: unit
          }
        }));
      } else if (value) {
        setNewItem(prev => ({
          ...prev,
          quantityError: true
        }));
      }
    }
  };

  // Add submit handler
  const handleSubmitNewItem = async (e) => {
    e.preventDefault();
    if (newItem.name && !newItem.quantityError && isValidQuantityFormat(newItem.quantity.raw)) {
      try {
        // Format the new item for API
        const newItemForApi = [{
          name: newItem.name.toLowerCase().trim(),
          quantity: {
            amount: newItem.quantity.amount,
            unit: newItem.quantity.unit
          }
        }];
  
        // Add to database
        await api.addIngredientsToPantry(newItemForApi);
        
        // Fetch updated pantry data
        const updatedPantryData = await api.getPantry();
        
        // Update local state
        handlePantryChange(updatedPantryData);

        console.log('Item: added successfully');
        console.log('New item:', newItemForApi);
        console.log('Updated pantry data:', updatedPantryData);
        
        // Reset form
        setNewItem({
          name: '',
          quantity: {
            raw: '',
            amount: '',
            unit: 'gr'
          },
          quantityError: false
        });

  
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };

  return (
    <div className="generalContainer flex">
      <SideBar/>

      <div className="Container relative h-[1100px] grow bg-[#E5E9F0] p-[60px] z-[0]">

        <h1 className="text-2xl font-bold text-[#182F40] tracking-wider leading-tight mb-2">Qué hay hoy en tu ...</h1>
        
        <h2 className="text-6xl font-thin text-[#182F40] tracking-wide leading-none mb-[30px]">Despensa</h2>

        <div className="flex lg:flex-row md:flex-row sm:flex-col space-x-12 justify-center items-start">
          
          {/* Pantry Item List */}
          <div className="w-1/2 flex flex-col items-center">
          <PantryCard 
            boxWidth={340} 
            leftRowInfo={pantryItems.map((item) => (
              `${item.quantity.amount} ${item.quantity.unit}`
            ))}
            rightRowInfo={pantryItems.map((item) => item.name)}
            api={api}
            onPantryUpdate={handlePantryChange}
          />
          </div>
            
          {/* Add new purchases */}
          <div className="w-1/2 flex flex-col items-center">
            <div className="bg-[#A3BE8C] rounded-[20px] p-6 w-full flex flex-col items-center justify-center text-[#182F40]">
              <h3 className="text-3xl font-bold mb-4">¿Compraste?</h3>
              <form onSubmit={handleSubmitNewItem} className="flex flex-col w-full max-w-xs text-center">
                <input
                  type="text"
                  placeholder="Nombre de Alimento"
                  value={newItem.name}
                  onChange={(e) => handleItemChange('name', e.target.value)}
                  className="rounded-lg p-2 border border-gray-300 bg-[#F5F5F5] w-full text-center
                    focus:outline-none focus:shadow-lg focus:bg-[#D0BCFE] hover:bg-[#D0BCFE] mb-3"
                  required
                />
                <input
                  type="text"
                  placeholder="Cantidad (ej: 500 gr)"
                  value={newItem.quantity.raw}
                  onChange={(e) => handleItemChange('quantity', e.target.value)}
                  className={`rounded-lg p-2 border ${
                    newItem.quantityError 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  } bg-[#F5F5F5] w-full text-center
                  focus:outline-none focus:shadow-lg focus:bg-[#D0BCFE] hover:bg-[#D0BCFE]`}
                  required
                />
                {newItem.quantityError && (
                  <>
                    <span className="text-red-500 text-sm font-bold mt-1">
                      Formato requerido: [número] espacio [unidad]
                    </span>
                    <span className="text-red-500 text-sm font-bold mt-1">
                      [ 1 | 23 | 0.5 ] [g, kg, un, ml, lt, c, tsp, etc]
                    </span>
                  </>
                )}
                <button type="submit" className="hidden" />
              </form>
            </div>
            <div className="flex justify-center mt-4">
              <PurpleButton 
                text="Ingresa nuevo alimento" 
                icon="➕" 
                onClick={() => document.querySelector('form').requestSubmit()} 
              />            
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

