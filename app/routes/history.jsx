import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useApi from "./useApi";
import SideBar from "../components/sideBar";
import NotificationLogOut from "../components/notificationLogOut";
import { useToken } from "./tokenContext";

export default function History() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { tokenReady } = useToken();
  const api = useApi();
  const [historyData, setHistoryData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState({}); // Tracks the current page for each period

  const periods = ["this week", "last week", "this month"];
  const itemsPerPage = 4; // Number of ingredients per page

  const fetchHistoryData = async () => {
    if (!tokenReady) return;

    setLoading(true);
    try {
      const fetchedData = {};
      for (const period of periods) {
        const data = await api.getHistory(period);
        fetchedData[period] = data;
      }
      setHistoryData(fetchedData);

      // Initialize pagination state
      const initialPages = {};
      periods.forEach((period) => {
        initialPages[period] = 1; // Start from the first page for all periods
      });
      setCurrentPage(initialPages);
    } catch (error) {
      console.error("Error fetching history data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    if (tokenReady) {
      fetchHistoryData();
    }
  }, [isAuthenticated, tokenReady]);

  const handlePageChange = (period, page) => {
    setCurrentPage((prev) => ({
      ...prev,
      [period]: page,
    }));
  };

  const paginateIngredients = (ingredients, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return ingredients.slice(startIndex, endIndex);
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="relative h-[1100px] grow bg-[#E5E9F0] p-10 z-[0]">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-black">
          Tus secretos solo conocidos por los ...{" "}
          <span className="text-7xl font-extralight text-black">Historiales</span>
        </h1>

        {/* Macronutrients Section */}
        <div className="mt-[100px]">
          <div className="text-4xl font-bold text-black">
            Macro
            <p className="font-light">nutrientes</p>
          </div>
          <div className="flex justify-evenly mt-5">
            {periods.map((period, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-bold mb-2 text-black">
                  {period === "this week"
                    ? "Esta semana"
                    : period === "last week"
                    ? "Semana pasada"
                    : "Este mes"}
                </h3>
                <div className="bg-[#A3BE8C] rounded-md p-4 shadow-md min-w-[250px]">
                  {loading || !historyData[period]?.macronutrients ? (
                    <>
                      <p className="text-black">Proteína: --</p>
                      <p className="text-black">Grasa: --</p>
                      <p className="text-black">Carbohidratos: --</p>
                      <p className="text-black">Calorías: --</p>
                    </>
                  ) : (
                    <>
                      <p className="text-black">
                        Proteína: {historyData[period].macronutrients.protein}g
                      </p>
                      <p className="text-black">
                        Grasa: {historyData[period].macronutrients.fats}g
                      </p>
                      <p className="text-black">
                        Carbohidratos: {historyData[period].macronutrients.carbs}g
                      </p>
                      <p className="text-black">
                        Calorías: {historyData[period].macronutrients.calories}kcal
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="mt-[100px]">
          <div className="text-4xl font-bold text-black">
            Alimentos
            <p className="font-light text-black">consumidos</p>
          </div>
          <div className="flex justify-evenly mt-5">
            {periods.map((period, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-bold mb-2 text-black">
                  {period === "this week"
                    ? "Esta semana"
                    : period === "last week"
                    ? "Semana pasada"
                    : "Este mes"}
                </h3>
                <div className="bg-[#A3BE8C] rounded-md p-4 shadow-md min-w-[250px]">
                  {loading || !historyData[period]?.ingredients ? (
                    <p className="text-black">--</p>
                  ) : (
                    paginateIngredients(
                      historyData[period].ingredients,
                      currentPage[period] || 1
                    ).map((ingredient, idx) => (
                      <p key={idx} className="text-black">{ingredient}</p>
                    ))
                  )}
                </div>

                {/* Pagination Dots */}
                {historyData[period]?.ingredients?.length > itemsPerPage && (
                  <div className="flex justify-center mt-3">
                    {Array.from(
                      {
                        length: Math.ceil(
                          historyData[period].ingredients.length / itemsPerPage
                        ),
                      },
                      (_, i) => (
                        <button
                          key={i}
                          className={`w-3 h-3 rounded-full mx-1 ${
                            currentPage[period] === i + 1
                              ? "bg-[#182F40]"
                              : "bg-gray-400"
                          }`}
                          onClick={() => handlePageChange(period, i + 1)}
                        ></button>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Logo */}
        <img
          src="/images/logo-sin-texto.png"
          alt="logo"
          className="fixed bottom-[20px] right-[20px] w-[60px] h-[60px]"
        />
      </div>
      <NotificationLogOut />
    </div>
  );
}