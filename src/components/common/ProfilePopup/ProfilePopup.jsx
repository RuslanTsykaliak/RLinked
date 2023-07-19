import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../../api/AuthAPI";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import Button from "../Button/Button";
import "./ProfilePopup.scss";

export default function ProfilePopup() {
  // Initialize the 'navigate' function to enable navigation to different routes
  const navigate = useNavigate();

  // Use the 'useState' hook to manage component state for 'currentUser'
  const [currentUser, setCurrentUser] = useState({});

  // Fetch the current user's data from the FirestoreAPI and update the state
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div className="popup-card">
      {/* Display the current user's name and headline */}
      <p className="name">{currentUser?.name}</p>
      <p className="headline">{currentUser?.headline}</p>

      {/* Render a Button component to view the user's profile */}
      <Button
        title="View Profile"
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.id,
            },
          })
        }
      />

      {/* Render a Button component for logging out the current user */}
      <Button title="Log out" onClick={onLogout} />
    </div>
  );
}
