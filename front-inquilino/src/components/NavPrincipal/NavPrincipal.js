
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
            <div id="navLogo">
                <img src={logo} alt="logo"/>
            </div>
            
            <ul className={"TextNav"}>
                <li><NavLink to={ routes.home }>INICIO</NavLink></li>
                
                {!user &&       
                    <>
                    <li onClick={()=>setShowModal(true)}><span>INICIA SESIÓN</span></li>
                    <li><Link to={routes.r_register}>REGÍSTRATE</Link></li>
                    </>
                }
                
            </ul>
            {user &&
                    <div id="minUserMenu"><MiniUserMenu /> </div>

                }
        </nav>

    )
}
export default NavPrincipal