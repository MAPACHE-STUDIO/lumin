import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { RegisterPage } from "./modules/auth/pages/RegisterPage";
import { LoginPage } from "./modules/auth/pages/LoginPage";

import { ChatsPage } from "./modules/message/pages/ChatsPage";
import { UserChat } from "./modules/message/pages/UserChat";
import { StatusPage } from "./modules/message/pages/StatusPage";
import { CallsPage } from "./modules/message/pages/CallsPage";
import { SettingsPage } from "./modules/message/pages/SettingsPage";

import socket from "./core/utils/socket/socket";
import { useEffect } from "react";

function App() {
  // Configuración de rutas
  const routes = [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/chats",
      element: <ChatsPage />,
    },
    {
      path: "/chats/:conversationId",
      element: <UserChat />,
    },
    {
      path: "/StatusPage",
      element: <StatusPage />,
    },
    {
      path: "/CallsPage",
      element: <CallsPage />,
    },
    {
      path: "/ChatsPage",
      element: <ChatsPage />,
    },
    {
      path: "/SettingsPage",
      element: <SettingsPage />,
    },
    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ];

  return (
    <Router>
      <div>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>

        {/* Mostrar el navbar en todas las páginas excepto la de login o registro */}
      </div>
    </Router>
  );
}

export default App;
