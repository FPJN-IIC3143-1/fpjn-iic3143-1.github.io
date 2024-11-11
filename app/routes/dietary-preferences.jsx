import { useEffect, useState } from 'react';
import SideBar from "../components/sideBar";
import PurpleButton from "../components/purpleButton";
import NotificationLogOut from "../components/notificationLogOut";
import { useAuth0 } from '@auth0/auth0-react';
import { useToken } from './tokenContext';
import useDietPreferences from './helper_preferences/useDietPreferences';
import useIntolerancePreferences from './helper_preferences/useIntolerancePreferences';
import useMacroGoals from './helper_preferences/useMacroGoals';
import useApi from './useApi';

export default function DietaryPreferences() { 
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const api = useApi();
  const { tokenReady } = useToken();

  const [isEditingMacros, setIsEditingMacros] = useState(false);
  const [isEditingDiet, setIsEditingDiet] = useState(false);
  const [isEditingIntolerances, setIsEditingIntolerances] = useState(false); // New state for intolerances edit mode
  const [dataFetched, setDataFetched] = useState(false);

  const { diet, setDiet, handleDietSelection, saveDietPreferences } = useDietPreferences();
  const { intolerances, setIntolerances, handleIntoleranceSelection, saveIntolerancePreferences } = useIntolerancePreferences();
  const { macroGoals, setMacroGoals, handleMacroChange, saveMacroGoals } = useMacroGoals();

  useEffect(() => { 
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    if (tokenReady && !dataFetched) {
      Promise.all([api.getDailyGoal(), api.getPreferences()])
        .then(([goalData, preferences]) => {
          handleMacroChange(goalData);
          if (preferences) {
            setDiet(preferences.diet ? preferences.diet.split(",") : []);
            setIntolerances(Array.isArray(preferences.intolerances) ? preferences.intolerances : []);
          }
        })
        .catch(error => console.error("Error fetching data:", error))
        .finally(() => setDataFetched(true));
    }
  }, [isAuthenticated, loginWithRedirect, tokenReady, dataFetched, handleMacroChange, setDiet, setIntolerances, api]);

  const saveMacroGoalsAndResetView = () => {
    saveMacroGoals().then(() => {
      setIsEditingMacros(false);
    });
  };

  const saveDietPreferencesAndResetView = () => {
    saveDietPreferences(intolerances).then(() => {
      setIsEditingDiet(false);
    });
  };

  const saveIntolerancesAndResetView = () => {
    saveIntolerancePreferences(diet).then(() => {
      setIsEditingIntolerances(false); // Reset edit mode for intolerances
    });
  };

  return (
    <div className="GeneralContainer flex">
      <SideBar userName={{ Name: "Dafne", LastName: "Arriagada" }} />

      <div className="Container relative h-[1100px] grow bg-[#E5E9F0] p-[60px] pl-[100px] z-[0]">
        <div className="text-3xl text-[#182F40] font-bold mt-[60px]">Bud te acompaña, tú decides...</div>
        <div className="text-7xl text-[#182F40] font-extralight">Preferencias Alimenticias</div>

        {/* Intolerances Section */}
        <div className="flex flex-col items-center mt-[40px]">
          <h3 className="text-3xl font-bold text-[#182F40] mb-[30px]">Bloquear alimentos</h3>
          <div className="grid grid-cols-4 gap-4 text-[#182F40] mb-[40px]">
            {[
              "Lácteos", "Huevo", "Gluten", "Grano", "Maní", 
              "Mariscos", "Sésamo", "Moluscos", "Soya", "Sulfito", 
              "Nueces de árbol", "Trigo"
            ].map((intolerance) => (
              <div key={intolerance} className="flex items-center text-xl">
                <input
                  type="checkbox"
                  checked={intolerances.includes(intolerance)}
                  onChange={() => handleIntoleranceSelection(intolerance)}
                  disabled={!isEditingIntolerances} // Disable checkbox when not in edit mode
                  className="mr-4 w-6 h-6 rounded-full border-2 border-gray-400 cursor-pointer appearance-none 
                            checked:bg-[#5B467C] checked:border-[#5B467C] relative"
                  style={{
                    backgroundColor: intolerances.includes(intolerance) ? '#5B467C' : '#E7E7E7',
                  }}
                />
                <label className="cursor-pointer">{intolerance}</label>
              </div>
            ))}
          </div>
          {isEditingIntolerances ? (
            <PurpleButton text="Guardar intolerancias" onClick={saveIntolerancesAndResetView} />
          ) : (
            <PurpleButton text="Editar intolerancias" onClick={() => setIsEditingIntolerances(true)} />
          )}
        </div>

        <div className="BottomHorizontalContainer flex justify-evenly mt-[80px] flex-wrap">
          
          {/* Diet Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold text-[#182F40] mb-[20px]">Dieta Preferida</h3>
            <div className="flex flex-col text-[#182F40] space-y-4 mb-[40px]">
              {[
                { label: "Celíaco/a", key: "celiac" },
                { label: "Vegano/a", key: "vegan" },
                { label: "Pescetariano/a", key: "pescetarian" },
                { label: "Vegetariano/a", key: "vegetarian" },
              ].map((restriction) => (
                <div key={restriction.key} className="flex items-center text-xl">
                  {isEditingDiet ? ( 
                    <input
                      type="checkbox"
                      checked={diet.includes(restriction.key)}
                      onChange={() => handleDietSelection(restriction.key)}
                      className="mr-4 w-6 h-6 rounded-full border-2 border-gray-400 cursor-pointer appearance-none 
                                checked:bg-[#5B467C] checked:border-[#5B467C] relative"
                      style={{
                        backgroundColor: diet.includes(restriction.key) ? '#5B467C' : '#E7E7E7',
                      }}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      checked={diet.includes(restriction.key)}
                      onChange={() => handleDietSelection(restriction.key)}
                      disabled
                      className="mr-4 w-6 h-6 rounded-full border-2 border-gray-400 cursor-not-allowed appearance-none 
                                checked:bg-[#5B467C] checked:border-[#5B467C] relative"
                      style={{
                        backgroundColor: diet.includes(restriction.key) ? '#5B467C' : '#E7E7E7',
                      }}
                    />
                  )}
                  <label className="cursor-pointer">{restriction.label}</label>
                </div>
              ))}
            </div>
            {isEditingDiet ? 
              <PurpleButton text="Guardar dieta" onClick={saveDietPreferencesAndResetView} />
              : 
              <PurpleButton text="Editar dieta" onClick={() => setIsEditingDiet(!isEditingDiet)} />
            }
          </div>

          {/* Macros Section */}
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-[#182F40] mb-[30px]">Objetivos Diarios</div>
            <div className="MacrosFields flex flex-col text-xl text-[#182F40] mb-[40px]">
              {Object.keys(macroGoals).map((macro) => (
                <div key={macro} className="MacroFieldContainer flex items-center justify-between w-[250px] mb-[8px]">
                  <div className="MacroFieldLabel text-[#182F40] capitalize">
                    {macro === "calories" ? "Calorías" : macro.charAt(0).toUpperCase() + macro.slice(1)}
                  </div>
                  {isEditingMacros ? (
                    <input
                      type="number"
                      min="0"
                      name={macro}
                      value={macroGoals[macro]}
                      onChange={(e) => setMacroGoals({ ...macroGoals, [macro]: e.target.value })}
                      className="w-[80px] pr-[10px] rounded-[10px] text-right text-lg bg-[#ffffff] focus:outline-none focus:shadow-lg focus:bg-[#D0BCFE] hover:bg-[#D0BCFE]"
                    />
                  ) : (
                    <div className="MacroFieldValue text-lg font-bold">
                      {macro === "calories" ? `${macroGoals[macro]} kcal` : `${macroGoals[macro]}g`}
                    </div>
                  )}
                </div>
              ))}
            </div> 
            {isEditingMacros ? 
              <PurpleButton text="Guardar objetivos" onClick={saveMacroGoalsAndResetView} />
              : 
              <PurpleButton text="Editar objetivos" onClick={() => setIsEditingMacros(!isEditingMacros)} />
            }
          </div>
        </div>
      </div>

      <NotificationLogOut />
    </div>
  );
}