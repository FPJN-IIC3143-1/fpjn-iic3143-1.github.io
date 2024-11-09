import { useEffect, useState } from 'react';
import SideBar from "../components/sideBar";
import PurpleButton from "../components/purpleButton";
import NotificationLogOut from "../components/notificationLogOut";
import { useAuth0 } from '@auth0/auth0-react';
import useApi from './useApi';
import { useToken } from './tokenContext';

export default function DietaryPreferences() { 
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const api = useApi();
  const { tokenReady } = useToken();

  const [isEditingMacros, setIsEditingMacros] = useState(false);
  const [macroGoals, setMacroGoals] = useState({
    protein: "0",
    carbs: "0",
    fats: "0",
    calories: "0",
  });

  const [restrictions, setRestrictions] = useState({
    diet: "",
    intolerances: []
  });

  const [dataFetched, setDataFetched] = useState(false);

  const handleMacroChange = (goalData) => {
    if (goalData && goalData.goal) {
      setMacroGoals({
        protein: String(goalData.goal.protein || 0),
        carbs: String(goalData.goal.carbs || 0),
        fats: String(goalData.goal.fats || 0),
        calories: String(goalData.goal.calories || 0),
      });
    } else {
      console.log("No goal data found in response");
    }
  };

  const handlePreferencesChange = (preferences) => {
    if (preferences) {
      setRestrictions({
        diet: preferences.diet || "",
        intolerances: preferences.intolerances || []
      });
    }
  };

  const handleCheckboxChange = (key) => {
    setRestrictions((prevRestrictions) => {
      const updatedIntolerances = prevRestrictions.intolerances.includes(key)
        ? prevRestrictions.intolerances.filter((item) => item !== key)
        : [...prevRestrictions.intolerances, key];
      return { ...prevRestrictions, intolerances: updatedIntolerances };
    });
  };
  
  useEffect(() => { 
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    if (tokenReady && !dataFetched) {
      console.log("Token is ready, fetching data...");
      
      Promise.all([api.getDailyGoal(), api.getPreferences()])
        .then(([goalData, preferences]) => {
          console.log("Fetched daily goal:", goalData);
          console.log("Fetched preferences:", preferences);

          handleMacroChange(goalData);
          handlePreferencesChange(preferences);
        })
        .catch(error => {
          console.error("Error fetching data:", error.message);
        });

      setDataFetched(true);
    }
  }, [isAuthenticated, loginWithRedirect, tokenReady, dataFetched]);

  const saveMacroGoalsAndResetView = () => {
    api.setDailyGoal(macroGoals)
      .then(response => {
        if (response?.message && response.message.toLowerCase().includes("successfully")) {
          alert("Objetivos guardados exitosamente");
          api.getDailyGoal().then(handleMacroChange);
        } else {
          alert("Error al guardar los objetivos: " + (response?.message || "unknown error"));
        }
      })
      .catch(error => {
        alert("Error al guardar los objetivos: " + error.message);
      });

    setIsEditingMacros(!isEditingMacros);
  };

  const savePreferences = () => {
    api.setPreferences({
      diet: restrictions.diet,
      intolerances: restrictions.intolerances
    })
      .then(response => {
        if (response?.message && response.message.toLowerCase().includes("successfully")) {
          alert("Preferencias guardadas exitosamente");
          api.getPreferences().then(handlePreferencesChange);
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
          </div>
          <div className="w-[340px] pl-[30px] text-2xl text-[#182F40] mt-[20px]">
            Busca un <span className="font-bold">alimento que no te guste</span> y no lo incluiremos en tus recetas
          </div>
        </div>

        <div className="BottomHorizontalContainer flex justify-evenly mt-[80px] flex-wrap">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-[#182F40] mb-[30px]">Objetivos Diarios</div>
            <div className="MacrosFields flex flex-col text-xl text-[#182F40] mb-[40px]">
              {["protein", "carbs", "fats", "calories"].map((macro) => (
                <div key={macro} className="MacroFieldContainer flex items-center justify-between w-[250px] mb-[10px]">
                  <div className="MacroFieldLabel text-[#182F40] capitalize">
                    {macro === "carbs" ? "Carbohidratos" : macro.charAt(0).toUpperCase() + macro.slice(1)}
                  </div>
                  {isEditingMacros ? (
                    <input
                      type="number"
                      min="0"
                      name={macro}
                      value={macroGoals[macro]}
                      onChange={(e) => setMacroGoals({ ...macroGoals, [macro]: e.target.value })}
                      className="w-[80px] pt-[5px] pb-[7px] pr-[10px] rounded-[10px] text-right text-lg bg-[#ffffff]"
                    />
                  ) : (
                    <div className="MacroFieldValue text-lg font-bold">
                      {macroGoals[macro]}g
                    </div>
                  )}
                </div>
              ))}
            </div>
            <PurpleButton text={isEditingMacros ? "Guardar objetivos" : "Editar objetivos"} onClick={saveMacroGoalsAndResetView} />
          </div>

          {/* Dietary Restrictions */}
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold text-[#182F40] mb-[20px]">Restricciones alimentarias</h3>
            <div className="flex flex-col text-[#182F40] space-y-4">
              {[
                { label: "Celíaco/a", key: "celiac" },
                { label: "Intolerante a la lactosa", key: "lactoseIntolerant" },
                { label: "Vegano/a", key: "vegan" },
                { label: "Vegetariano/a", key: "vegetarian" },
              ].map((restriction) => (
                <div key={restriction.key} className="flex items-center text-2xl">
                  <input
                    type="checkbox"
                    checked={restrictions.intolerances.includes(restriction.key)}
                    onChange={() => handleCheckboxChange(restriction.key)}
                    className="mr-4 w-6 h-6 rounded-full border-2 border-gray-400 cursor-pointer appearance-none 
                              checked:bg-[#5B467C] checked:border-[#5B467C] relative"
                    style={{
                      backgroundColor: restrictions.intolerances.includes(restriction.key) ? '#5B467C' : '#E7E7E7',
                    }}
                  />
                  <label className="cursor-pointer">{restriction.label}</label>
                </div>
              ))}
            </div>
            <PurpleButton text="Guardar preferencias" onClick={savePreferences} className="mt-5" />
          </div>
        </div>
      </div>

      <NotificationLogOut />
    </div>
  );
}