import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from 'react';
import arrowLeft from '/images/arrow-left-circle.png';
import arrowRight from '/images/arrow-right-circle.png';
import { useNavigate } from '@remix-run/react';
import useApi from '../routes/useApi';
import ExportHistoryButton from './exportHistoryButton';
import ImportDataButton from './importDataButton';

export default function SideBar() {
  const { logout, user } = useAuth0(); // Access Auth0 user object
  const [isOpen, setIsOpen] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [redirectUrl, setRedirectUrl] = useState(null);
  const api = useApi();
  const navigate = useNavigate();

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const mouseEnteranimation = (e) => {
    e.target.style.color = "#D0BCFE";
  };

  const mouseLeaveanimation = (e) => {
    e.target.style.color = "#ffffff";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePayment = async () => {
    try {
      const response = await api.transbankPayment();
      if (response) {
        setRedirectUrl(response);
        window.location.href = response;
      } else {
        alert("No se pudo procesar el pago.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <>
      <button
        className={`OpenOrHide absolute top-[30px] z-50 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'left-[250px]' : 'left-[20px]'
        }`}
        onClick={toggleSideBar}
      >
        {isOpen ? (
          <img src={arrowLeft} alt="Hide side bar" />
        ) : (
          <img src={arrowRight} alt="Show side bar" />
        )}
      </button>

      <div
        className={`ContainerSideBar h-[1100px] bg-[#4C566A] flex-shrink-0 flex flex-col items-start pl-[30px] transform transition-all duration-300 ease-in-out ${
          isOpen ? 'w-[320px]' : 'w-[80px]'
        }`}
      >
        {isOpen && (
          <>
            <div className="UserName-text text-2xl pt-[120px] text-white">
              {user ? user.given_name : "Cargando..."}
            </div>
          
            <div className="HorizontalWhiteLine w-[210px] mt-[10px] h-[3px] bg-[#ffffff]"></div>

            <button
              className="PantryConfig-text mt-[25px] text-white"
              onMouseEnter={mouseEnteranimation}
              onMouseLeave={mouseLeaveanimation}
              onClick={() => navigate("/pantry", { replace: true })}
            >
              Configuración despensa
            </button>
            <button
              className="RecipiesGenerator-text mt-[25px] text-white"
              onMouseEnter={mouseEnteranimation}
              onMouseLeave={mouseLeaveanimation}
              onClick={() => navigate("/recipes-generator", { replace: true })}
            >
              Generador de Recetas
            </button>

            <button
              className="FoodRestrictions-text mt-[25px] text-white"
              onMouseEnter={mouseEnteranimation}
              onMouseLeave={mouseLeaveanimation}
              onClick={() => navigate("/dietary-preferences", { replace: true })}
            >
              Preferencias Alimenticias
            </button>

            <button
              className="PaymentButton mt-[25px] text-white"
              onMouseEnter={mouseEnteranimation}
              onMouseLeave={mouseLeaveanimation}
              onClick={handlePayment}
            >
              Pagar Suscripción
            </button>

            <div className="UserName-text text-xl pt-[60px] text-white">
              Historiales
            </div>
            <div className="HorizontalWhiteLine w-[210px] mt-[10px] h-[3px] bg-[#ffffff]"></div>

            <button
              className="Macronutrients-text mt-[25px] text-white"
              onMouseEnter={mouseEnteranimation}
              onMouseLeave={mouseLeaveanimation}
              onClick={() => navigate("/history")}
            >
              Macronutrientes
            </button>

            <button
              className="IngestedFood-text mt-[25px] text-white"
              onMouseEnter={mouseEnteranimation}
              onMouseLeave={mouseLeaveanimation}
              onClick={() => navigate("/history")}
            >
              Alimentos Consumidos
            </button>
            
            <ExportHistoryButton />
            <ImportDataButton />

            <div className="Separator h-[200px]"></div>

            <div className="FooterSideBar flex flex-col w-[235px] items-center mt-5 text-white">
              <button
                className="FoodRestrictions-text mt-[25px] mb-[20px] text-white"
                onMouseEnter={mouseEnteranimation}
                onMouseLeave={mouseLeaveanimation}
                onClick={() => navigate("/homepage", { replace: true })}
              >
                Volver a Inicio
              </button>

              <button
                className="CloseSesion-text"
                onMouseEnter={mouseEnteranimation}
                onMouseLeave={mouseLeaveanimation}
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  })
                }
              >
                Cerrar Sesión
              </button>
              <div className="CloseSesion-text text-2xl mt-[30px] font-bold text-white">
                MealsBuddy
              </div>
              <div className="CloseSesion-text mt-[5px] mb-[40px] text-white">
                2024 ©
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}