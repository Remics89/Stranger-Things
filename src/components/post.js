import React, { useState } from "react";
import redX from "./ico/RedX.png";
import greenCheck from "./ico/GreenCheck.png";

const Post = (props) => {
    const { currentPost, currentUser, Token} = props;

    return (
        <div className="ui centered card" id="post">
            <div className="content" id="post">
                <div className="header">{currentPost.title}</div>
                <div className="meta">
                    <b>Location: </b>
                    {currentPost.location}
                </div>
                <ul className="list">
                    <li className="meta" id="desc">
                        <b>Currently Active: </b>
                        {currentPost.active ? (
                            <img className="willDeliver" src={greenCheck} />
                        ) : (
                            <img className="willDeliver" src={redX} />
                        )}
                    </li>
                    <li className="meta" id="desc">
                        <b>Will Deliver: </b>
                        {currentPost.willDeliver ? (
                            <img className="willDeliver" src={greenCheck} />
                        ) : (
                            <img className="willDeliver" src={redX} />
                        )}
                    </li>
                </ul>
                <div className="description" id="desc">
                    <b>Description: </b>
                    <br />
                    {currentPost.description}
                </div>
            </div>
            <div className="extra content" id="price">
                <b>Price: </b>
                {currentPost.price}

                {Token && currentUser !== currentPost.createdBy ? (
                    <>
                        <h3 className="ui dividing header">Send a message to the post author:</h3>
                        <form className="ui reply form">
                            <input type="text" />
                            <button className="ui positive button messageButton">
                                Send Message
                            </button>
                        </form>
                    </>
                ) : (
                    <h4>Please Log In to send a message.</h4>
                )}
            </div>
        </div>
    );
};

export default Post;
