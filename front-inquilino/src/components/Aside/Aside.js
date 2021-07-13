
const Aside = () => {
    return (
        <nav className="asideNav">
            <ul>
                <li>Pérfil</li>
                    <ul>
                        <li>Datos de acceso</li>
                        <li>Datos personales</li>
                    </ul>
                <li>Inquilino</li>
                    <ul>
                        <li>Buscar anuncios</li>
                        <li>Reseñas</li>
                            <ul>
                                <li>Historico reseñas</li>
                                <li>Gestión de reseñas</li>
                            </ul>
                    </ul>
                <li>Casero</li>
                    <ul>
                        <li>Gestión de anuncios</li>
                            <ul>
                                <li>Añadir anuncio</li>
                                <li>Consultar anuncios</li>
                            </ul>
                        <li>Gestión anuncios</li>
                        <li>Reservas</li>
                            <ul>
                                <li>Gestión reservas activas</li>
                                <li>Histórico reservas y alquilers</li>
                            </ul>
                        <li>Gestión reseñas</li>
                    </ul>
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