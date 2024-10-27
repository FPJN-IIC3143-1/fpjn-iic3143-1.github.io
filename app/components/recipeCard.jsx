import { useNavigate } from '@remix-run/react';
import RecipePopUp from './recipePopUp';

export default function RecipeCard({boxWidth, leftRowInfo, rightRowInfo}) {
  const navigate = useNavigate();
  

  const handleChooseRecipe = () => {
    navigate('./choose');
  }


  return (
    <div className="container bg-[#A3BE8C] flex flex-col justify-center rounded-[20px] text-[#182F40]"
          style={{ width: boxWidth }}>
      
      <div className="topContainer flex justify-center items-center pt-6">
        <div className="leftRow flex flex-col items-center font-bold pr-[40px]">
          {leftRowInfo.map((leftInfo, index) => (
            <div key={index} className="leftItem mt-[5px] mb-[5px]">
              {leftInfo}
            </div>
          ))}
        </div>

        <div className="rightRow flex flex-col items-start">
          {rightRowInfo.map((rightInfo, index) => (
            <div key={index} className="rightRow mt-[5px] mb-[5px]">
              {rightInfo}
            </div>
          ))}
        </div>

      </div>
      
      <div className="botContainer flex flex-col justify-center items-center pb-6 pt-5">
        <RecipePopUp num={2} title={'Arroz con pollo a la mostaza'} 
            ingredients={['2 tazas de arroz', '4 muslos o pechugas de pollo', '1 cebolla', '1 pimiento rojo', '2 dientes de ajo', '1 zanahoria', '4 tazas de caldo de pollo', '1/2 taza de arvejas', 'Aceite', 'Sal y pimienta', 'Comino o curcuma (opcional)']} 
            steps={['Sazona el pollo con sal y pimienta, dóralo en una olla con poco aceite. Retira y reserva.', 'Sofríe cebolla, ajo, pimiento y zanahoria picados en la misma olla.', 'Agrega el arroz y mezcla bien.', 'Añade el caldo, arvejas y el pollo dorado. Ajusta la sal.', 'Cocina a fuego medio-bajo por 20 minutos, hasta que el arroz esté listo.']} />
        <button className="RecipeButton bg-[#4F378B] hover:bg-[#D0BCFE] w-[200px] h-[50px] rounded-[16px] text-[#EADDFF] hover:text-[#381E72] mt-[10px]"
          onClick={handleChooseRecipe}>
          Elegir Receta
        </button>

      </div>
    </div>
  )
}
