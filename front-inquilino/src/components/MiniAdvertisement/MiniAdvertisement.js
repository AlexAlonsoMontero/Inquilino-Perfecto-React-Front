import './MiniAdvertisement.css'
import { Rate } from 'antd';
import { useHistory } from 'react-router-dom'
import { routes } from '../../routes'
const MiniAdvertisement = ({advertisements}) =>{
    const history = useHistory()
    
    const handleAdvertisement = () =>{
        const uuid= advertisements.anuncio_uuid
        history.push(`${routes.r_advertisement}/${uuid}`)
    }
    
    return  (
        <div className="miniAdvertisementCotainer">
            <div className="imageContainer">

            </div>
            <div className="miniAdvData">
                <p><span>Precio:</span> {advertisements.precio} €/mes <span>F. disponibilidad:</span>  {advertisements.fecha_disponibilidad}</p>
                <p><span>Metros cuadrados: </span> {advertisements.metros_2} <span>Habitaciones:</span> {advertisements.habitaciones} </p>
                <p><span>Puntuación reseñas:</span> <Rate disabled defaultValue={advertisements.puntuacion_media} /> </p>
                <div className="miniAdvButtonContainer">
                    <button className="primary-button" onClick={handleAdvertisement} >Reservas</button> <button className="primary-button">Ver detalles</button>
                </div>
            </div>
        </div>
        
    )
}

export default MiniAdvertisement