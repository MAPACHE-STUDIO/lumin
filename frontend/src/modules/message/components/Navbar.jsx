import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import status from "../../../assets/status.svg"; // Asegúrate de que la ruta sea correcta
import calls from "../../../assets/calls.svg"; // Asegúrate de que la ruta sea correcta
import settings from "../../../assets/settings.svg"; // Asegúrate de que la ruta sea correcta
import chats from "../../../assets/chats.svg"; // Asegúrate de que la ruta sea correcta
import { AppContext } from "../../../context/context";

export const Navbar = () => {
  const location = useLocation();
  const {unreadMessagesCount} = useContext(AppContext)
  const navItems = [
    { path: "/StatusPage", label: "Status", icon: status },
    { path: "/CallsPage", label: "Calls", icon: calls },
    { path: "/ChatsPage", label: "Chats", icon: chats },
    { path: "/SettingsPage", label: "Settings", icon: settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-2 text-sm ${
              location.pathname === item.path ? "text-violet-700" : "text-gray-400"
            }`}
          >
            <div className="relative">
              <img src={item.icon} alt={item.label} className="w-7 h-8" />
              {item.label === "Chats" && unreadMessagesCount > 0 && (
                <span className="absolute top-0 right-0 bg-white text-violet-900 border border-violet-500 text-xs font-bold px-1 rounded-full">
                  {unreadMessagesCount}
                </span>
              )}
            </div>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
