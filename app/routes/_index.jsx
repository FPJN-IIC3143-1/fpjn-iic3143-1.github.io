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
  const signupUrl = `https://dev-wflfbqz11clqgo3r.us.auth0.com/authorize?client_id=ieG8oeU4dp2vfgkCYXeA7bfT6QRJUf8t&redirect_uri=http://localhost:5173/homepage&scope=openid%20profile%20email&response_type=code&screen_hint=signup&prompt=login`;
  

  return ( 
    <div className="Background relative bg-[#E5E9F0] w-screen h-[1100px] pt-[60px] pl-[60px] pr-[60px] z-[1]">
      {/* Texto principal */}
      <div className="text-9xl font-bold text-[#182F40] max-w-[1360px]"> 
        Asesorate con el mejor* food-tracker del mercado.
      </div> 
      <div className="text-4xl text-[#182F40]"> 
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
                window.location.href = signupUrl;
              }}
            />
            <LandingButton 
              bgColor="#F5F2F8" 
              textColor="#381E72" 
              boxWidth={319} 
              text="Iniciar Sesión" 
              onClick={() => {
                loginWithRedirect({
                  prompt: 'login'
                });
              }}
            />
         
      </div>

      <div className="pt-[150px]">
        <img src="/images/logo-con-titulo.png" alt="logo"/>
      </div>

      {/* Círculos morados en el fondo */}
      <img src="/images/ellipse-landingpage.png" alt="elipse" className="fixed top-[10%] left-[80%] z-[-10]"/>
      <img src="/images/ellipse-landingpage.png" alt="elipse" className="fixed top-[35%] left-[70%] z-[-10]"/>
      <img src="/images/ellipse-landingpage.png" alt="elipse" className="fixed top-[40%] left-[90%] z-[-10]"/>
      <img src="/images/ellipse-landingpage.png" alt="elipse" className="fixed top-[55%] left-[65%] z-[-10]"/>
      <img src="/images/ellipse-landingpage.png" alt="elipse" className="fixed top-[75%] left-[50%] z-[-10]"/>
      <img src="/images/ellipse-landingpage.png" alt="elipse" className="fixed top-[65%] left-[75%] z-[-10]"/>
      {/* Círculo grande */}
      {/* <img src="/images/gran-ellipse-landing.png" alt="elipse" className="fixed top-[70%] right-[0%] z-[-10]"/> */}

    </div>
  );
}