import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUser, registerUser, userLogin } from "../api/api";

const AuthorizeUser = ({ setToken, setCurrentUser }) => {
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

    const url = action === "Login" ? "Log In" : "Sign Up";

    /*
    user registration
    */

    async function registration(user, pwd) {
        try {
            const data = await registerUser(user, pwd);

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
                    setUsername("");
                    setPassword("");
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

                setSuccess(true);
                setHidden(true);
                setToken(data.data.token);
                const getUsername = await getUser(data.data.token);
                setCurrentUser(getUsername.data.username);

                setTimeout(() => {
                    history.push("/");
                }, 7500);
            } else {
                setMessage(data.error.message);
                setSuccess(false);

                setTimeout(() => {
                    setMessage("");
                    setUsername("");
                    setPassword("");
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
        <form
            className="ui form"
            id="authpage"
            onSubmit={async (event) => {
                event.preventDefault();
                if (url === "Log In") {
                    authUser(Username, Password);
                } else {
                    registration(Username, Password);
                }
            }}>
            <div className="field">
                <h3>{url}</h3>
                <label>{Success ? null : "Username"}</label>
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
                <div className="field">
                    <label>{Success ? null : "Password"}</label>
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
                </div>
                <button className="ui button" type="submit" hidden={Hidden}>
                    {url}
                </button>
                <div
                    className="authMessage"
                    style={Success ? { color: "Green" } : { color: "Red" }}>
                    {Message ? Message : null}
                </div>
            </div>
        </form>
    );
};

export default AuthorizeUser;
