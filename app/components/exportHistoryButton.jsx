import useApi from '../routes/useApi';

export default function ExportHistoryButton() {
  const api = useApi();

  const handleExportHistory = async () => {
    try {
      const response = await api.exportRecipeConsumptionHistory();
      if (response && response.data) {
        const jsonData = response.data;
        const csvData = convertToCSV(jsonData);
        downloadCSV(csvData, 'recipe-consumption-history.csv');
      } else {
        alert("No se pudo exportar el historial.");
      }
    } catch (error) {
      console.error("Error exporting history:", error);
    }
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    return `${headers}\n${rows}`;
  };

  const downloadCSV = (csvData, filename) => {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      className="ExportHistoryButton mt-[25px] text-white"
      onClick={handleExportHistory}
    >
      Exportar Historial
    </button>
  );
}