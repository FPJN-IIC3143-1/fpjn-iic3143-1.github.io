
import SideBar from "../components/sideBar";
import NotificationLogOut from "../components/notificationLogOut";
import RecipeCard from "../components/recipeCard";

import ellipseBackground from '/images/ellipse-background.png';


export default function RecipiesList() {

  return (
    <div className="generalContainer flex">
      <SideBar userName={{ Name: "Dafne", LastName: "Arriagada" }} />
      <div className="ContainerBody relative h-[1100px] grow bg-[#E5E9F0] p-[60px] z-[0] overflow-y-hidden">
        <h1 className="text-3xl text-[#182F40] font-bold">Con hambre? busca una ... <span className="text-7xl font-extralight">Receta</span></h1>

        <div className="flex justify-center ">
        <div className='RecipeCardsContaine flex mt-[120px] w-[1200px] justify-around'>
          <RecipeCard N={1} recipeName={"Arroz con pollo al pesto"} leftRowInfo={["6g", "60g", "600g", "6000g"]} rightRowInfo={["Pollo", "Yogurt Natural", "Albahaca", "Queso parmesano president"]} />
          <RecipeCard N={2} recipeName={"Arroz con pollo al pesto"} leftRowInfo={["6g", "60g", "600g"]} rightRowInfo={["Pollo", "Yogurt Natural", "Albahaca"]} />
          <RecipeCard N={3} recipeName={"Arroz con pollo greco"} leftRowInfo={["7g", "200g", "540g", "2000g", "300g"]} rightRowInfo={["Pollo", "Yogurt Natural", "Jamón Serrano", "Queso parmesano president", "Nueces"]} />
        </div>
        </div>
        {/* Background images and Logo */}
        <img src={ellipseBackground} alt="elipse" className="absolute top-[-35%] left-[-10%] z-[-1]"/>
        <img src={ellipseBackground} alt="elipse" className="absolute top-[45%] left-[60%] z-[-1]"/>
        <img src="/images/logo-sin-texto.png" alt="logo" className="fixed bottom-[20px] right-[20px] w-[60px] h-[60px]" />
      </div>
      <NotificationLogOut />
    </div>
  );

}