import React, { useState } from "react";

export const GroupBar = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter); // Llama al callback para cambiar el filtro en el componente principal
  };

  return (
    <div className="flex space-x-4 pb-4">
      <button
        onClick={() => handleFilterChange("all")}
        className={`flex-1 py-2 text-center ${selectedFilter === "all" ? "bg-violet-500 rounded-3xl text-white" : "text-violet-500"}`}
      >
        All
      </button>
      <button
        onClick={() => handleFilterChange("unRead")}
        className={`flex-1 py-2 text-center ${selectedFilter === "unRead" ? "bg-violet-500 rounded-3xl text-white" : "text-violet-500"}`}
      >
        Unread
      </button>
      <button
        onClick={() => handleFilterChange("favorites")}
        className={`flex-1 py-2 text-center ${selectedFilter === "favorites" ? "bg-violet-500 rounded-3xl text-white" : "text-violet-500"}`}
      >
        Favorites
      </button>
      <button
        onClick={() => handleFilterChange("groups")}
        className={`flex-1 py-2 text-center ${selectedFilter === "groups" ? "bg-violet-500 rounded-3xl text-white" : "text-violet-500"}`}
      >
        Groups
      </button>
    </div>
  );
};
