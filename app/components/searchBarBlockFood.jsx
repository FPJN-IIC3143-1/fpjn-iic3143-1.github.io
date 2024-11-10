import { useState } from 'react';

const INTOLERANCES_OPTIONS = [
  'Lácteos',
  'Huevo',
  'Gluten',
  'Grano',
  'Maní',
  'Mariscos',
  'Sésamo',
  'Moluscos',
  'Soya',
  'Sulfito',
  'Nueces de árbol',
  'Trigo'
];

export default function SearchBarBlockFood({ onSearch, selectedIntolerances, handleIntoleranceSelection }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    onSearch(query);
  };

  const handleOptionClick = (option) => {
    setSearchQuery(option); // Mostrar la opción seleccionada en la barra de búsqueda
    handleIntoleranceSelection(option); // Llamar al manejador de selección
  };

  const filteredOptions = INTOLERANCES_OPTIONS.filter((option) =>
    option.toLowerCase().includes(searchQuery) && !selectedIntolerances.includes(option)
  );

  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-[350px] h-[50px] p-[20px] pl-[55px] bg-[#ffffff] text-[#182F40] text-lg rounded-[15px] 
          focus:outline-none focus:shadow-lg focus:bg-[#D0BCFE] hover:bg-[#D0BCFE] placeholder:text-[#000000]"
        placeholder="Buscar..."
      />
      {searchQuery && filteredOptions.length > 0 && (
        <div className="absolute top-[60px] left-0 w-[350px] bg-white rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
          {filteredOptions.map((option) => (
            <div
              key={option}
              className={`p-2 cursor-pointer ${selectedIntolerances.includes(option) ? 'bg-[#D0BCFE]' : ''}`}
              role="button"
              tabIndex="0"
              aria-pressed={selectedIntolerances.includes(option)}
              onClick={() => handleOptionClick(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOptionClick(option);
                }
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}