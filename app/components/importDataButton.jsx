// app/components/importDataButton.jsx
import { useState } from 'react';
import useApi from '../routes/useApi';
import * as XLSX from 'xlsx';

export default function ImportDataButton() {
  const api = useApi();
  const [isLoading, setIsLoading] = useState(false);

  const convertToJson = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          if (file.name.endsWith('.csv')) {
            const text = e.target.result;
            const lines = text.split('\n');
            const headers = lines[0].split(',');
            const jsonData = lines.slice(1).map(line => {
              const values = line.split(',');
              return headers.reduce((obj, header, i) => {
                obj[header.trim()] = values[i]?.trim();
                return obj;
              }, {});
            });
            resolve(jsonData);
          } else if (file.name.endsWith('.xlsx')) {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            resolve(jsonData);
          } else if (file.name.endsWith('.json')) {
            const jsonData = JSON.parse(e.target.result);
            resolve(jsonData);
          } else {
            reject(new Error('Unsupported file format'));
          }
        } catch (error) {
          reject(error);
        }
      };
      
      if (file.name.endsWith('.csv') || file.name.endsWith('.json')) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  };

  const handleMouseEnter = (e) => {
    e.target.style.color = "#D0BCFE";
  };

  const handleMouseLeave = (e) => {
    e.target.style.color = "#ffffff";
  };

  const handleFileUpload = async (event) => {
    try {
      setIsLoading(true);
      const file = event.target.files[0];
      if (!file) return;
      
      const jsonData = await convertToJson(file);

      // TODO: Add validation of JSON format here
      
      const response = await api.importRecipeData(jsonData);
      
      if (response.success) {
        alert('Datos importados exitosamente');
      } else {
        alert('Error al importar datos: ' + response.message);
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
        accept=".csv,.xlsx,.json"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id="import-file"
      />
      <label htmlFor="import-file">
        <button 
          onClick={() => document.getElementById('import-file').click()}
          disabled={isLoading}
          className="mt-[25px] text-white hover:cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isLoading ? 'Importando...' : 'Importar Historial'}
        </button>
      </label>
    </div>
  );
}
