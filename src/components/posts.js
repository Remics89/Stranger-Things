import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Posts = (props) => {
    const { Token, posts, setcurrentPost} = props;

    return (
        <div className="ui cards posts">
            {posts.map((post) => {
                return (
                    <div key={post._id} className="ui card">
                        <div className="content">
                            <div className="header">{post.title}</div>
                            <div className="meta">{post.location}</div>
                            <div className="description cardDescription">{post.description}</div>
                        </div>
                        <div className="extra content">
                            <div className="ui">
                                <Link to="/Posts/post"
                                    className="ui positive basic button"
                                    onClick={() => {
                                        setcurrentPost(post);
                                    }}>
                                    View Post
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Posts;