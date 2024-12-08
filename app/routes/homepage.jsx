import { useAuth0 } from "@auth0/auth0-react";
import SideBar from "../components/sideBar";
import DataCard from "../components/dataCard";
import NotificationLogOut from "../components/notificationLogOut";
import WelcomePopUp from "../components/welcomePopUp";
import useApi from "./useApi";
import { useState, useEffect } from "react";
import { useToken } from "./tokenContext";

export default function HomePage() {
  const api = useApi();
  const { user } = useAuth0();
  const [showWelcome, setShowWelcome] = useState(false);
  const [consumedMacros, setConsumedMacros] = useState({ protein: 0, carbs: 0, fats: 0, calories: 0 });
  const [goalMacros, setGoalMacros] = useState({ protein: 0, carbs: 0, fats: 0, calories: 0 });
  const { tokenReady } = useToken();
  const [dataFetched, setDataFetched] = useState(false);

  const [notificationsData, setNotificationsData] = useState([]);

  

  useEffect(() => {
    // Check if first-time user
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      setShowWelcome(true);
    }
  }, []);

  const handleWelcomeSubmit = () => {
    localStorage.setItem('hasVisitedBefore', 'true');
    setShowWelcome(false);
  };

  useEffect(() => {
    if (tokenReady && !dataFetched) {
      console.log("Token is ready, fetching data...");

      api.getDailyGoal()
        .then((dailyGoalData) => {
          console.log("Fetched Macros Data:", dailyGoalData);

          if (dailyGoalData && Object.keys(dailyGoalData).length > 0) {
            setConsumedMacros(dailyGoalData.consumed || { protein: 0, carbs: 0, fats: 0, calories: 0 });
            setGoalMacros(dailyGoalData.goal || { protein: 0, carbs: 0, fats: 0, calories: 0 });
          } else {
            setConsumedMacros({ protein: 0, carbs: 0, fats: 0, calories: 0 });
            setGoalMacros({ protein: 0, carbs: 0, fats: 0, calories: 0 });
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error.message);
          // Ensure fallback values if the request fails
          setConsumedMacros({ protein: 0, carbs: 0, fats: 0, calories: 0 });
          setGoalMacros({ protein: 0, carbs: 0, fats: 0, calories: 0 });
        })
        .finally(() => {
          setDataFetched(true);
        });
    }
  }, [tokenReady, dataFetched, api]);


  return (
    <div className="generalContainer flex">
      <SideBar />
      <div className="Container relative h-[1100px] grow bg-[#E5E9F0] p-[60px]">
        {showWelcome && (
          <WelcomePopUp onSubmitSuccess={handleWelcomeSubmit} />
        )}
        <h1 className="text-4xl text-[#182F40]">
          Bienvenido/a, {user ? user.given_name : "Cargando..."}!
        </h1>
  
        {/* Data Cards */}
        <div className="macros&progressBox flex pt-[100px] justify-evenly">
          <div className="macrosBox flex flex-col items-center">
            <div className="text-3xl text-[#182F40] font-bold pb-[10px]">Progreso de hoy</div>
            <DataCard
              boxWidth={340}
              leftRowInfo={[
                consumedMacros.protein,
                consumedMacros.carbs,
                consumedMacros.fats,
                consumedMacros.calories
              ]}
              rightRowInfo={["Proteínas", "Carbohidratos", "Grasas", "Calorías"]}
            />
            <div className="h-[20px]"></div>
          </div>
          <div className="ProgressBox flex flex-col items-center">
            <div className="text-3xl text-[#182F40] font-bold pb-[10px]">Metas de hoy</div>
            <DataCard
              boxWidth={340}
              leftRowInfo={[
                goalMacros.protein,
                goalMacros.carbs,
                goalMacros.fats,
                goalMacros.calories
              ]}
              rightRowInfo={["Proteínas", "Carbohidratos", "Grasas", "Calorías"]}
            />
            <div className="h-[20px]"></div>
          </div>
        </div>
  
        <div className="notificationsBox flex flex-col w-full items-center mt-[100px]">
          <div className="flex justify-start w-[830px]">
            <div className="text-3xl text-[#182F40] font-bold pb-[5px] pl-[50px]">Últimas notificaciones</div>
          </div>
          <div className="notificationsCard bg-[#A3BE8C] flex justify-center items-center h-[170px] rounded-[20px] text-[#182F40] w-[830px]">
            <div className="leftRow flex flex-col items-center font-bold pr-[40px] basis-1/5">
              {["09/09/2024", "07/09/2024", "07/09/2024", "07/09/2024"].map((leftInfo, index) => (
                <div key={index} className="leftItem mt-[5px] mb-[5px]">
                  {leftInfo}
                </div>
              ))}
            </div>
            <div className="rightRow flex flex-col items-start basis-3/5">
              {["Tus ingredientes frecuentes no están en tu despensa!", "No tienes pimiento!", "No hay yogurt para tus desayunos", "Se agotó el arroz en tu despensa!"].map((rightInfo, index) => (
                <div key={index} className="rightRow mt-[5px] mb-[5px]">
                  {rightInfo}
                </div>
              ))}
            </div>
          </div>
        </div>
  
        <img src="/images/ellipse-background.png" alt="elipse" className="absolute top-[50%] left-[50%] z-[-1]" />
        <img src="/images/logo-sin-texto.png" alt="elipse" className="fixed top-[83%] left-[90%]" />
      </div>
      <NotificationLogOut />
    </div>
  );
}