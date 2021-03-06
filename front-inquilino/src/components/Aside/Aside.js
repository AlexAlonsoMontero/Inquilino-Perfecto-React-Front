import './Aside.css'
import { useUser } from '../../context/UserContext'
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, TeamOutlined,LaptopOutlined } from '@ant-design/icons';


const Aside = () => {
    const [user] = useUser()
    
    //ANTD
    const handleClick = e => {
        console.log('click ', e);
    };

    const { SubMenu } = Menu;
    


    return user && (
        <Menu
            className="asideMenu"
            onClick={handleClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Perfil de usuario">
                <Menu.Item key="1">Datos personales</Menu.Item>
                <Menu.Item key="2">Contraseña</Menu.Item>
            </SubMenu>
            {(user.user.tipo==="CASERO" || user.user.tipo==="INQUILINO/CASERO") && 
                <SubMenu key="sub2" icon={<HomeOutlined />} title="Casero">
                    <Menu.Item key="3">Gestión anuncios</Menu.Item>
                    <Menu.Item key="4">Gestión reservas</Menu.Item>
                    <SubMenu key="sub3" title="Alquileres y reservas">
                        <Menu.Item key="5">Gestión reservas</Menu.Item>
                        <Menu.Item key="6">Historico alquileres</Menu.Item>
                    </SubMenu>
                </SubMenu>
            }
            {(user.user.tipo==="INQUILINO" || user.user.tipo==="INQUILINO/CASERO") &&
                <SubMenu key="sub4" icon={<TeamOutlined />} title="Inquilino">
                    <Menu.Item key="7">Buscar inmuebles</Menu.Item>
                    <Menu.Item key="8">Gestión reservas</Menu.Item>
                    <Menu.Item key="9">Gestión reseñas</Menu.Item>
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
    );
}


export default Aside