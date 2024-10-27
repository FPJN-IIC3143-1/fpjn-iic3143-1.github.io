import { useEffect, useState } from 'react';
import SideBar from "../components/sideBar";
import PurpleButton from "../components/purpleButton";
import NotificationLogOut from "../components/notificationLogOut";
import SearchBar from "../components/searchBar";
import { useAuth0 } from '@auth0/auth0-react';
import useApi from './useApi';

export default function DietaryPreferences() { 
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const api = useApi();

  // State to manage dietary restrictions and macro goals
  const [restrictions, setRestrictions] = useState({
    celiac: false,
    lactoseIntolerant: true,
    vegan: false,
    vegetarian: false,
  });

  const [macroGoals, setMacroGoals] = useState({
    protein: 0,
    fats: 0,
    carbs: 0,
    calories: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else if (api.tokenReady) {
      api.getRecipes().then((recipes) => {
        console.log("Recipes:", recipes);
      });
  
      api.getPreferences().then(preferences => {
        if (preferences) {
          setRestrictions({
            celiac: preferences.diet === 'celiac',
            lactoseIntolerant: preferences.intolerances.includes('lactose'),
            vegan: preferences.diet === 'vegan',
            vegetarian: preferences.diet === 'vegetarian',
          });
        }
      });
  
      // Fetch daily goals and set state
      api.getDailyGoal().then(goalData => {
        if (goalData && goalData.goal) {
          setMacroGoals({
            protein: goalData.goal.protein,
            fats: goalData.goal.fats,
            carbs: goalData.goal.carbs,
            calories: goalData.goal.calories,
          });
        }
      });
    }
  }, [isAuthenticated, loginWithRedirect, api]);

  // Function to handle saving macro goals
  const saveMacroGoals = () => {
    api.setDailyGoal(macroGoals)
      .then(response => {
        if (response?.message && response.message.toLowerCase().includes("successfully")) {
          alert("Objetivos guardados exitosamente");
        } else {
          alert("Error al guardar los objetivos: " + (response?.message || "unknown error"));
        }
      })
      .catch(error => {
        alert("Error al guardar los objetivos: " + error.message);
      });
  };
  const savePreferences = () => {
    const selectedDiet = Object.keys(restrictions).find(key => restrictions[key] === true) || '';
    const intolerances = Object.keys(restrictions).filter(key => restrictions[key] === true);

    api.setPreferences({ diet: selectedDiet, intolerances })
      .then(response => {
        if (response?.message && response.message.toLowerCase().includes("successfully")) {
          alert("Preferencias guardadas exitosamente");
        } else {
          alert("Error al guardar las preferencias: " + (response?.message || "unknown error"));
        }
      })
      .catch(error => {
        alert("Error al guardar las preferencias: " + error.message);
      });
  };

  // Toggle restriction based on key
  const handleCheckboxChange = (key) => {
    setRestrictions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  
  return ( 
    <div className="generalContainer flex">
      <SideBar userName={{ Name: "Dafne", LastName: "Arriagada" }} />

      <div className="Container relative h-[1100px] grow bg-[#E5E9F0] p-[60px] z-[0]">
        
        <h1 className="text-3xl text-[#182F40] font-bold mt-[60px]">Bud te acompaña, tu decides ... <span className="text-7xl font-extralight">Preferencias Alimenticias</span></h1>

        <div className='flex grow flex-shrink-0 justify-evenly mt-[120px]'>
          <div className='flex flex-col'>
            <h3 className="text-3xl font-bold text-[#182F40] mb-[10px]">Bloquear alimentos</h3>
            <SearchBar/>
            </div>
            <div className="w-[300px] pl-[30px] text-xl text-[#182F40] leading-snug">
            Busca un <span className="font-bold">alimento que no te guste</span> y no lo incluiremos en tus recetas
          </div>
        </div>

        {/* Macronutrient Goals */}
        <div className="macrosContainer flex justify-around mt-[60px]">
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold text-[#182F40] mb-[10px]">Objetivos macronutricionales</h3>

            {/* Editable Input Fields for Macronutrient Goals */}
            <div className="flex flex-col space-y-3 text-2xl">
              <div className="flex items-center justify-between w-[300px]">
                <label className="font-bold text-[#5A5A5A]">Proteína:</label>
                <input 
                  type="number" 
                  value={macroGoals.protein} 
                  onChange={(e) => setMacroGoals({ ...macroGoals, protein: Number(e.target.value) })} 
                  className="w-[100px] p-2 border rounded text-right"
                /> g
              </div>
              <div className="flex items-center justify-between w-[300px]">
                <label className="font-bold text-[#5A5A5A]">Grasa:</label>
                <input 
                  type="number" 
                  value={macroGoals.fats} 
                  onChange={(e) => setMacroGoals({ ...macroGoals, fats: Number(e.target.value) })} 
                  className="w-[100px] p-2 border rounded text-right"
                /> g
              </div>
              <div className="flex items-center justify-between w-[300px]">
                <label className="font-bold text-[#5A5A5A]">Carbohidratos:</label>
                <input 
                  type="number" 
                  value={macroGoals.carbs} 
                  onChange={(e) => setMacroGoals({ ...macroGoals, carbs: Number(e.target.value) })} 
                  className="w-[100px] p-2 border rounded text-right"
                /> g
              </div>
              <div className="flex items-center justify-between w-[300px]">
                <label className="font-bold text-[#5A5A5A]">Calorías:</label>
                <input 
                  type="number" 
                  value={macroGoals.calories} 
                  onChange={(e) => setMacroGoals({ ...macroGoals, calories: Number(e.target.value) })} 
                  className="w-[100px] p-2 border rounded text-right"
                /> kcal
              </div>
            </div>

            <div className="h-[40px]"></div>
            <PurpleButton text="Guardar objetivos" onClick={saveMacroGoals}/>
          </div>

          {/* Dietary Restrictions */}
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold text-[#182F40] mb-[10px]">Restricciones alimentarias</h3>
            <div className="flex flex-col space-y-3 text-[#182F40]">
              {[
                { label: "Celíaco/a", key: "celiac" },
                { label: "Intolerante a la lactosa", key: "lactoseIntolerant" },
                { label: "Vegano/a", key: "vegan" },
                { label: "Vegetariano/a", key: "vegetarian" },
              ].map((restriction) => (
                <div key={restriction.key} className="flex items-center text-2xl">
                  <input
                    type="checkbox"
                    checked={restrictions[restriction.key]}
                    onChange={() => handleCheckboxChange(restriction.key)}
                    className="mr-3 w-6 h-6 rounded-full border-2 border-gray-400 cursor-pointer appearance-none 
                              checked:bg-[#5B467C] checked:border-[#5B467C] relative"
                    style={{
                      backgroundColor: restrictions[restriction.key] ? '#5B467C' : '#E7E7E7',
                    }}
                  />
                  <label>{restriction.label}</label>
                </div>
              ))}
            </div>

            {/* Save Preferences Button */}
            <PurpleButton text="Guardar preferencias" onClick={savePreferences} />

            {/* <PurpleButton text="Probar Obtener Recetas" onClick={testGetRecipes} /> */}
          </div>
        </div>

        {/* Decorative Background and Logo */}
        <img src="/images/ellipse-background.png" alt="decorative ellipse" className="absolute top-[50%] left-[50%] z-[-1]" />
        <img src="/images/logo-sin-texto.png" alt="logo" className="fixed bottom-[20px] right-[20px] w-[60px] h-[60px]" />
      </div>

      <NotificationLogOut />
    </div>
  );
}
