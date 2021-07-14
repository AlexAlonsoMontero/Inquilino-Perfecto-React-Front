import './MiniUserMenu.css'
import { useUser } from '../../context/UserContext'
import { routes } from '../../routes'
import { Link, Redirect } from 'react-router-dom'
import { useState } from 'react'
import { Menu, Dropdown,Button } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';


const MiniUserMenu = () =>{
    const [user, setUser] = useUser()
    const [miniMenu, setMinimenu] = useState(false)
    const avatarUrl = ( user && user.user.avatar ? routes.r_host_port + user.user.avatar: routes.r_host_port + "/uploadAvatars/default-avatar.png")
    const avatarSytle = {backgroundImage: 'url(' + avatarUrl +')'}
    const handleMiniMenu = (e) =>{
        setMinimenu(!miniMenu)            
        }
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