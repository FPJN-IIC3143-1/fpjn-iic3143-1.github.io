import { useNavigate } from '@remix-run/react';
import RecipePopUp from './recipePopUp';

export default function RecipeCard({N, leftRowInfo, rightRowInfo}) {
  const navigate = useNavigate();
  

  const handleMakeRecipe = () => {
    navigate('./make-recipe');
  }


  return (
    <div className='recipe-card flex flex-col items-center'>
      <div className='title text-[#182F40] text-4xl font-bold'> Receta {N} </div>
      <div className='subtitle text-[#182F40] text-2xl w-[310px] text-center'>Arroz con pollo al pesto</div>


      <div className="container bg-[#A3BE8C] flex flex-col rounded-[20px] text-[#182F40] w-[320px] mt-[20px]">
        
        <div className="topContainer flex justify-center items-center pt-6 text-lg">
          <div className="leftRow flex flex-col items-center font-bold pr-[40px]">
            {leftRowInfo.map((leftInfo, index) => (
              <div key={index} className="leftItem mt-[5px] mb-[5px]">
                {leftInfo}
              </div>
            ))}
          </div>

          <div className="rightRow flex flex-col items-start">
            {rightRowInfo.map((rightInfo, index) => (
              <div key={index} className="rightRow mt-[5px] mb-[5px] w-[160px] items-start overflow-hidden whitespace-nowrap text-ellipsis">
                {rightInfo}
              </div>
            ))}
          </div>

        </div>
        
        <div className="botContainer flex flex-col justify-center items-center pb-6 pt-5">
          <RecipePopUp num={2} title={'Arroz con pollo a la mostaza'} 
              ingredients={['2 tazas de arroz', '4 muslos o pechugas de pollo', '1 cebolla', '1 pimiento rojo', '2 dientes de ajo', '1 zanahoria', '4 tazas de caldo de pollo', '1/2 taza de arvejas', 'Aceite', 'Sal y pimienta', 'Comino o curcuma (opcional)']} 
              steps={['Sazona el pollo con sal y pimienta, dóralo en una olla con poco aceite. Retira y reserva.', 'Sofríe cebolla, ajo, pimiento y zanahoria picados en la misma olla.', 'Agrega el arroz y mezcla bien.', 'Añade el caldo, arvejas y el pollo dorado. Ajusta la sal.', 'Cocina a fuego medio-bajo por 20 minutos, hasta que el arroz esté listo.']} 
              />
          <button className="RecipeButton bg-[#4F378B] hover:bg-[#7461AC] w-[220px] h-[50px] rounded-[16px] text-[#FFFFFF] hover:text-[#FFFFFF] mt-[20px]"
            onClick={handleMakeRecipe}>
            Hacer Receta
          </button>

        </div>
      </div>
    </div>
  )
}
