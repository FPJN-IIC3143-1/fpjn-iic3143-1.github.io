
import searchBarIcon from '/images/search-bar-icon.png'

export default function SearchBar() {
  
  return( 
    <div className="relative">
      <img src={searchBarIcon} alt='search bar icon' className='absolute left-2 top-[6px] w-[40px] h-[40px]'></img>
      <input type="text" 
            className="w-[350px] h-[50px] p-[20px] pl-[55px] bg-[#ffffff] text-[#182F40] text-base rounded-[15px] focus:outline-none focus:shadow-lg transition-shadow focus:bg-[#D0BCFE]" 
            placeholder="Buscar..."
      />
    </div>
    );
}