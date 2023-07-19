import React, { useMemo, useState} from "react";
import {
    likePost,
    getLikesByUser,
    postComment,
    getComments,
} from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import "./LikeButton.scss";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";

// Component function to display the like button and comments section
export default function LikeButton({ userId, postId, currentUser }) {
    // State to manage the number of likes, comments, and their visibility
    const [LikesCount, setLikesCount] = useState(0);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    // Function to handle the like button click event
    const handleLike = () => {
        likePost(userId, postId, liked);
    };

    // Function to update the comment state on input change
    const getComment = (event) => {
        setComment(event.target.value);
    };

    // Function to add a comment and clear the comment input field
    const addComment = (event) => {
        postComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
        setComment("");
    };

    // Load likes and comments data when component mounts or dependencies change
    useMemo(() => {
        getLikesByUser(userId, postId, setLiked, setLikesCount);
        getComments(postId, setComments);
    }, [userId, postId]);

    // Render the component
    return (
        <div className="like-container">
            {/* Display the number of likes */}
            <p>{LikesCount} People Like this Post</p>
            <div className="hr-line">
                <hr />
            </div>
            <div className="like-comment">
                {/* Like button */}
                <div className="like-comment-inner" onClick={handleLike}>
                    {liked ? (
                        <BsFillHandThumbsUpFill size={30} color="#0a66c2" />
                    ) : (
                        <BsHandThumbsUp size={30} />
                    )}
                    <p className={liked ? "blue" : "black"}>Like</p>
                </div>
                {/* Comments button */}
                <div
                    className="like-comment-inner"
                    onClick={() => setShowCommentBox(!showCommentBox)}
                >
                    {
                    <AiOutlineComment
                    size={30}
                    color={showCommentBox ? "#0a66c2" : "#212121"} />
                    }
                    
                    <p className={showCommentBox ? "blue" : "black"}>Comments</p>
                </div>
            </div>
            {/* Display the comment input and comments when showCommentBox is true */}
            {showCommentBox ? (
                <>
                    <input
                        onChange={getComment}
                        placeholder="Add a Comment"
                        className="comment-input"
                        value={comment}
                    />
                    <button className="add-comment-btn" onClick={addComment}>
                        Add Comment
                    </button>
                    {/* Render all comments if available */}
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={index} className="all-comments">
                                <p className="name">{comment.name}</p>
                                <p className="comment">{comment.comment}</p>
                                <p className="timestamp">{comment.timeStamp}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </>
            ) : (
                <></>
            )}
        </div>
    );
}
