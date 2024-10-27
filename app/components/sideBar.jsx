
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import arrowLeft from '/images/arrow-left-circle.png';
import arrowRight from '/images/arrow-right-circle.png';
import { useNavigate } from '@remix-run/react';


export default function SideBar({ userName }) {

  const { logout } = useAuth0();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  }

  const navigate = useNavigate();


  const mouseEnteranimation = (e) => {
    e.target.style.color = "#D0BCFE"
  }

  const mouseLeaveanimation = (e) => {
    e.target.style.color = "#ffffff"
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Agregar el event listener
    window.addEventListener('resize', handleResize);

    // Llamar al handler inmediatamente para establecer el estado inicial
    handleResize();

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return ( <>
      
    <button
      className={`OpenOrHide absolute top-[30px] z-50 transform transition-all duration-300 ease-in-out
        ${isOpen ? 'left-[250px]' : 'left-[20px]'}
      `}
      onClick={toggleSideBar}
    >
      {isOpen ? (
        <img src={arrowLeft} alt="Hide side bar" />
      ) : (
        <img src={arrowRight} alt="Show side bar" />
      )}
    </button>

      <div
        className={`ContainerSideBar h-[1100px] bg-[#4C566A] flex-shrink-0 flex flex-col items-start pl-[30px] transform transition-all duration-300 ease-in-out
          ${isOpen ? 'w-[320px]' : 'w-[80px]'}
        `}
      >
      {isOpen ? 
      <>
      <div className="UserName-text text-2xl pt-[120px] text-white">{userName.Name}</div>
      <div className="UserLastName-text text-2xl text-white">{userName.LastName}</div>

      <div className="HorizontalWhiteLine w-[210px] mt-[10px] h-[3px] bg-[#ffffff]"></div>

      
      <button className="PantryConfig-text mt-[25px] text-white" 
      onMouseEnter={mouseEnteranimation} 
      onMouseLeave={mouseLeaveanimation}
      onClick={() => navigate("/pantry", {replace: true})}
      >
        Configuración despensa
        </button>
      <button className="RecipiesGenerator-text mt-[25px] text-white" 
      onMouseEnter={mouseEnteranimation} 
      onMouseLeave={mouseLeaveanimation}
      onClick={() => navigate("/recipies-generator", {replace: true})}
      >
      Generador de Recetas
      </button>
      
      <button 
        className="FoodRestrictions-text mt-[25px] text-white" 
        onMouseEnter={mouseEnteranimation} 
        onMouseLeave={mouseLeaveanimation}
        onClick={() => navigate("/dietary_preferences", {replace: true})}
      >
        Preferencias Alimenticias
      </button>

      <div className="UserName-text text-xl pt-[60px] text-white">Historiales</div>
      <div className="HorizontalWhiteLine w-[210px] mt-[10px] h-[3px] bg-[#ffffff]"></div>
      
      <button className="Macronutrients-text mt-[25px] text-white" 
      onMouseEnter={mouseEnteranimation} 
      onMouseLeave={mouseLeaveanimation}
      onClick={() => navigate("/history")}
      >Macronutrientes
      </button>
      <button className="IngestedFood-text mt-[25px] text-white" 
      onMouseEnter={mouseEnteranimation} 
      onMouseLeave={mouseLeaveanimation}
      onClick={() => navigate("/history")}
      >Alimentos Consumidos</button>

      <div className="Separator h-[200px]"></div> 

      <div className="FooterSideBar flex flex-col w-[235px] items-center mt-5 text-white">
        <button 
        className="FoodRestrictions-text mt-[25px] mb-[30px] text-white" 
        onMouseEnter={mouseEnteranimation} 
        onMouseLeave={mouseLeaveanimation}
        onClick={() => navigate("/homepage", {replace: true})}
        >
          Volver a Inicio
        </button>
        
        <button 
          className="CloseSesion-text" 
          onMouseEnter={mouseEnteranimation} 
          onMouseLeave={mouseLeaveanimation} 
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
          Cerrar Sesión
        </button>
        <div className="CloseSesion-text text-2xl mt-[30px] font-bold text-white">MealsBuddy</div>
        <div className="CloseSesion-text mt-[5px] mb-[40px] text-white">2024 ©</div>
      </div>

      </>
      : '' }
      
    </div>
  </>

);
}
