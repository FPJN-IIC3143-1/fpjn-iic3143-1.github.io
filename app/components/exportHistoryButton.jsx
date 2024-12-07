import useApi from '../routes/useApi';

export default function ExportHistoryButton() {
  const api = useApi();

  const handleExportHistory = async () => {
    try {
      const response = await api.exportRecipeConsumptionHistory();
      if (response && response.url) {
        window.location.href = response.url; // Redirect to the download URL
      } else {
        alert("No se pudo exportar el historial.");
      }
    } catch (error) {
      console.error("Error exporting history:", error);
    }
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