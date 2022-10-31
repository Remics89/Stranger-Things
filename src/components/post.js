import React, { Fragment, useState, useEffect } from "react";
import redX from "./ico/RedX.png";
import greenCheck from "./ico/GreenCheck.png";
import { useParams } from "react-router-dom";
import { sendMessage } from "../api/api";

const Post = (props) => {
    const { currentUser, Token, posts } = props;

    const param = useParams();

    const currentPostID = param.postID;

    let currentPost = {};

    for (let key in posts) {
        const post = posts[key];
        const postID = post._id;

        if (postID === currentPostID) {
            currentPost = post;
        }
    }


    const [message, setmessage] = useState("");
    const [response, setresponse] = useState(null);

    /*  submit the message to the API and change the response state    */

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        const result = await sendMessage(currentPostID, message, Token);
        setresponse(result);
    };

    /*  change message header to success/fail upon response change    */

    useEffect(() => {
        messageHelper();
    }, [response]);

    /*  change message header depending on whether sending the message was successful or not    */

    const messageHelper = () => {
        if (response) {
            
            const username = currentUser.data.username
            if (response.success && username !== currentPost.author.username) {
                
                return (
                    <h3 className="ui dividing header" style={{ border: "2px solid chartreuse" }}>
                        Success: Message was sent!
                    </h3>
                );
            } else {
                return (
                    <h3 className="ui dividing header" style={{ border: "2px solid red" }}>
                        Fail: Message could not be sent. You can't send messages to your own posts.
                    </h3>
                );
            }
        } else {
            return <h3 className="ui dividing header">Send a message to the post author:</h3>;
        }
    };

    /*  render individual post   */
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

                {Token ? (
                    <Fragment>
                        {messageHelper()}
                        <form className="ui reply form" onSubmit={handleMessageSubmit}>
                            <input
                                type="text"
                                value={message}
                                onChange={(event) => setmessage(event.target.value)}
                            />
                            <button className="ui positive button messageButton" type="submit">
                                Send Message
                            </button>
                        </form>
                    </Fragment>
                ) : (
                    <h4>Please Log In to send a message.</h4>
                )}
            </div>
        </div>
    );
};

export default Post;
