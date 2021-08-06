import './MiniAdvertisement.css'
import { Rate } from 'antd';
const MiniAdvertisement = ({advertisements}) =>{
    console.log("adv")
    console.log(advertisements)
    return(
        <div className="miniAdvertisementCotainer">
            <div className="imageContainer">

            </div>
            <div className="miniAdvData">
                <p><span>Precio:</span> {advertisements.precio} €/mes <span>F. disponibilidad:</span>  {advertisements.fecha_disponibilidad}</p>
                <p><span>Metros cuadrados: </span> {advertisements.metros_2} <span>Habitaciones:</span> {advertisements.habitaciones} </p>
                <p><span>Puntuación reseñas:</span> <Rate disabled defaultValue={advertisements.puntuacion} /> </p>
                <div className="miniAdvButtonContainer">
                    <button className="primary-button">Reservas</button> <button className="primary-button">Ver detalles</button>
                </div>
                
            </div>
        </div>
        
    )
}

export default MiniAdvertisement