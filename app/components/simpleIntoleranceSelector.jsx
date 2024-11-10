import { useState, useEffect } from 'react';

// List of intolerances
const INTOLERANCES_OPTIONS = [
  { label: "Lácteos", key: "dairy" },
  { label: "Gluten", key: "gluten" },
  { label: "Maní", key: "peanut" },
  { label: "Mariscos", key: "seafood" },
  { label: "Sésamo", key: "sesame" },
  { label: "Moluscos", key: "shellfish" },
  { label: "Soya", key: "soy" },
  { label: "Sulfito", key: "sulfite" },
  { label: "Nueces de árbol", key: "treeNut" },
  { label: "Trigo", key: "wheat" },
];

export default function SimpleIntoleranceSelector({ selectedIntolerances, handleIntoleranceSelection }) {
  const [localIntolerances, setLocalIntolerances] = useState(selectedIntolerances);

  useEffect(() => {
    setLocalIntolerances(selectedIntolerances);
  }, [selectedIntolerances]);

  const handleCheckboxChange = (key) => {
    const updatedIntolerances = localIntolerances.includes(key)
      ? localIntolerances.filter((item) => item !== key)
      : [...localIntolerances, key];

    setLocalIntolerances(updatedIntolerances);
    handleIntoleranceSelection(key); // Pass the change up
  };

  return (
    <div className="flex flex-col text-[#182F40] space-y-4">
      {INTOLERANCES_OPTIONS.map(({ label, key }) => (
        <div key={key} className="flex items-center text-xl">
          <input
            type="checkbox"
            checked={localIntolerances.includes(key)}
            onChange={() => handleCheckboxChange(key)}
            className="mr-4 w-6 h-6 rounded-full border-2 border-gray-400 cursor-pointer appearance-none 
                      checked:bg-[#5B467C] checked:border-[#5B467C] relative"
            style={{
              backgroundColor: localIntolerances.includes(key) ? '#5B467C' : '#E7E7E7',
            }}
          />
          <label className="cursor-pointer">{label}</label>
        </div>
      ))}
    </div>
  );
}