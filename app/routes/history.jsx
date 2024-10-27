import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import SideBar from "../components/sideBar";
import DataCard from '../components/dataCard';
import NotificationLogOut from '../components/notificationLogOut';

export default function History() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

 
  return (
    <div className="flex">
      <SideBar userName={{ Name: "Dafne", LastName: "Arriagada" }} />

      <div className="relative h-screen grow bg-[#E5E9F0] p-10 z-[0]">
        
        {/* Page Header */}
        <h1 className="text-3xl text-[#182F40] font-bold">Tus secretos solo conocidos por los ... <span className="text-7xl font-extralight">Historiales</span></h1>


        {/* Macronutrients Section */}
        <div className="mt-[100px] flex items-center">
          <div className="text-4xl font-bold text-[#182F40] mr-[90px] mt-[20px]">
            Macro
            <p className="font-light">nutrientes</p>
          </div>
          {/* Labels */}
          <div className="text-lg text-[#182F40] mt-[35px]">
            <p>Proteína</p>
            <p>Grasa</p>
            <p>Carbohidratos</p>
            <p>Calorías</p>
          </div>
          {/* Macronutrient Cards */}
          <div className="flex grow justify-evenly max-w-[800px]">
            {[
              { label: "Esta semana", values: ["300g", "40g", "420g", "8300kcal"] },
              { label: "Semana pasada", values: ["570g", "110g", "820g", "12100kcal"] },
              { label: "Este mes", values: ["2.3kg", "340g", "2.4kg", "47030kcal"] },
            ].map((item, index) => (
              <div key={index} className='text-[#182F40] flex flex-col items-center font-bold'>
                <div className="text-lg font-bold mb-[10px]">{item.label}</div>
                <div className="flex flex-col items-center bg-[#A3BE8C] rounded-md text-center shadow-sm w-[100px] hover:shadow-md transition-shadow duration-200">
                <div className="text-sm pt-[20px] pb-[20px]">
                  {item.values.map((value, idx) => (
                    <p key={idx} className='pb-[5px]'>{value}</p>
                  ))}
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alimentos Consumidos Section */}
        <div className="mt-[100px] flex items-center h-[200px]">
          <div className="text-4xl font-bold text-[#182F40] mr-8 mt-[20px]">
            Alimentos
            <p className="font-light">consumidos</p>
          </div>
          {/* Macronutrient Cards */}
          <div className="flex grow justify-evenly max-w-[1000px]">
            {[
              { label: "Esta semana", leftInfo: ["0.5", "2", "400g", "230g", "20g"], rightInfo: ["Broccoli", "Tomates", "Vacuno", "Arroz", "Chía"] },
              { label: "Semana pasada", leftInfo: ["0.5", "2", "400g", "230g", "20g"], rightInfo: ["Broccoli", "Tomates", "Vacuno", "Arroz", "Chía"] },
              { label: "Este mes", leftInfo: ["0.5", "2", "400g", "230g", "20g"], rightInfo: ["Broccoli", "Tomates", "Vacuno", "Arroz", "Chía"] },
            ].map((item, index) => (
              <div key={index} className='flex flex-col items-center'>
                <div className="text-2xl mb-[10px] font-bold text-[#182F40]">{item.label}</div>
                  <DataCard boxWidth={220} leftRowInfo={item.leftInfo} rightRowInfo={item.rightInfo}/>
              </div>
            ))}
          </div>
        </div>


        {/* Decorative Background */}
        {/* <img src="/images/ellipse-background.png" alt="decorative ellipse" className="absolute top-[-10%] left-[-5%] w-1/4 z-[-1] opacity-40" /> */}
        
        {/* Logo */}
        <img src="/images/logo-sin-texto.png" alt="logo" className="fixed bottom-5 right-5 w-20 h-20 " />
      </div>
      <NotificationLogOut/>
    </div>
  );
}
