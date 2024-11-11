import { useState } from 'react';
import useApi from '../useApi';

export default function useMacroGoals(initialGoals = { protein: "0", carbs: "0", fats: "0", calories: "0" }) {
  const [macroGoals, setMacroGoals] = useState(initialGoals);
  const api = useApi();

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

  const saveMacroGoals = async () => {
    try {
      const response = await api.setDailyGoal(macroGoals);
      if (response?.message?.toLowerCase().includes("successfully")) {
        alert("Macro goals saved successfully");
      } else {
        alert("Error saving macro goals: " + (response?.message || "unknown error"));
      }
    } catch (error) {
      alert("Error saving macro goals: " + error.message);
    }
  };

  return {
    macroGoals,
    setMacroGoals,
    handleMacroChange,
    saveMacroGoals,
  };
}