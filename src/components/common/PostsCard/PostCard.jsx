import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import {
  getCurrentUser,
  getAllUsers,
  deletePost,
  getConnections,
} from "../../../api/FirestoreAPI";
import LikeButton from "../LikeButton/LikeButton";
import "./PostCard.scss";

export default function PostCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch current user data and all users data using useMemo to prevent unnecessary re-renders
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  // Fetch connections data when currentUser.id or posts.userID changes using useEffect
  useEffect(() => {
    getConnections(currentUser.id, posts.userID, setIsConnected);
  }, [currentUser.id, posts.userID]);

  // Check if the user is connected to the post owner or is the owner, then render the post card
  return isConnected || currentUser.id === posts.userID ? (
    <div className="posts-card" key={id}>
      <div className="post-image-wrapper">
        {/* Render edit and delete buttons if the current user is the owner of the post */}
        {currentUser.id === posts.userID ? (
          <div className="action-container">
            <BsPencil
              size={20}
              className="action-icon"
              onClick={() => getEditData(posts)}
            />
            <BsTrash
              size={20}
              className="action-icon"
              onClick={() => deletePost(posts.id)}
            />
          </div>
        ) : (
          <></>
        )}

        {/* Display the post owner's profile image && changed .filter() and .map() to .find() to improve efficiency and readability.*/}
        <img
          alt="profile-image"
          className="profile-image"
          src={
            allUsers.find((item) => item.id === posts.userID)?.imageLink || ""
          }
        />
        <div>
          {/* Navigate to the user's profile page when their name is clicked */}
          <p
            className="name"
            onClick={() =>
              navigate("/profile", {
                state: { id: posts?.userID, email: posts.userEmail },
              })
            }
          >
            {/* Display the post owner's name */}
            {allUsers.find((user) => user.id === posts.userID)?.name}
          </p>
          {/* Display the post owner's headline */}
          <p className="headline">
            {allUsers.find((user) => user.id === posts.userID)?.headline}
          </p>
          {/* Display the timestamp of the post */}
          <p className="timestamp">{posts.timeStamp}</p>
        </div>
      </div>
      {/* Display the post image if it exists */}
      {posts.postImage ? (
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image"
          alt="post-image"
        />
      ) : (
        <></>
      )}
      {/* Render the post status text using dangerouslySetInnerHTML (be cautious of potential security risks) */}
      <p
        className="status"
        dangerouslySetInnerHTML={{ __html: posts.status }}
      ></p>

      {/* Render the LikeButton component with appropriate props */}
      <LikeButton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      />

      {/* Modal to display the post image when clicked */}
      <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image modal"
          alt="post-image"
        />
      </Modal>
    </div>
  ) : (
    <></>
  );
}
