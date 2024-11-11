import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

// Basado en https://www.npmjs.com/package/react-credit-cards-2.

export default function CreditCardInput({ cardInfo, onCardInfoChange, errors, setErrors }) {
  const [focus, setFocus] = useState('');

  const validateExpiry = (date) => {
    if (!date) return false;
    const [year, month] = date.split('-');
    const expiryDate = new Date(year, month - 1);
    const today = new Date();
    return expiryDate > today;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'expiry') {
      // Format YYYY-MM to MM/YY for card display
      const [year, month] = value.split('-');
      const formattedExpiry = `${month}/${year.slice(-2)}`;
      
      const updatedCardInfo = {
        ...cardInfo,
        [name]: formattedExpiry,
        originalExpiry: value // Keep original format for validation
      };
      onCardInfoChange(updatedCardInfo);

      if (!validateExpiry(value)) {
        setErrors(prev => ({ ...prev, expiry: 'Fecha inválida o expirada' }));
      } else {
        setErrors(prev => ({ ...prev, expiry: null }));
      }
    } else {
      // Handle other fields normally
      const updatedCardInfo = { ...cardInfo, [name]: value };
      onCardInfoChange(updatedCardInfo);

      // Validate based on field
      if (name === 'number' && !/^\d{16}$/.test(value)) {
        setErrors(prev => ({ ...prev, number: 'Número debe tener 16 dígitos' }));
      } else if (name === 'cvc' && !/^\d{3}$/.test(value)) {
        setErrors(prev => ({ ...prev, cvc: 'CVC debe tener 3 dígitos' }));
      } else if (name === 'expiry' && !validateExpiry(value)) {
        setErrors(prev => ({ ...prev, expiry: 'Fecha inválida o expirada' }));
      } else {
        setErrors(prev => ({ ...prev, [name]: null }));
      }
    }
  };

  return (
    <div className="CreditCardInput pt-6 my-4">
      <Cards
        number={cardInfo.number}
        name={cardInfo.name}
        expiry={cardInfo.expiry || ''} // Now already in MM/YY format
        cvc={cardInfo.cvc}
        focused={focus}
      />
      <form className="flex flex-col w-full mt-5">
        <label className="text-gray-300 mt-2">
          Número de Tarjeta:
          <input
            type="tel"
            name="number"
            placeholder="**** **** **** ****"
            maxLength="16"
            value={cardInfo.number}
            onChange={handleInputChange}
            onFocus={(e) => setFocus(e.target.name)}
            className="w-full mt-1 p-2 rounded focus:ring-2 text-black bg-gray-50 focus:ring-[#D0BCFE] hover:bg-[#F5F5F5]"
            required
          />
          {errors?.number && <span className="text-red-400 text-sm">{errors.number}</span>}
        </label>
        <label className="text-gray-300 mt-2">
          Nombre en la Tarjeta:
          <input
            type="text"
            name="name"
            placeholder="Nombre Apellido"
            value={cardInfo.name}
            onChange={handleInputChange}
            onFocus={(e) => setFocus(e.target.name)}
            className="w-full mt-1 p-2 rounded focus:ring-2 text-black bg-gray-50 focus:ring-[#D0BCFE] hover:bg-[#F5F5F5]"
            required
          />
          {errors?.cardName && <span className="text-red-400 text-sm">Ingrese nombre como aparece en la tarjeta</span>}
        </label>
        <label className="text-gray-300 mt-2">
          Fecha de Expiración:
          <input
            type="month"
            name="expiry"
            placeholder="YYYY-MM"
            value={cardInfo.originalExpiry || ''} // Use original YYYY-MM format for input
            onChange={handleInputChange}
            onFocus={(e) => setFocus(e.target.name)}
            className="w-full mt-1 p-2 rounded focus:ring-2 text-black bg-gray-50 focus:ring-[#D0BCFE] hover:bg-[#F5F5F5]"
            required
            min={new Date().toISOString().slice(0, 7)}
          />
          {errors?.expiry && <span className="text-red-400 text-sm">{errors.expiry}</span>}
        </label>
        <label className="text-gray-300 mt-2">
          CVC:
          <input
            type="tel"
            name="cvc"
            placeholder='***'
            maxLength="3"
            value={cardInfo.cvc}
            onChange={handleInputChange}
            onFocus={(e) => setFocus(e.target.name)}
            className="w-full mt-1 p-2 rounded focus:ring-2 text-black bg-gray-50 focus:ring-[#D0BCFE] hover:bg-[#F5F5F5]"
            required
          />
          {errors?.cvc && <span className="text-red-400 text-sm">{errors.cvc}</span>}
        </label>
      </form>
    </div>
  );
}