import React, { useState } from 'react';

const Header = () => {

    return (
        <div className="header">
            <header className='header'>Stranger's Things</header>
            <a className="links" href='/'>HOME</a>
            <a className="links" href='/Posts'>POSTS</a>
            <a className="links" href='/Login'>LOGIN</a>
            <a className="links" href='/Signup'>SIGN UP</a>
        </div>
    )
}

export default Header;