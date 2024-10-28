import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

// Basado en https://www.npmjs.com/package/react-credit-cards-2.

export default function CreditCardInput({ cardInfo, onCardInfoChange }) {
  const [focus, setFocus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onCardInfoChange({ ...cardInfo, [name]: value });
  };

  return (
    <div className="CreditCardInput pt-6 mt-4 mr-2">
      <Cards
        number={cardInfo.number}
        name={cardInfo.name}
        expiry={cardInfo.expiry}
        cvc={cardInfo.cvc}
        focused={focus}
      />
      <form className="flex flex-col w-full mt-5">
        <label className="text-gray-300 mt-2">
          Número de Tarjeta:
          <input
            type="tel"
            name="number"
            value={cardInfo.number}
            onChange={handleInputChange}
            onFocus={(e) => setFocus(e.target.name)}
            className="w-full mt-1 p-2 rounded"
            required
          />
        </label>
        <label className="text-gray-300 mt-2">
          Nombre:
          <input
            type="text"
            name="name"
            value={cardInfo.name}
            onChange={handleInputChange}
            onFocus={(e) => setFocus(e.target.name)}
            className="w-full mt-1 p-2 rounded"
            required
          />
        </label>
        <label className="text-gray-300 mt-2">
          Fecha de Expiración:
          <input
            type="tel"
            name="expiry"
            value={cardInfo.expiry}
            onChange={handleInputChange}
            onFocus={(e) => setFocus(e.target.name)}
            className="w-full mt-1 p-2 rounded"
            required
          />
        </label>
        <label className="text-gray-300 mt-2">
          CVC:
          <input
            type="tel"
            name="cvc"
            value={cardInfo.cvc}
            onChange={handleInputChange}
            onFocus={(e) => setFocus(e.target.name)}
            className="w-full mt-1 p-2 rounded"
            required
          />
        </label>
      </form>
    </div>
  );
}