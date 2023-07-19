import React, { useEffect, useState } from "react";
import LinkedinLogo from "../../../assets/RLinkedLogo.png";
import user from "../../../assets/user.png";
import SearchUsers from "../SearchUsers/SearchUsers";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsBriefcase } from "react-icons/bs";
import { getAllUsers } from "../../../api/FirestoreAPI";
import ProfilePopup from "../ProfilePopup/ProfilePopup";
import "./Topbar.scss";

export default function Topbar({ currentUser }) {
  // State variables for managing the topbar behavior
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  let navigate = useNavigate();

  // Function to navigate to a specific route
  const goToRoute = (route) => {
    navigate(route);
  };

  // Function to display or hide the user profile popup
  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  // Function to navigate to a user's profile when clicked
  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  // Function to filter users based on the search input
  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  // Use useEffect to debounce the search input handling for better performance
  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  // Fetch all users using useEffect when the component mounts
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return (
    <div className="topbar-main">
      {/* Conditionally render the profile popup */}
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}

      {/* Render the RLinked logo */}
      <img className="rlinked-logo" src={LinkedinLogo} alt="LinkedinLogo" />

      {/* Conditionally render the search input or navigation icons */}
      {isSearch ? (
        <SearchUsers
          setIsSearch={setIsSearch}
          setSearchInput={setSearchInput}
        />
      ) : (
        <div className="react-icons">
          <AiOutlineSearch
            size={30}
            className="react-icon"
            onClick={() => setIsSearch(true)}
          />
          <AiOutlineHome
            size={30}
            className="react-icon"
            onClick={() => goToRoute("/home")}
          />
          <AiOutlineUserSwitch
            size={30}
            className="react-icon"
            onClick={() => goToRoute("/connections")}
          />
          <BsBriefcase size={30} className="react-icon" />
          <AiOutlineMessage size={30} className="react-icon" />
          <AiOutlineBell size={30} className="react-icon" />
        </div>
      )}

      {/* Render the user profile image */}
      <img
        className="user-logo"
        src={currentUser?.imageLink || user}
        alt="user"
        onClick={displayPopup}
      />

      {/* Conditionally render the search results if search input is not empty */}
      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {/* Display search results if there are any */}
          {filteredUsers.length === 0 ? (
            <div className="search-inner">No Results Found..</div>
          ) : (
            filteredUsers.map((user) => (
              <div
                className="search-inner"
                onClick={() => openUser(user)}
                key={user.id}
              >
                <img src={user.imageLink || user} alt="user" />
                <p className="name">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
