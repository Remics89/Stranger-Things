import React, { useState } from 'react';

const Header = (props) => {

    const [Location, setLocation] = useState("");

    return (
        <div className="header">
            <header className='header'>Stranger's Things</header>
            <a className="links" href='/'>HOME</a>
            <a className="links" href='/Posts'>POSTS</a>
            <a className="links" href='/Auth'>LOGIN</a>
            <a className="links" href='/Auth'>SIGN UP</a>
        </div>
    )
}

export default Header;