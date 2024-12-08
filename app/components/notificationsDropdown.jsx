import { useEffect, useState } from "react";
import { useToken } from "../routes/tokenContext";
import useApi from "../routes/useApi";

const NotisDropdown = () => {
  const { tokenReady } = useToken();
  const api = useApi();
  const [notificationsData, setNotificationsData] = useState([]);

  useEffect(() => {
    if (tokenReady) {
      console.log("Token is ready, fetching data...");

      // Fetch data here
      Promise.all([api.notifications()])
        .then(([notificationsData]) => {
          console.log("Fetched Notifications Data:", notificationsData);

          const formatDate = (dateString) => {
            return dateString.split("T")[0];
          };

          setNotificationsData(
            notificationsData.map((notification) => ({
              ...notification,
              createdAt: formatDate(notification.createdAt),
            }))
          );
        })
        .catch((error) => {
          console.error("Error fetching data:", error.message);
        });
    }
  }, [tokenReady]);

  return (
    <div className="absolute top-[65px] right-[20px] bg-white shadow-lg rounded-md w-[350px]">
      {/* Triángulo */}
      <div className="absolute -top-2.5 right-[145px] w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[15px] border-b-white"></div>

      {/* Contenedor de notificaciones */}
      <div className="max-h-[300px] overflow-y-auto py-2">
        {notificationsData.map((notification, index) => (
          <div
            key={index}
            className="px-4 py-2 border-b border-gray-200 last:border-b-0"
          >
            <p className="text-sm font-bold text-gray-600">{notification.createdAt}</p>
            <p className="text-gray-800">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotisDropdown;
