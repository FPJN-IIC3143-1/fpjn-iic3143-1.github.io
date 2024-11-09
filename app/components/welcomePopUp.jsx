import { useState } from 'react';
import CreditCardInput from './creditCardInput'; 

export default function WelcomePopUp() {
  // WelcomePopUp Component with a form to collect user's name, last name and credit card information
      // The form works for any screen size and should have the following fields:
  const userEmail = "mealsbuddy@gmail.com"; // TODO: Replace with the actual user's email
  const [isVisible, setIsVisible] = useState(true);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  const handleCardInfoChange = (newCardInfo) => {
    setCardInfo(newCardInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name: ${name}, Last Name: ${lastName}`);
    console.log(cardInfo);
    // Handle form submission logic here
  };

  const handleOpenPopUp = () => {
    setIsVisible(true);
  };

  const handleClosePopUp = () => {
    setIsVisible(false);
  };

  return (
    <>
      <button className="WelcomeButton bg-[#4F378B] hover:bg-[#D0BCFE] w-[220px] h-[53px] rounded-[16px] text-[#EADDFF] hover:text-[#381E72]"
        onClick={handleOpenPopUp}>
        Open Welcome PopUp
      </button>

      {isVisible && (
        <div id="WelcomePopUpContainer" className="WelcomePopUpContainer bg-gray-900 bg-opacity-50 w-full h-full rounded-[20px] m-[2px]
          flex absolute top-0 right-0 left-0 bottom-0 transition-all duration-100 ease-in">
          <div className="WelcomePopUp flex relative justify-center items-center bg-[#4F378B] w-[600px] h-[90%] rounded-[20px] m-auto p-10">
            <div className="WelcomePopUpHeader flex justify-between items-center w-full absolute top-0 left-0 p-5 bg-[#4F378B] rounded-t-[20px]">
              <div className="text-xl text-gray-100 font-bold font-serif">Bienvenido/a MealsBuddy!</div>
              <button className="CloseButton 
                bg-[#381E72] w-[30px] h-[30px] rounded-[50%] text-[#EADDFF] hover:bg-[#EADDFF] hover:text-[#4F378B] font-bold"
                onClick={handleClosePopUp}> X </button>
            </div>
            <div className="WelcomePopUpContent flex flex-col justify-start items-left w-full h-full mt-20 overflow-y-auto">
              <div className="text-gray-300 text-2xl text-gray-150 ">Te damos la bienvenida a tu asistente nutricional virtual.</div>
              <div className="text-gray-300 text-xl text-gray-150 ">Aquí podrás planificar tus comidas, ver recetas, manejar tu despensa y mucho más!</div>
              <div className="text-gray-300 text-xl text-gray-150 ">Para comenzar, por favor completa tus datos:</div>
              <form onSubmit={handleSubmit} className="flex flex-col w-full">
                <label className="text-gray-300 mt-2 mr-2">
                  Email:
                  <input type="text" value={userEmail} readOnly placeholder={userEmail} className="w-full mt-1 p-2 rounded bg-gray-600" />
                </label>
                <label className="text-gray-300 mt-2 mr-2">
                  Nombre:
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full mt-1 p-2 rounded" />
                </label>
                <label className="text-gray-300 mt-2 mr-2">
                  Apellido:
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full mt-1 p-2 rounded" />
                </label>
                <CreditCardInput cardInfo={cardInfo} onCardInfoChange={handleCardInfoChange} />
                <button type="submit" className="SubmitButton bg-[#381E72] mt-5 mr-2 p-2 rounded text-[#EADDFF] hover:bg-[#EADDFF] hover:text-[#4F378B] font-bold">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}