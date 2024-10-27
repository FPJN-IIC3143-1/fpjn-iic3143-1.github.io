import { useAuth0 } from '@auth0/auth0-react';
import LandingButton from "../components/landingButton";

export const meta = () => {
  return [
    { title: "MealsBuddy" },
    { name: "MealsBuddy", content: "Bienvenido/a a MealsBuddy!" },
  ];
};

export default function Index() { 
  const { loginWithRedirect, } = useAuth0();
  

  return ( 
    <div className="Background relative bg-[#E5E9F0] w-screen h-[1100px] pt-[100px] pl-[60px] pr-[60px] z-[1]">
      {/* Texto principal */}
      <div className="text-9xl font-bold text-[#182F40] max-w-[1360px]"> 
        Asesorate con el mejor* food-tracker del mercado.
      </div> 
      <div className="text-4xl text-[#182F40] pt-[15px]"> 
        *Según nosotros, porque sí, la ocupamos. 
      </div>
    
      {/* Botones */}
      <div className="flex justify-start items-center space-x-[50px] pt-[40px]"> 
            <LandingButton 
              bgColor="#4F378B" 
              textColor="#EADDFF" 
              boxWidth={428} 
              text="Regístrate" 
              onClick={() => {
                loginWithRedirect({ screen_hint: 'signup' });
              }}
            />
            <LandingButton 
              bgColor="#CCC2DC" 
              textColor="#381E72" 
              boxWidth={319} 
              text="Iniciar Sesión" 
              onClick={() => {
                loginWithRedirect();
              }}
            />
         
      </div>

      {/* Círculos morados en el fondo */}
      <img src="/images/ellipse-landingpage.png" alt="elipse" className="fixed top-[10%] left-[80%] z-[-10]"/>
      <img src="/images/ellipse-landingpage.png" alt="elipse" className="fixed top-[35%] left-[70%] z-[-10]"/>
      <img src="/images/ellipse-landingpage.png" alt="elipse" className="fixed top-[40%] left-[90%] z-[-10]"/>
      <img src="/images/ellipse-landingpage.png" alt="elipse" className="fixed top-[55%] left-[65%] z-[-10]"/>

      {/* Círculo grande */}
      <img src="/images/gran-ellipse-landing.png" alt="elipse" className="fixed top-[7y%] right-[0%] z-[-10]"/>
    </div>
  );
}