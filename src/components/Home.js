import React, { useState, useEffect } from "react";
import { createPost, deletePost } from "../api/api";
import redX from "./ico/RedX.png";
import greenCheck from "./ico/GreenCheck.png";


/* main Home component */

const Home = ({ Token, currentUser, posts }) => {
    const [description, setdescription] = useState("");
    const [title, setTitle] = useState("");
    const [price, setprice] = useState("$");
    const [location, setlocation] = useState("");
    const [deliver, setdeliver] = useState(false);


    /* helper function for home component returning mapped out posts for which logged in user is creator */

    const mapMyPosts = () => {
        return myPosts.length > 0 ? (
            myPosts.map((post) => {
                let dateString = post.createdAt.slice(0, 10);
                return (
                    <div key={post._id} className="ui centered card" style={{border: "1px dashed black"}}>
                        <div className="content">
                            <div className="header">{post.title}</div>
                            <div className="meta">Created: {dateString}</div>
                            <div className="meta">Price: {post.price}</div>
                            <div className="meta">
                                Post Active:
                                {post.active ? (
                                    <img className="willDeliver" src={greenCheck} />
                                ) : (
                                    <img className="willDeliver" src={redX} />
                                )}
                            </div>
                        </div>
                        <DeletePost currentUser={currentUser} postID={post._id} Token={Token} />
                    </div>
                );
            })
        ) : (
            <h4>You have not created any posts yet</h4>
        );
    };


    /* helper function for main dashboard component that provides delete post functionality */

    const DeletePost = ({ currentUser, postID, Token }) => {
        const deleteThisPost = async (Token, postID) => {

            try {
                const result = await deletePost(Token, postID);
                if (result.success) {
                    return "Post Deleted";
                } else {
                    return "Post failed to delete";
                }
            } catch (error) {
                throw error;
            }
        };

        return (
            <>
                {currentUser.success ? (
                    <button
                        className="ui negative button"
                        onClick={() => deleteThisPost(Token, postID)}>
                        Delete Post
                    </button>
                ) : null}
            </>
        );
    };




    let myPosts = [];


    /* conditional for loop grabbing ONLY posts for which logged in user is creator */

    if (currentUser) {
        if (currentUser.success) {
            for (let key in posts) {
                let post = posts[key];
                let author = post.author.username;
                if (currentUser.data.username === author) {
                    myPosts.push(post);
                }
            }
        }
    }


    /* onSubmit function to send API data for creating a new post */

    const handleNewPostSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await createPost(Token, title, price, location, description, deliver);
            return result;
        } catch (error) {
            throw error;
        }
    };


    /* return statement for primary Home component with 2 conditional checks to: prevent an error, and to check if someone is logged in */

    if (currentUser) {
        if (currentUser.success) {
            return (
                <div className="ui placeholder segment">
                    <div className="ui stackable very relaxed two column grid" id="home-centered">
                        <div className="column">
                            <div className="field" id="homecards" style={{ overflow: "auto" }}>
                                {mapMyPosts()}
                            </div>
                        </div>
                        <div className="middle aligned column">
                            <form className="ui form" onSubmit={handleNewPostSubmit}>
                                <div className="field">
                                    <label>Title</label>
                                    <div className="ui input">
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={title}
                                            onChange={(event) => setTitle(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="field">
                                        <label>Location</label>
                                        <div className="ui input">
                                            <input
                                                type="text"
                                                placeholder="Location"
                                                value={location}
                                                onChange={(event) =>
                                                    setlocation(event.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label>Price</label>
                                        <div className="ui input">
                                            <input
                                                type="text"
                                                placeholder="Price"
                                                rows="3"
                                                value={price}
                                                onChange={(event) => setprice(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="form-textarea-control-opinion">
                                            Description
                                        </label>
                                        <textarea
                                            placeholder="Description"
                                            id="form-textarea-control-opinion"
                                            rows="5"
                                            value={description}
                                            onChange={(event) =>
                                                setdescription(event.target.value)
                                            }></textarea>
                                    </div>
                                    <div className="ui checkbox">
                                        <label>Will Deliver?</label>
                                        <input
                                            type="checkbox"
                                            name="deliver"
                                            value={deliver}
                                            onChange={(event) => setdeliver(event.target.value)}
                                        />
                                    </div>
                                </div>

                                <button className="ui button" type="submit">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="ui vertical divider">-- Your Posts | New Posts ---</div>
                </div>
            );
        } else {
            return null;
        }
    } else {
        return null;
    }
};

export default Home;