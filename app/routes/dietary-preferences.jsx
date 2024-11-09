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

  const [isEditingMacros, setIsEditingMacros] = useState(false);

  const setEditingMacros = () => {
    setIsEditingMacros(!isEditingMacros);
  }

  // toDO: esto debe ser una consulta a back!
  const [macroGoals, setMacroGoals] = useState({
    protein: 0,
    fats: 0,
    carbs: 0,
    calories: 0,
  });

  const [restrictions, setRestrictions] = useState({
    celiac: false,
    lactoseIntolerant: true,
    vegan: false,
    vegetarian: false,
  });

  const handleMacroChange = (goalData) => {
    console.log("Goal data:", goalData);
    setMacroGoals({
      protein: goalData.goal.protein,
      fats: goalData.goal.fats,
      carbs: goalData.goal.carbs,
      calories: goalData.goal.calories,
    })
  }
  
  useEffect(() => { // call the api to get the user's preferences and daily goals
    console.log("Use Effect:");
    if (!isAuthenticated) {
      loginWithRedirect();
      console.log("No autenticado:");
    } else if (api.tokenReady) {
      console.log("Autenticado");


      api.getRecipes().then((recipes) => {
        console.log("Recipes:", recipes);
      });
      
      // CUÁL ES EL VALOR DE ESTO??
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
          handleMacroChange(goalData);
          // NUNCA SE EJECUTA!
          console.log("Daily goal data:", goalData);
        }
      });
    }
  }, [isAuthenticated, loginWithRedirect, api]);


  const saveMacroGoalsAndResetView = () => {
    // 1. Send the new macro goals to the backend
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
    // 2. Reset the view
    setEditingMacros();
  };


  // Toggle restriction based on key
  const handleCheckboxChange = (key) => {
    setRestrictions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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


  
  return ( 
    <div className="GeneralContainer flex">
      <SideBar userName={{ Name: "Dafne", LastName: "Arriagada" }} />

      <div className="Container relative h-[1100px] grow bg-[#E5E9F0] p-[60px] pl-[100px] z-[0]">
        
        <div className="text-3xl text-[#182F40] font-bold mt-[60px]">Bud te acompaña, tu decides ...</div>
        <div className="text-7xl text-[#182F40] font-extralight">Preferencias Alimenticias</div>

        <div className='TopHorizontalContainer flex grow flex-shrink-0 justify-around mt-[100px] flex-wrap'>
          <div className='flex flex-col'>
            <h3 className="text-3xl font-bold text-[#182F40] mb-[30px]">Bloquear alimentos</h3>
            <SearchBar/>
          </div>
          <div className="w-[340px] pl-[30px] text-2xl text-[#182F40] mt-[20px] ">
            Busca un <span className="font-bold">alimento que no te guste</span> y no lo incluiremos en tus recetas
          </div>
        </div>

        <div className="BottomHorizontalContainer flex justify-evenly mt-[80px] flex-wrap">
          {/* Macronutrient Goals */}
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-[#182F40] mb-[30px]">Objetivos Diarios</div>
            <div className="MacrosFields flex flex-col text-xl text-[#182F40] mb-[40px]">

              <div className="ProteinFieldContainer flex items-center justify-between w-[200px] ">
              { isEditingMacros ?
                    <div className="flex">
                      <input  
                        type="number"
                        min="0" 
                        value={macroGoals.protein} 
                        onChange={(userInput) => setMacroGoals({ ...macroGoals, protein: Number(userInput.target.value) })} 
                        className="w-[80px] pt-[5px] pb-[7px] pr-[10px] rounded-[10px] text-right text-lg bg-[#ffffff]
                        focus:outline-none focus:shadow-lg focus:bg-[#D0BCFE] hover:bg-[#D0BCFE]"
                        />
                        <div className="mt-[6px] ml-[5px]">g</div>
                    </div>
                    :
                    <div className="ProteinValue text-lg text-[#182F40] font-bold"> {macroGoals.protein}g</div>
                  }
                <div className="ProteinFieldText text-[#182F40]">Proteína</div>
              </div>
            </div>
            { isEditingMacros ?
            <PurpleButton text="Guardar objetivos" onClick={saveMacroGoalsAndResetView}/>
            : 
            <PurpleButton text="Editar objetivos" onClick={setEditingMacros}/>
            }
          </div>


          {/* Dietary Restrictions */}
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold text-[#182F40] mb-[30px]">Restricciones alimentarias</h3>
            <div className="flex flex-col text-[#182F40]">
              {[
                { label: "Celíaco/a", key: "celiac" },
                { label: "Intolerante a la lactosa", key: "lactoseIntolerant" },
                { label: "Vegano/a", key: "vegan" },
                { label: "Vegetariano/a", key: "vegetarian" },
              ].map((restriction) => (
                <div key={restriction.key} className="flex items-center text-xl mb-[15px]">
                  <input
                    type="checkbox"
                    checked={restrictions[restriction.key]}
                    onChange={() => handleCheckboxChange(restriction.key)}
                    className="mr-[20px] w-[30px] h-[30px] rounded-full cursor-pointer appearance-none relative"
                    style={{
                      backgroundColor: restrictions[restriction.key] ? '#5B467C' : '#D0BCFE',
                    }}
                  />
                  <label>{restriction.label}</label>
                </div>
              ))}
            </div>

            <div className='spacer h-[25px]'></div>
            <PurpleButton text="Guardar preferencias" onClick={savePreferences}/>
          </div>
        </div>

        {/* Decorative Background and Logo */}
        <img src="/images/ellipse-left-background.png" alt="decorative ellipse" className="absolute top-[75%] left-[-7%] z-[-1]" />
        <img src="/images/logo-sin-texto.png" alt="logo" className="fixed bottom-[20px] right-[20px] w-[60px] h-[60px]" />
      </div>

      <NotificationLogOut />
    </div>
  );
}
