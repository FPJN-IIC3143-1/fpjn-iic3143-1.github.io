import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NotisDropdown from "./notificationsDropdown.jsx";

export default function NotificationLogOut() {
  const { logout } = useAuth0();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleNotification = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div data-testid="notification-logout-wrapper">
      {isDropdownVisible && (
        <NotisDropdown />
      )}

      <div 
        data-testid="notification-logout-container"
        className="container bg-[#182F40] flex flex-row justify-center items-center w-[280px] h-[50px] rounded-[2px] gap-12 px-8 absolute top-0 right-0 m-1"
      >
        <div 
          data-testid="vertical-line-left"
          className="vertLine w-[0px] h-[25px] bg-gray-100 border-x-gray-100 border-x-solid rounded-[2px] border-x-2" 
        />

        <button
          data-testid="notification-button"
          className="flex justify-center items-center w-[40px] h-[50px] rounded-[8px] hover:border-white hover:border hover:border-solid border-none"
          onClick={handleNotification}
          aria-label="Toggle notifications"
        >
          <img
            data-testid="notification-icon"
            src="/NotificationLogOut/notifications.png"
            alt="notification"
            className="w-[30px] h-[40px] pt-[7px] pb-[7px]"
          />
        </button>

        <button
          data-testid="logout-button"
          className="LogOutButton flex justify-center items-center w-[40px] h-[50px] rounded-[8px] hover:border-white hover:border hover:border-solid border-none"
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          aria-label="Log out"
        >
          <img
            data-testid="logout-icon"
            src="/NotificationLogOut/logout.png"
            alt="logOut"
            className="w-[30px] h-[40px] pt-[7px] pb-[7px]"
          />
        </button>

        <div 
          data-testid="vertical-line-right"
          className="vertLine w-[0px] h-[25px] bg-gray-100 border-x-gray-100 border-x-solid rounded-[2px] border-x-2" 
        />
      </div>
    </div>
  );
}
