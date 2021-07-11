
import logo from '../img/logo/logo.jpg'
import './NavPrincipal.css'
import { NavLink,Link } from "react-router-dom"
import { routes } from '../../routes'

const NavPrincipal = ({setShowModal}) => {
    return(
        <div className="navContainer">
            <div>
                <img src={logo} alt="logo"/>
            </div>
            <nav>
                <ul>
                    <li><NavLink to={routes.home}>Inicio</NavLink></li>
                    <li><NavLink to="/">Viviendas</NavLink></li>
                    <li><NavLink to="/">Quienes Somos</NavLink></li>        
                    <li onClick={()=>setShowModal(true)}><span>Inicia sesión</span></li>
                    <li><Link to={routes.r_register}>Registrate</Link></li>
                </ul>
            </nav>
                
        </div>

    )
}
export default NavPrincipal