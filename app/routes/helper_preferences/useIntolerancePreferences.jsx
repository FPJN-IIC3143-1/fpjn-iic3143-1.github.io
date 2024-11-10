import { useState } from 'react';
import useApi from '../useApi';

export default function useIntolerancePreferences(initialIntolerances = []) {
  const [intolerances, setIntolerances] = useState(initialIntolerances);
  const api = useApi();

  const handleIntoleranceSelection = (intoleranceItem) => {
    setIntolerances((prevIntolerances) =>
      prevIntolerances.includes(intoleranceItem)
        ? prevIntolerances.filter((item) => item !== intoleranceItem)
        : [...prevIntolerances, intoleranceItem]
    );
  };

  // Function to save intolerance preferences
  const saveIntolerancePreferences = async (currentDiet) => {
    const dietString = Array.isArray(currentDiet) ? currentDiet.join(',') : currentDiet;

    try {
      const response = await api.setPreferences({ diet: dietString, intolerances });
      if (response?.message?.toLowerCase().includes("successfully")) {
        alert("Intolerance preferences saved successfully");
      } else {
        alert("Error saving intolerance preferences: " + (response?.message || "unknown error"));
      }
    } catch (error) {
      alert("Error saving intolerance preferences: " + error.message);
    }
  };

  return {
    intolerances,
    setIntolerances,
    handleIntoleranceSelection,
    saveIntolerancePreferences,
  };
}