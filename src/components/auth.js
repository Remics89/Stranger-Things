import React, { useState, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import { registerUser, userLogin } from "../api/api";

const AuthorizeUser = (props) => {
    const { Auth, setAuth, setToken } = props;

    /*
    init state
    */

    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Message, setMessage] = useState("");
    const [Hidden, setHidden] = useState(false);
    const [Success, setSuccess] = useState(false);

    /* 
    react modules
    */

    const { action } = useParams();
    const history = useHistory();

    const url = location.pathname;

    /*
    user registration
    */

    async function registration(user, pwd) {
        try {
            const data = await registerUser(user, pwd);
            console.log(data.data.message);

            if (data.success) {
                setHidden(true);
                setMessage(data.data.message);
                setSuccess(true);

                setTimeout(() => {
                    history.push("/");
                }, 7500);
            } else {
                setMessage(data.error.message);
                setSuccess(false);
                setTimeout(() => {
                    setMessage("");
                    setUsername("")
                    setPassword("")
                }, 5000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    /*
    user login 
    */

    async function authUser(user, pwd) {
        try {
            const data = await userLogin(user, pwd);

            if (data.success) {
                setMessage(
                    data.data.message + " You are now being redirected back to the home page."
                );
                setHidden(true);
                setAuth(true);
                setSuccess(true);

                setTimeout(() => {
                    history.push("/");
                }, 7500);
            } else {
                setMessage(data.error.message);
                setSuccess(false);
                setTimeout(() => {
                    setMessage("");
                    setUsername("")
                    setPassword("")
                }, 5000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    /* 
    render registration form
    */

    return (
        <div id="auth">
            <h3>{url === "/Login" ? "Log In" : "Sign Up"}</h3>
            <form
                id="auth"
                onSubmit={async (event) => {
                    event.preventDefault();
                    if (url === "/Login") {
                        authUser(Username, Password);
                    } else {
                        registration(Username, Password);
                    }
                }}>
                <label>{Success ? null : 'Username'}</label>
                <input
                    className="formElms"
                    type="text"
                    placeholder="Enter username"
                    value={Username}
                    minLength="8"
                    required
                    hidden={Hidden}
                    onChange={(event) => {
                        let inputVal = event.target.value;
                        setUsername(inputVal);
                    }}
                />

                <label>{Success ? null : 'Password'}</label>
                <input
                    className="formElms"
                    type="password"
                    placeholder="Enter password"
                    value={Password}
                    minLength="8"
                    required
                    hidden={Hidden}
                    onChange={(event) => {
                        let inputVal = event.target.value;
                        setPassword(inputVal);
                    }}
                />
                <button className="formElms" type="submit" hidden={Hidden}>
                    {url === "/Login" ? "Log In" : "Sign Up"}
                </button>
            </form>
            <div className="authMessage" style={Success ? { color: 'Green'} : { color: 'Red'}}>
                {Message ? Message : null}
            </div>
        </div>
    );
};

export default AuthorizeUser;
