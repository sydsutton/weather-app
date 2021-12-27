import React, { useState } from "react"

const NavbarComponent = () => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark navbar-expand-md">
                <a href="/" className="navbar-brand">Home</a>
                <button className="navbar-toggler">
                    <span className="navbar-toggler-icon small"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a href="/" className="nav-link">Current Weather</a>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="nav-link">7 Day Forecast</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavbarComponent