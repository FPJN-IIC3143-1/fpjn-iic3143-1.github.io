import {
  // Links,
  // Meta,
  // Outlet,
  // Scripts,
  // ScrollRestoration,
} from "@remix-run/react";

import SideBar from "../components/sideBar"; 
import DataCard from "../components/dataCard";
import PurpleButton from "../components/purpleButton";
import NotificationLogOut from "../components/notificationLogOut";
import useApi from "./useApi";

export default function HomePage() { 
  useApi()
  return ( 
  <div className="generalContainer flex">

    <SideBar userName={{ Name: "Dafne", LastName: "Arriagada" }} />

    <div className="Container relative h-[1100px] grow bg-[#E5E9F0] p-[60px] z-[0]">
      <h1 className="text-4xl text-[#182F40]">Bienvenido/a, Dafne!</h1>

      {/*Data Cards*/}

      <div className="macros&pantryBox flex pt-[100px] justify-evenly">
        <div className="macrosBox flex flex-col items-center ">
          <div className="text-3xl text-[#182F40] font-bold pb-[5px]">Macros de hoy</div>
          <DataCard boxWidth={340} leftRowInfo={["80g", "200g", "50g", "2013kcal"]} rightRowInfo={["Proteínas", "Carbohidratos", "Grasas", "Calorías"]} />
          <div className="h-[20px]"></div>
          <PurpleButton text="Editar Macros"/>
        </div>
        <div className="pantryBox flex flex-col items-center ">
          <div className="text-3xl text-[#182F40] font-bold pb-[5px]">Estado despensa</div>
          <DataCard  boxWidth={340} leftRowInfo={["2", "1L", "500g", "300g"]} rightRowInfo={["Huevos", "Leche Descremada", "Arroz", "Vacuno"]} />
          <div className="h-[20px]"></div>
          <PurpleButton text="Editar Despensa"/>
        </div>
      </div>

        <div className="notificationsBox flex flex-col w-full items-center pt-[150px]">

          <div className="flex justify-start w-[830px]">
            <div className="text-3xl text-[#182F40] font-bold pb-[5px] pl-[50px]">Últimas notificaciones</div>
          </div>
          
          <div className="notificationsCard bg-[#A3BE8C] flex justify-center items-center h-[170px] rounded-[20px] text-[#182F40] w-[830px]">

            <div className="leftRow flex flex-col items-center font-bold pr-[40px] basis-1/5">
              {["09/09/2024", "07/09/2024", "07/09/2024", "07/09/2024"].map((leftInfo, index) => (
                <div key={index} className="leftItem mt-[5px] mb-[5px]">
                  {leftInfo}
                </div>
              ))}
            </div>

            <div className="rightRow flex flex-col items-start basis-3/5">
              {["Tus ingredientes frecuentes no están en tu despensa!", "No tienes pimiento!", "No hay yogurt para tus desayunos", "Se agotó el arroz en tu despensa!"].map((rightInfo, index) => (
                <div key={index} className="rightRow mt-[5px] mb-[5px]">
                  {rightInfo}
                </div>
              ))}
            </div>

          </div>

        </div>

      
      <img src="/images/ellipse-background.png" alt="elipse" className="absolute top-[50%] left-[50%] z-[-1]"/>

      <img src="/images/logo-sin-texto.png" alt="elipse" className="fixed top-[83%] left-[90%]"/>

      
    </div>
    <NotificationLogOut />
  </div>
);
}