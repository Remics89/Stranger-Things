import React, { useState, useEffect } from "react";
import { fetchPosts } from "../api/api";
import redX from "./ico/RedX.png";
import greenCheck from "./ico/GreenCheck.png";

const Home = ({ Token, posts, currentUser }) => {
    const [render, setrender] = useState(false);
    const [hide, sethide] = useState(false);
    const [style, setstyle] = useState({});

    const [myPosts, setmyPosts] = useState();

    const authoredPosts = () => {};

    useEffect(() => {
        authoredPosts();
        setrender(true);
        setInterval(() => {
            // hide Loading... 
            sethide(true);
            // render in a overflow scroll 
            if (render) {
                setstyle({ overflow: "scroll" });
            }
        }, 2000);
    }, [posts]);

    return (
        <div className="ui placeholder segment">
            <div className="ui stackable very relaxed two column grid">
                <div className="column">
                    <div className="field" id="homecards" style={style}>
                        <h2 hidden={hide}>Loading Posts ...</h2>
                        {render ? (
                            posts.map((post) => {
                                let dateString = post.createdAt.slice(0, 10);
                                return (
                                    <div key={post._id} className="ui centered card">
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
                                    </div>
                                );
                            })
                        ) : (
                            <h4>You have not created any posts yet</h4>
                        )}
                        <div className="middle aligned column"></div>
                    </div>
                </div>
            </div>
            <div className="ui vertical divider">----- Your Posts | New Post -------</div>
        </div>
    );
};

export default Home;

/*

<div class="ui placeholder segment">
    <div class="ui stackable very relaxed two column grid">
        <div class="column">
            <form class="ui form">
                <div class="field">
                    <label>Username</label>
                    <div class="ui left icon input">
                        <input type="text" placeholder="Username" />
                        <i aria-hidden="true" class="user icon"></i>
                    </div>
                </div>
                <div class="field">
                    <label>Password</label>
                    <div class="ui left icon input">
                        <input type="password" />
                        <i aria-hidden="true" class="lock icon"></i>
                    </div>
                </div>
                <button class="ui primary button">Login</button>
            </form>
        </div>
        <div class="middle aligned column">
            <button class="ui big button">
                <i aria-hidden="true" class="signup icon"></i>Sign up
            </button>
        </div>
    </div>
    <div class="ui vertical divider">Or</div>
</div>;


*/
