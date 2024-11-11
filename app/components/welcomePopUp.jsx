import { useState } from 'react';
import CreditCardInput from './creditCardInput'; 

export default function WelcomePopUp({ onSubmitSuccess }) {
  // WelcomePopUp Component with a form to collect user's name, last name and credit card information
      // The form works for any screen size and should have the following fields:
  const userEmail = "mealsbuddy@gmail.com"; // TODO: Replace with the actual user's email
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

  const [errors, setErrors] = useState({});
  // const validateName = (name) => /^[A-Za-zÀ-ÿ]+\s+[A-Za-zÀ-ÿ]+$/.test(name);
  const [isVisible, setIsVisible] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);  // Add this state
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!name || !lastName || !cardInfo.number || !cardInfo.expiry || !cardInfo.cvc) {
      return;
    }

    // Check for validation errors
    if (Object.values(errors).some(error => error)) {
      return;
    }

    try {
      // Mark as submitted
      setIsSubmitted(true);
      
      // Notify parent
      onSubmitSuccess();
      
      // Close popup with small delay for feedback
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitted(false);
    }
  };

  const handleClosePopUp = () => {
    if (isSubmitted) {
      onSubmitSuccess();
      setIsVisible(false);
    }
    // Do nothing if not submitted - prevent early closing
  };

  if (!isVisible) return null;

  return (
    <>
      {isVisible && (
        <div id="WelcomePopUpContainer" 
          className={`WelcomePopUpContainer fixed inset-0 bg-gray-900 bg-opacity-50 
            flex items-center justify-center z-50 
            transition-opacity duration-300 ${isSubmitted ? 'opacity-0' : 'opacity-100'}`}>
          <div className="WelcomePopUp relative bg-[#4F378B] w-[600px] max-h-[90vh] rounded-[20px] px-10 pb-10 pt-3 overflow-y-auto">
            <div className="WelcomePopUpHeader flex justify-between items-center w-full absolute top-0 left-0 p-5 bg-[#4F378B] rounded-t-[20px]">
              <div className="text-3xl text-gray-100 font-bold">Bienvenido/a MealsBuddy!</div>
              <button className="CloseButton 
                bg-[#381E72] w-[30px] h-[30px] rounded-[50%] text-[#EADDFF] hover:bg-[#EADDFF] hover:text-[#4F378B] font-bold"
                onClick={handleClosePopUp}> X </button>
            </div>
            <div className="WelcomePopUpContent flex flex-col justify-start items-left w-full h-full mt-20 overflow-y-auto">
              <div className="text-gray-300 text-xl text-gray-150 mb-6">Te damos la bienvenida a tu asistente nutricional virtual. Aquí podrás planificar tus comidas, ver recetas, manejar tu despensa y mucho más!</div>
              <div className="text-gray-300 text-xl text-gray-150 mb-6">Para comenzar, por favor completa tus datos:</div>
              <form onSubmit={handleSubmit} className="flex flex-col w-full">
                <label className="text-gray-300 mt-2 mr-2">
                  Email:
                  <input type="text" value={userEmail} readOnly placeholder={userEmail} className="w-full mt-1 p-2 rounded bg-gray-600" />
                </label>
                <label className="text-gray-300 mt-2 mr-2">
                  Nombre:
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full mt-1 p-2 rounded text-black" />
                </label>
                <label className="text-gray-300 mt-2 mr-2">
                  Apellido:
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full mt-1 p-2 rounded text-black" />
                </label>
                <CreditCardInput 
                  cardInfo={cardInfo} 
                  onCardInfoChange={handleCardInfoChange}
                  errors={errors}
                  setErrors={setErrors}
                />
                <button 
                  type="submit" 
                  disabled={isSubmitted}
                  className={`SubmitButton bg-[#381E72] my-5 mr-2 p-2 rounded text-[#EADDFF] 
                    hover:bg-[#EADDFF] hover:text-[#4F378B] font-bold
                    ${isSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitted ? 'Enviando...' : 'Enviar'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}