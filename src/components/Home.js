import React from "react";

const Home = ({ Token }) => {
    return (
        <div className="ui placeholder segment">
            <div className="ui stackable very relaxed two column grid">
                <div className="column">
                    <form className="ui form">
                        <div className="field">
                            <label>Username</label>
                            <div className="ui left icon input">
                                <input type="text" placeholder="Username" />
                                <i aria-hidden="true" className="user icon"></i>
                            </div>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <div className="ui left icon input">
                                <input type="password" />
                                <i aria-hidden="true" className="lock icon"></i>
                            </div>
                        </div>
                        <button className="ui primary button">Login</button>
                    </form>
                </div>
                <div className="middle aligned column">
                    {}
                </div>
            </div>
            <div className="ui vertical divider"></div>
        </div>
    );
};

export default Home;
