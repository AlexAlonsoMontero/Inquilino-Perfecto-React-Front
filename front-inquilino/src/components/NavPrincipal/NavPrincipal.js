
import logo from '../img/logo/logo.jpg'
import './NavPrincipal.css'
import { NavLink,Link } from "react-router-dom"
import { routes } from '../../routes'
import { useUser } from '../../context/UserContext'
import MiniUserMenu from '../MiniUserMenu/MiniUserMenu'



const NavPrincipal = ({setShowModal}) => {
    const [user] = useUser()
    return(
        <nav className="navContainer">
            <div>
                <img src={logo} alt="logo"/>
            </div>
            
                <ul>
                    <li><NavLink to={ routes.home }>Inicio</NavLink></li>
                    <li><NavLink to={ routes.r_advSearcher }>Viviendas</NavLink></li>
                    <li><NavLink to="/">Quienes Somos</NavLink></li> 
                    {!user &&       
                        <>
                        <li onClick={()=>setShowModal(true)}><span>Inicia sesión</span></li>
                        <li><Link to={routes.r_register}>Registrate</Link></li>
                        </>
                    }
                    {user &&
                        <li><MiniUserMenu /> </li>

                    }
                </ul>
        </nav>

    )
}
export default NavPrincipal