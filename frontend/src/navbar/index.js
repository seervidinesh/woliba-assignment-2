import React, { useEffect } from "react";
import "./navbar.style.css";

export const Navbar = ({ showModal, userName, handleLogout, createFeed }) => {
    useEffect(() => {}, [userName]);
    return (
        <div id="main-navbar" className="navbar">
            <h2 className="logo">
                <a href="/">Woliba</a>
            </h2>
            {
                !!userName ?
                    <ul className="nav">
                        <li>{ userName }</li>
                        <li onClick={handleLogout}>Logout</li>
                        <li onClick={createFeed}>Create Feed</li>
                    </ul>
                    : <ul className="nav">
                        <li onClick={() => showModal('')}>Login</li>
                        <li onClick={() => showModal('SIGNUP')}>Sign Up</li>
                    </ul>
            }
        </div>
    );
};
