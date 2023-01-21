import React from 'react'
import "./navbar.css";

import { FiHome } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { RiProfileLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

import logo from "../../images/Logo.png";

const Navbar = () => {
    const path = window.location.pathname;
    const navigate = useNavigate();

    return (
        <div className='navbar'>
            <div className='navbar_logo'>
                <img src = {logo}/>
                <h3>Socialane</h3>
            </div>
            <div className='navbar_menu'>
                <div className='navbar_menu_items' onClick={() => navigate("/feed")}>
                    <span className={path !== "/user-profile" ? "navbar_menu_items_active" : ""}><FiHome /></span>
                </div>
                <div className='navbar_menu_items' onClick={() => navigate("/user-profile")}>
                    <span className={path === "/user-profile" ? "navbar_menu_items_active" : ""}><RiProfileLine /></span>
                </div>
                <div className='navbar_menu_items'>
                    <span><BiMessageSquareDetail /></span>
                </div>
            </div>
        </div>
    )
}

export default Navbar