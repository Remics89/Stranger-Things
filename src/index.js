import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { fetchPosts, registerUser, userLogin } from "./api/api";
import { Header, AuthorizeUser } from "./components";

const App = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Auth, setAuth] = useState(false);

    return (
        <div className="app">
            <Header />
            <Switch>
                <Route exact path="/Auth">
                    <AuthorizeUser
                        Link
                        Auth={Auth}
                        setAuth={setAuth}
                        Password={Password}
                        setPassword={setPassword}
                        Username={Username}
                        setUsername={setUsername}
                    />
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
