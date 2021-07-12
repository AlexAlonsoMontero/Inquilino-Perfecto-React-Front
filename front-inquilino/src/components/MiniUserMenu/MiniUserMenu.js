import './MiniUserMenu.css'
import { useUser } from '../../context/UserContext'
import { routes } from '../../routes'
import { Link, Redirect } from 'react-router-dom'
import { useState } from 'react'
const MiniUserMenu = () =>{
    const [user, setUser] = useUser()
    const [miniMenu, setMinimenu] = useState(false)
    const avatarUrl = (user.user.avatar ? routes.r_host_port + user.user.avatar: routes.r_host_port + "/uploadAvatars/default-avatar.png")
    const avatarSytle = {backgroundImage: 'url(' + avatarUrl +')'}
    const handleMiniMenu = (e) =>{
        console.log("entra")
        setMinimenu(!miniMenu)
            
        }
    const handleLogout = () => {
        setUser(user.token="")
        return <Redirect to="/"/>
    }
    
    return (
        <>
             
            <div className="miniMenu-container">
                <div className="miniAvatar-container" style={avatarSytle}></div>
                <span onClick={handleMiniMenu}>{user.user.username}</span>
                
                
            </div>
            {miniMenu &&
            <ul className="miniMenu">
                <li>Perfil</li>
                <hr></hr>
                <li onClick={handleLogout}>Logout</li>
            </ul>
            }
        </>
    )
}

export default MiniUserMenu