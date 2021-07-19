import './MiniUserMenu.css'
import { useUser } from '../../context/UserContext'
import { backRoutes } from '../../routes'
import { Redirect } from 'react-router-dom'
import { Menu, Dropdown } from 'antd';


const MiniUserMenu = () =>{
    const [user, setUser] = useUser()
    console.log(user.user.avatar)
    const avatarUrl = ( user && user.user.avatar ? backRoutes.r_host_port + user.user.avatar: backRoutes.r_host_port + "/uploadAvatars/default-avatar.png")
    const avatarSytle = {backgroundImage: 'url(' + avatarUrl +')'}
    const handleLogout = () => {
        setUser(user.token="")
        return <Redirect to="/"/>
    }
    const avatarMenu = (
        <Menu className="avatarMenu" >
            <Menu.Item>
                Perfil
            </Menu.Item>
            <Menu.Item onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
                
                
                
        
    )
    console.log(avatarSytle)
    return user && (
        // <Dropdown overlay={avatarMenu} placement="bottomCenter">
        //     
        //     
        // </Dropdown>
        <Dropdown overlay={avatarMenu} placement="bottomLeft" arrow>
            <div className="avatarUser-cotainer">
                <div className="miniAvatar-container" style={avatarSytle}></div>
                <span>{user.user.username}</span>
            </div>
            
        </Dropdown>
    )
}

export default MiniUserMenu