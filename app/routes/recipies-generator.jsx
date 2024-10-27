
import SideBar from "../components/sideBar";
import ProteinSlider from "../components/proteinSlider";
import SearchBar from "../components/searchBar";
import PurpleButton from "../components/purpleButton";
import DataCard from "../components/dataCard"
import NotificationLogOut from "../components/notificationLogOut";

import ellipseBackground from '/images/ellipse-background.png';


export default function RecipiesGenerator() {

  return (
    <div className="generalContainer flex">

      <SideBar userName={{ Name: "Dafne", LastName: "Arriagada" }} />

      <div className="ContainerBody relative h-[1100px] grow bg-[#E5E9F0] p-[60px] z-[0] overflow-y-hidden">
        {/* P - COMPONENTE NOTIS+LOG-OUT */}

        <h1 className="text-3xl text-[#182F40] font-bold">Con hambre? busca una ... <span className="text-7xl font-extralight">Receta</span></h1>

        <div className="slider&parragraph flex justify-evenly text-[#182F40] mt-[60px]">
          <div className="flex flex-col justify-between items-center">
            <ProteinSlider/>
            <PurpleButton text={"Solicita una receta"}/>
          </div>
          <p className="w-[300px] text-2xl">Te entregamos un listado de recetas que cumplen <span className="font-bold">casi perfectamente</span> tus requisitos</p>
        </div>

        <div className="flex justify-evenly text-[#182F40] mt-[100px]">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold mb-[15px]">Últimas recetas</div>
            <DataCard useHearts={true} boxWidth={470} leftRowInfo={["Almuerzo", "Desayuno", "Desayuno", "Cena"]} rightRowInfo={["Arroz con pollo al pesto", "Yogurt con semillas y frutas", "Smoothie rojo", "Ensalada de Quinoa"]} />
            <div className="h-[20px]"></div>
            <SearchBar/>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold mb-[15px]">Recetas favoritas</div>
            <DataCard useHearts={true} boxWidth={470} leftRowInfo={["Almuerzo", "Desayuno", "Desayuno", "Cena"]} rightRowInfo={["Arroz con pollo al pesto", "Yogurt con semillas y frutas", "Smoothie rojo", "Ensalada de Quinoa"]} />
            <div className="h-[20px]"></div>
            <SearchBar/>
          </div>
        </div>

       <img src={ellipseBackground} alt="elipse" className="absolute top-[-35%] left-[-10%] z-[-1]"/>
       <img src={ellipseBackground} alt="elipse" className="absolute top-[45%] left-[60%] z-[-1]"/>

      </div>
      <NotificationLogOut />
    </div>
  );

}