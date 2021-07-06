
import logo from './img/logo/logo.jpg'
import './componentsCSS/NavPrincipal.css'
import { NavLink,Link } from "react-router-dom"
import Modal from './Modal'
import Login from './Login'
import { useState } from 'react'
const NavPrincipal = ({setShowModal}) => {
    
    return(
        <div className="navContainer">
            <img src={logo} alt="logo"/>
            <ul>
                <li><NavLink to="/">Inicio</NavLink></li>
                <li><NavLink to="/">Viviendas</NavLink></li>
                <li><NavLink to="/">Quienes Somos</NavLink></li>
            </ul>
            <div className="navLoginContainer">
                <p><Link to="/">Registrate</Link></p>
                <p onClick={()=>setShowModal(true)}>Inicia sesión</p>
            </div>
            
        </div>

    )
}
export default NavPrincipal