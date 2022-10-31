import React, { useEffect } from "react";

/* Account Dashboard component */

const Dashboard = ({ currentUser }) => {


    /* helper function for main dashboard component returning primary data */

    const myPostsHelper = () => {
        if (currentUser) {
            const allPosts = currentUser.data.posts;
            return allPosts.map((myPost, index) => {
                return (
                    <div key={index} className="ui card" style={{border: "1px dashed black"}}>
                        <div className="content">
                            <div className="header">{myPost.title}</div>
                            <div className="meta">
                                <b>Your Price: </b>
                                {myPost.price}
                            </div>
                            <div className="meta">
                                <b>Your Location: </b>
                                {myPost.location}
                            </div>
                        </div>
                        <div className="content">
                            <div className="description">
                                <b>Description: </b> {myPost.description}
                            </div>
                        </div>
                        {myPost.messages.length > 0 ? (
                            <div className="extra content" >
                                {myPost.messages.map((message, index) => {
                                    return (
                                        <div key={index} className="ui comments" style={{border: "2px solid red", padding: "3px"}}>
                                            <div className="comment">
                                                <div className="content">
                                                    <div className="text">
                                                        <span className="meta">
                                                            <b>Message: </b>
                                                        </span>
                                                        {message.content}
                                                    </div>
                                                    <div className="text">
                                                        <span className="meta">
                                                            <b>Commenter: </b>
                                                        </span>
                                                        {message.fromUser.username}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="content">
                                <div className="text">
                                    <h5>You have no messsages for this post</h5>
                                </div>
                            </div>
                        )}
                    </div>
                );
            });
        }
    };

    /* return statement for main dashboard component */

    return (
        <div className="ui placeholder segment">
            <div className="ui stackable very relaxed centered">
                <div className="field" id="homecards" style={{ overflow: "auto" }}>
                    <h3>Your Received Messages</h3>
                    {myPostsHelper()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;