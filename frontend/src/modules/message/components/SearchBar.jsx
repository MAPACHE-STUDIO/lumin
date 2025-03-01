import React from "react";

export const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-3 w-full pr-2">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border border-violet-300 rounded-3xl focus:outline-none focus:ring-1 focus:ring-violet-400"
        placeholder="Let's find a conversation..."
      />
    </div>
  );
};
