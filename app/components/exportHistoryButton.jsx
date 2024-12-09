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

  const cleanupData = (data) => {
    return data.map(item => ({
      fecha_consumo: new Date(item.consumedAt).toLocaleString(),
      receta_id: item.recipe_id,
      proteinas: item.protein + 'g',
      carbohidratos: item.carbs + 'g',
      calorias: item.calories + 'kcal'
    }));
  };

  const handleExportHistory = async () => {
    if (isExporting) return;
    
    setIsExporting(true);
    try {
      console.log('Fetching export data...');
      const response = await api.exportRecipeConsumptionHistory();
      
      // Debug response
      console.log('Raw API response:', response);
  
      // Check if response exists
      if (!response) {
        throw new Error('No se recibió respuesta del servidor');
      }
  
      // Check if we got the data directly or need to access it differently
      const data = Array.isArray(response) ? response : response.data;
      
      // Validate data
      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('No hay datos disponibles para exportar');
      }
  
      console.log(`Received ${data.length} records`);
      console.log('Sample record:', data[0]);
      
      const cleanedData = cleanupData(data);
      console.log('Processed data sample:', cleanedData[0]);
  
      const csvData = convertToCSV(cleanedData);
      console.log('CSV preview:', csvData.slice(0, 200));
  
      await downloadCSV(csvData, `historial-consumo-${new Date().toISOString().split('T')[0]}.csv`);
      console.log('Download completed');
  
    } catch (error) {
      console.error('Error during export:', error);
      const errorMessage = error.message || 'Error desconocido durante la exportación';
      alert(`Error al exportar el historial: ${errorMessage}`);
    } finally {
      setIsExporting(false);
    }
  };

  const convertToCSV = (data) => {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
      Object.values(row)
        .map(val => `"${val}"`)
        .join(',')
    ).join('\n');
    
    return `${headers}\n${rows}`;
  };

  const downloadCSV = async (csvData, filename) => {
    return new Promise((resolve) => {
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      
      link.click();
      
      // Cleanup
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