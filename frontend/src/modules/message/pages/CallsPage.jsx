import React, { useState } from "react";
import { Navbar } from "../components/Navbar"; // Importar el componente de navegación

export const CallsPage = () => {
  const callsList = [
    {
      id: "1",
      name: "Laura Gómez",
      profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
      type: "Video call", // "Normal call" or "Video call"
      direction: "Incoming", // "Incoming" or "Outgoing"
      date: "2025-01-20",
      time: "08:45",
    },
    {
      id: "2",
      name: "Pedro Martínez",
      profilePicture: "https://randomuser.me/api/portraits/men/4.jpg",
      type: "Normal call",
      direction: "Outgoing",
      date: "2025-01-20",
      time: "16:20",
    },
    {
      id: "3",
      name: "Ana López",
      profilePicture: "https://randomuser.me/api/portraits/women/3.jpg",
      type: "Video call",
      direction: "Incoming",
      date: "2025-01-22",
      time: "19:30",
    },
    {
      id: "4",
      name: "Miguel Torres",
      profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
      type: "Normal call",
      direction: "Outgoing",
      date: "2025-01-24",
      time: "10:50",
    },
    {
      id: "5",
      name: "Carmen Ruiz",
      profilePicture: "https://randomuser.me/api/portraits/women/8.jpg",
      type: "Video call",
      direction: "Incoming",
      date: "2025-01-24",
      time: "22:10",
    },
    {
      id: "6",
      name: "Diego Sánchez",
      profilePicture: "https://randomuser.me/api/portraits/men/9.jpg",
      type: "Normal call",
      direction: "Incoming",
      date: "2025-01-25",
      time: "11:00",
    },
  ];

  const groupedCalls = callsList.reduce((groups, call) => {
    const date = call.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(call);
    return groups;
  }, {});

  return (
    <div className="bg-violet-500">
      {/* Título */}
      <div className="bg-violet-500 p-8">
        <h2 className="text-3xl text-white font-bold">Calls</h2>
      </div>

      {/* Lista de llamadas */}
      <div className="bg-white text-gray-900 rounded-t-3xl p-4 mb-10">
        {Object.keys(groupedCalls).map((date) => (
          <div key={date} className="mb-5">
            {/* Fecha */}
            <h3 className="text-sm text-gray-500 font-medium mb-2">
              {new Date(date).toLocaleDateString("en-EN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h3>

            {/* Llamadas del día */}
            <ul className="space-y-3">
              {groupedCalls[date].map((call) => (
                <li
                  key={call.id}
                  className="flex items-center p-3 bg-violet-100 rounded-3xl shadow-md"
                >
                  {/* Foto de perfil */}
                  <img
                    src={call.profilePicture}
                    alt={call.name}
                    className="w-14 h-15 rounded-3xl"
                  />
                  {/* Detalles de la llamada */}
                  <div className="flex-grow ml-4">
                    <p className="font-semibold text-violet-900">{call.name}</p>
                    <p className="text-sm text-gray-500">
                      {call.type} - {call.direction}
                    </p>
                  </div>
                  {/* Hora */}
                  <div className="text-sm text-gray-400">{call.time}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Navbar />
    </div>
  );
};
