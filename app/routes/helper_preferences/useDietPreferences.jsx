import { useState } from 'react';
import useApi from '../useApi';

export default function useDietPreferences(initialDiet = []) {
  const [diet, setDiet] = useState(initialDiet);
  const api = useApi();

  const handleDietSelection = (dietItem) => {
    setDiet((prevDiet) =>
      prevDiet.includes(dietItem)
        ? prevDiet.filter((item) => item !== dietItem)
        : [...prevDiet, dietItem]
    );
  };

  const saveDietPreferences = async (currentIntolerances) => {
    const filteredDiet = diet.join(',');

    try {
      const response = await api.setPreferences({ diet: filteredDiet, intolerances: currentIntolerances });
      if (response?.message?.toLowerCase().includes("successfully")) {
        alert("Diet preferences saved successfully");
      } else {
        alert("Error saving diet preferences: " + (response?.message || "unknown error"));
      }
    } catch (error) {
      alert("Error saving diet preferences: " + error.message);
    }
  };

  return {
    diet,
    setDiet,
    handleDietSelection,
    saveDietPreferences,
  };
}