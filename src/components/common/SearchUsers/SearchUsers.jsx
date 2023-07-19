import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./SearchUsers.scss";

export default function SearchUsers({ setIsSearch, setSearchInput }) {
  return (
    <div className="search-users">
      {/* Render the search input field */}
      <input
        placeholder="Search Users.."
        onChange={(event) => setSearchInput(event.target.value)}
      />

      {/* Render the close icon */}
      <AiOutlineCloseCircle
        className="close-icon"
        size={20}
        onClick={() => {
          // When the close icon is clicked, call the setIsSearch function with 'false'
          // and clear the search input by calling setSearchInput with an empty string
          setIsSearch(false);
          setSearchInput("");
        }}
      />
    </div>
  );
}
