
const NotisDropdown = () => {
  return (
    <div className="absolute top-[65px] right-[20px] bg-white shadow-lg rounded-md w-[350px] py-2">
      {/* Triángulo */}
      <div className="absolute -top-2.5 right-[145px] w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[15px] border-b-white"></div>

      <div className="px-4 py-2 border-b border-gray-200">
        <p className="text-sm font-bold text-gray-600">09/12/2024</p>
        <p className="text-gray-800">Tus ingredientes frecuentes no están en tu despensa!</p> 
      </div>

      <div className="px-4 py-2 border-b border-gray-200">
        <p className="text-sm font-bold text-gray-600">08/12/2024</p>
        <p className="text-gray-800">No hay yogurt para tus desayunos</p> 
      </div>

      <div className="px-4 py-2">
        <p className="text-sm font-bold text-gray-600">07/12/2024</p> 
        <p className="text-gray-800">No hay yogurt para tus desayunos</p> 
      </div>
    </div>
  );
};

export default NotisDropdown;


