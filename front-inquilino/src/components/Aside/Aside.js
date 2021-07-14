import './Aside.css'
import { UserProvider, useUser } from '../../context/UserContext'
import { useState } from 'react'

const Aside = () => {
    const [user, setUser] = useUser()
    const [showSubmenu, setShowSubMenu] = useState(
        {perfil:false},
        {inquilino:false},
        {resenas: false},
        {casero:false},
        {anuncios: false},
        {reservas: false}
    )

    const  pruebas =() =>{
        
    }
    
    return user && (
        <nav className="asideNav">
            <ul>
                <li onClick={() => setShowSubMenu({...showSubmenu, perfil:!showSubmenu.perfil})} > { (showSubmenu.perfil ? "-" : "+") }Pérfil</li>
                    {showSubmenu.perfil && 
                    <ul>
                        <li>Datos de acceso</li>
                        <li>Datos personales</li>
                    </ul>
                    }
                {user.user.tipo==="CASERO"   && 
                <div>    
                    <li onClick={() => setShowSubMenu({...showSubmenu, inquilino:!showSubmenu.inquilino})} > 
                        { (showSubmenu.inquilino ? "-" : "+") }
                        Inquilino
                    </li>
                        {showSubmenu.inquilino &&
                            <ul>
                                <li>Buscar anuncios</li>
                                <li onClick={()=> setShowSubMenu({...showSubmenu,resenas:!showSubmenu.resenas})}>
                                    { (showSubmenu.resenas ? "-" : "+") }
                                    Reseñas
                                </li>
                                    {showSubmenu.resenas &&
                                        <ul>
                                            <li>Historico reseñas</li>
                                            <li>Gestión de reseñas</li>
                                        </ul>
                                    }
                            </ul>
                        }
                </div>}
                {user.user.tipo==="CASERO" &&
                    <div>
                        <li  onClick={()=> setShowSubMenu({ ...showSubmenu,casero:!showSubmenu.casero })  } >
                            { (showSubmenu.casero ? "-" : "+")}    
                            Casero
                        </li>
                        {showSubmenu.casero && 
                            <ul>
                                <li onClick={()=> setShowSubMenu( { ...showSubmenu,anuncios:!showSubmenu.anuncios } )  }   >
                                    {( showSubmenu.anuncios ? "-" : "+" )}
                                    Gestión de anuncios
                                </li>
                                {showSubmenu.anuncios && 
                                    <ul>
                                        <li>Añadir anuncio</li>
                                        <li>Consultar anuncios</li>
                                    </ul>
                                }
                                    <li>Reservas</li>
                                    <ul>
                                        <li>Gestión reservas activas</li>
                                        <li>Histórico reservas y alquilers</li>
                                    </ul>
                                    <li>Gestión reseñas</li>
                                </ul>
                        }
                    </div>
                }
                <li>Admin</li>
                    <ul>
                        <li>Gestión usuarios</li>
                        <li>Gestión anuncios</li>
                        <li>Gestión reservas</li>
                        <li>Gestión reseñas</li>
                    </ul>
                <li>Facturación  y administración</li>
                    <ul>
                        <li>Facturación</li>
                        <li>Anuncios</li>
                        <li>Reservas</li>
                        <li>Reseñas</li>
                    </ul>
            </ul>
        </nav>
    )
}
export default Aside