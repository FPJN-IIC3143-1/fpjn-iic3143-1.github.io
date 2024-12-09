import { useState } from 'react';
import useApi from '../routes/useApi';

export default function ImportDataButton() {
  const api = useApi();
  const [isLoading, setIsLoading] = useState(false);

  const convertToJson = async (file) => {
    if (!file.name.endsWith('.json')) {
      throw new Error('Solo se aceptan archivos .json');
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          resolve(jsonData);
        } catch (error) {
          reject(new Error('El archivo no contiene JSON válido'));
        }
      };
      reader.onerror = () => reject(new Error('Error al leer el archivo'));
      reader.readAsText(file);
    });
  };

  const validateAndFormatJSON = (data) => {
    if (!Array.isArray(data)) {
      throw new Error('El archivo debe contener un arreglo de registros');
    }

    return data.map(record => {
      // Check required fields
      const requiredFields = ['consumedAt', 'recipe_id', 'protein', 'carbs', 'calories'];
      const missingFields = requiredFields.filter(field => !record[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
      }

      // Return only needed fields
      return {
        consumedAt: new Date(record.consumedAt).toISOString(),
        recipe_id: String(record.recipe_id),
        protein: Number(record.protein),
        carbs: Number(record.carbs),
        calories: Number(record.calories)
      };
    });
  };

  const handleFileUpload = async (event) => {
    try {
      setIsLoading(true);
      const file = event.target.files[0];
      if (!file) return;
  
      const jsonData = await convertToJson(file);
      console.log('Raw imported data:', jsonData);
  
      const formattedData = validateAndFormatJSON(jsonData);
      console.log('Formatted data:', formattedData);
  
      const response = await api.importRecipeData({ history: formattedData });
      
      // Backend returns the imported data on success, error object on failure
      if (Array.isArray(response)) {
        console.log('Upload successful!');
        console.log(`Imported ${response.length} records`);
        console.log('Sample record:', response[0]);
        alert('Datos importados exitosamente');
      } else {
        console.error('Upload failed:', response);
        alert('Error al importar datos: ' + (response.error || 'Error desconocido'));
      }
    } catch (error) {
      console.error('Error de importación:', error);
      alert('Error al importar archivo: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id="import-file"
      />
      <label htmlFor="import-file">
        <button 
          onClick={() => document.getElementById('import-file').click()}
          disabled={isLoading}
          className="mt-[25px] text-white hover:cursor-pointer"
          onMouseEnter={(e) => e.target.style.color = "#D0BCFE"}
          onMouseLeave={(e) => e.target.style.color = "#ffffff"}
        >
          {isLoading ? 'Importando...' : 'Importar Historial'}
        </button>
      </label>
    </div>
  );
}