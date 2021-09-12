import './MiniAdvertisement.css'
import { Rate } from 'antd';
import { useHistory } from 'react-router-dom'
import { routes, backRoutes } from '../../routes'
import { useGetImages } from '../../hooks/inmowebApi';
import { Carousel } from 'antd'


const MiniAdvertisement = ({advertisements}) =>{
    const history = useHistory()
    const handleAdvertisement = () =>{
        const uuid= advertisements.anuncio_uuid
        history.push(`${routes.r_advertisement}/${uuid}`)
    }
    const images =useGetImages(`${advertisements.inmueble_uuid}`,{method:'GET'})
    return  (
        <div className="miniAdvertisementCotainer">
            <div className="imageContainer">
                <Carousel autoplay centerPadding={"true"} >
                {   
                    images.data &&   
                    
                        images.data.map(item=>{
                            return(
                                <img src = {backRoutes.r_host_port + item.img_inmueble.slice(1)} key={item.img_inmueble_uuid} className={"miAdvCarrouselImage"}  alt="imagen de inmueble en alquiler"/>
                            )
                        })
                }
                </Carousel>
            </div>
            <div className="miniAdvData">
                <p><span>Precio:</span> {advertisements.precio} €/mes <span>F. disponibilidad:</span>  {advertisements.fecha_disponibilidad}</p>
                <p><span>Metros cuadrados: </span> {advertisements.metros_2} <span>Habitaciones:</span> {advertisements.habitaciones} </p>
                <p><span>Ciudad:</span>{advertisements.ciudad}  <span>Calle:</span> {advertisements.calle} </p>
                <p><span>Fecha disponibilidad:</span>{advertisements.fecha_disponibilidad} </p>
                <div className="miniAdvButtonContainer">
                    <button className="primary-button" onClick={handleAdvertisement} >Detalles de anuncio y reserva</button> 
                </div>
            </div>
        </div>
        
    )
}

export default MiniAdvertisement