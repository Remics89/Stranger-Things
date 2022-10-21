import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { fetchPosts, registerUser, userLogin } from "./api/api";
import { Header, AuthorizeUser } from "./components";

const App = () => {
    const [Auth, setAuth] = useState(false);
    const [Token, setToken] = useState(window.localStorage.getItem('token') | "");

    const [AuthMode, setAuthMode] = useState("");

    return (
        <div className="app">
            <Header Auth={Auth} />
            <Switch>
                <Route exact path="/signup">
                    <AuthorizeUser Auth={Auth} setAuth={setAuth} setToken={setToken}/>
                </Route>
                <Route exact path="/login">
                    <AuthorizeUser Auth={Auth} setAuth={setAuth} setToken={setToken}/>
                </Route>
            </Switch>
        </div>
    );
};

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("container")
);
