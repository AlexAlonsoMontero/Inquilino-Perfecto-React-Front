
import logo from './logo.jpg'
import './componentsCSS/NavPrincipal.css'
import { NavLink,Link } from "react-router-dom"
import { logDOM } from '@testing-library/dom'
const NavPrincipal = () => {
    return(
        <div className="navContainer">
            <img src={logo} alt="logo"/>
            <ul>
                <li><NavLink to="/">Inicio</NavLink></li>
                <li><NavLink to="/">Viviendas</NavLink></li>
                <li><NavLink to="/">Quienes Somos</NavLink></li>
            </ul>
            <div className="loginContainer">
                <p><Link to="/">Registrate</Link></p>
                <p><Link to="/">Inicia sesión</Link></p>
            </div>
        </div>
    )
}
export default NavPrincipal