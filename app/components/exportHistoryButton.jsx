// app/components/exportHistoryButton.jsx
import { useState } from 'react';
import useApi from '../routes/useApi';

export default function ExportHistoryButton() {
  const api = useApi();
  const [isExporting, setIsExporting] = useState(false);

  const handleMouseEnter = (e) => {
    e.target.style.color = "#D0BCFE";
  };

  const handleMouseLeave = (e) => {
    e.target.style.color = "#ffffff";
  };

  const handleExportHistory = async () => {
    if (isExporting) return;
    
    setIsExporting(true);
    try {
      console.log('Fetching export data...');
      const response = await api.exportRecipeConsumptionHistory();
      
      console.log('Raw API response:', response);

      if (!response) {
        throw new Error('No se recibió respuesta del servidor');
      }

      const data = Array.isArray(response) ? response : response.data;
      
      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('No hay datos disponibles para exportar');
      }

      console.log(`Received ${data.length} records`);
      console.log('Sample record:', data[0]);

      await downloadJSON(data, `historial-consumo-${new Date().toISOString().split('T')[0]}.json`);
      console.log('Download completed');

    } catch (error) {
      console.error('Error during export:', error);
      const errorMessage = error.message || 'Error desconocido durante la exportación';
      alert(`Error al exportar el historial: ${errorMessage}`);
    } finally {
      setIsExporting(false);
    }
  };

  const downloadJSON = async (data, filename) => {
    return new Promise((resolve) => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      resolve();
    });
  };

  return (
    <button
      className="ExportHistoryButton mt-[25px] text-white hover:cursor-pointer disabled:opacity-50"
      onClick={handleExportHistory}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={isExporting}
    >
      {isExporting ? 'Exportando...' : 'Exportar Historial'}
    </button>
  );
}