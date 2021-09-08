import './Aside.css'
import { useUser } from '../../context/UserContext'
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, TeamOutlined,LaptopOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import {LeftCircleTwoTone, RightCircleTwoTone} from '@ant-design/icons'
const Aside = () => {
    const [user] = useUser()
    const [asideContainerClass, setAsideContainerClass] = useState("mostrarAside aside-container")
    const [btnShowMenu,setBtnShowMenu] =useState(false)
    //ANTD
    const handleClick = e => {
        console.log('click ', e);
    };

    const { SubMenu } = Menu;
    
    const handleTranslate = e => {
        e.preventDefault()
        if(asideContainerClass==="mostrarAside aside-container"){
            setAsideContainerClass("ocultarAside  aside-container")
            setBtnShowMenu(true)
        }else{
            setAsideContainerClass("mostrarAside aside-container")
            setBtnShowMenu(false)
        }
    }


    return user && (
        <>
        <div className="asideShowButton">
                
                {!btnShowMenu && <LeftCircleTwoTone onClick={(e)=>handleTranslate(e)}  /> }
                {btnShowMenu && <RightCircleTwoTone onClick={(e)=>handleTranslate(e)} />}
        </div>  

        <div className={asideContainerClass} >
            <Menu
                className="asideMenuShow"
                onClick={handleClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="sub1" icon={<UserOutlined />} title="Perfil de usuario">
                    <Menu.Item key="1"><Link to={`${routes.r_DataUser}${user.user.username}`} >Datos usuario</Link></Menu.Item>
                </SubMenu>
                {(user.user.tipo==="CASERO" || user.user.tipo==="INQUILINO/CASERO") && 
                    <SubMenu key="sub2" icon={<HomeOutlined />} title="Casero">
                        <Menu.Item key="20"><Link to={`${routes.r_ControlPanelCasero}/${user.user.username}`} >Panel de administración </Link>  </Menu.Item>
                        <Menu.Item key="19"><Link to={`${routes.r_PropertyNewProp}`} >Añadir Inmuebles</Link>  </Menu.Item>
                        <Menu.Item key="31"> <Link to={`${routes.r_ReservInquilinoByUUID}/casero/${user.user.user_uuid}`}>Reseñas y reservas aceptadas</Link> </Menu.Item>

                    </SubMenu>
                }
                {(user.user.tipo==="INQUILINO" || user.user.tipo==="INQUILINO/CASERO") &&
                    <SubMenu key="sub4" icon={<TeamOutlined />} title="Inquilino">
                        <Menu.Item key="7"><Link to={routes.home}>Buscar inmuebles</Link>  </Menu.Item>
                        <Menu.Item key="8"><Link to={`${routes.r_ReservInquilinoByUUID}/inquilino/${user.user.user_uuid}`}>Historico Reservas</Link></Menu.Item>
                    </SubMenu>
                }
                {user.user.tipo=== "ADMIN" &&
                <SubMenu key="sub5" icon={<LaptopOutlined />} title="Administrador">
                    <Menu.ItemGroup key="1" title="Gestión:">
                        <Menu.Item key="10">Usuarios</Menu.Item>
                        <Menu.Item key="11">Reservas</Menu.Item>
                        <Menu.Item key="12">Reseñas</Menu.Item>
                        <Menu.Item key="13">Anuncios</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup key="2" title="Estadísticas:">
                        <Menu.Item key="14">Usuarios</Menu.Item>
                        <Menu.Item key="15">Reservas</Menu.Item>
                        <Menu.Item key="16">Reseñas</Menu.Item>
                        <Menu.Item key="17">Anuncios</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                }
            </Menu>
              
        </div>
        </>
    );
}


export default Aside