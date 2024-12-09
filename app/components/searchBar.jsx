import searchBarIcon from '/images/search-bar-icon.png'

export default function SearchBar({ onSearch = () => {} }) {
  return( 
    <div data-testid="search-bar-container" className="relative">
      <img 
        data-testid="search-bar-icon"
        src={searchBarIcon} 
        alt='search bar icon' 
        className='absolute left-2 top-[6px] w-[40px] h-[40px]'
      />
      <input 
        data-testid="search-bar-input"
        type="text" 
        className="w-[350px] h-[50px] p-[20px] pl-[55px] bg-[#ffffff] text-[#182F40] text-lg rounded-[15px] 
        focus:outline-none focus:shadow-lg focus:bg-[#D0BCFE] hover:bg-[#D0BCFE] placeholder:text-[#000000]" 
        placeholder="Buscar..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
