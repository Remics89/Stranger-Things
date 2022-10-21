import React, { useState } from 'react';


const AuthorizeUser = (props) => {
    const {Auth, setAuth, Password, setPassword, Username, setUsername} = props;



    return (
        <div id="auth">
            <h3>{Auth ? 'Log In' : 'Sign Up'}</h3>
            <form id='auth' onSubmit={async (event) => {
                event.preventDefault();
                setAuth(true);
                console.log(Auth)
            }}>
                <input type="text" placeholder='Enter a username' value={Username} minLength='8' required onChange={(event) => {
                    let inputVal = event.target.value;
                    setUsername(inputVal);
                }} />
                <input type="password" placeholder='Enter a password' value={Password} minLength='8' required onChange={(event) => {
                    let inputVal = event.target.value;
                    setPassword(inputVal);
                }} />
                <button>{Auth ? 'Log In' : 'Sign Up'}</button>
            </form>

        </div>
    )
}

export default AuthorizeUser;