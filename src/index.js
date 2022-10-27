import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Link, Route, useHistory } from "react-router-dom";
import { fetchPosts, getUser } from "./api/api";
import { AuthorizeUser, Posts, Footer, Home, Post, Dashboard } from "./components";

const App = () => {
    const [currentUser, setCurrentUser] = useState("");
    const [Token, setToken] = useState(window.localStorage.getItem("token") || "");
    const [posts, setPosts] = useState([]);
    const [currentPost, setcurrentPost] = useState({});

    const history = useHistory();

    useEffect(() => {
        const getPosts = async () => {
            try {
                const result = await fetchPosts();
                console.log("🚀 ~ getPosts ~ result", result);
                setPosts(result.posts);
            } catch (error) {
                throw error;
            }
        };
        getPosts();
    }, []);

    useEffect(() => {
        const user = async () => {
            try {
                const result = await getUser(Token);
                return result;
            } catch (error) {
                throw error;
            }
        };
        user();
    }, [Token]);

    useEffect(() => {
        if (Token) {
            window.localStorage.setItem("token", Token);
        } else {
            window.localStorage.removeItem("token");
        }
    }, [Token]);

    const logOut = () => {
        setToken("");
        history.push('/')
    };

    return (
        <div className="app">
            <div className="head">
                <header className="title">Stranger's Things</header>
                <div className="ui menu">
                    <Link className="item" to="/">
                        Home
                    </Link>
                    <Link className="item" to="/Posts">
                        Posts
                    </Link>
                    {Token ? (
                        <Link className="item" to="/Account/Dash">
                            Account
                        </Link>
                    ) : null}
                    {Token ? (
                        <Link className="item" to="/" onClick={logOut}>
                            Log Out
                        </Link>
                    ) : (
                        <Link className="item" to="/Account/Login">
                            Log In
                        </Link>
                    )}
                    {Token ? null : (
                        <Link className="item" to="/Account/register">
                            Sign Up
                        </Link>
                    )}
                </div>
            </div>

            <Switch>
                <Route exact path="/">
                    <Home Token={Token} />
                </Route>
                <Route exact path="/Posts">
                    <Posts Token={Token} posts={posts} setcurrentPost={setcurrentPost} />
                </Route>
                <Route exact path="/Account/:action">
                    <AuthorizeUser setToken={setToken} setCurrentUser={setCurrentUser} />
                </Route>
                <Route path="/Posts/post">
                    <Post currentPost={currentPost} currentUser={currentUser} Token={Token} />
                </Route>
                <Route exact path="/Account/Dash">
                    <Dashboard />
                </Route>
            </Switch>
            <Footer />
        </div>
    );
};

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("container")
);
