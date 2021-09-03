import { useParams } from 'react-router'
import './Advertisement.css'
import { useState } from 'react';
import { backRoutes } from '../../routes';
import { useEffect } from 'react';
import { Space, DatePicker, Carousel } from 'antd';
const Advertisement = () => {
    const queryString = require('query-string');
    const  anuncio_uuid   = `?${queryString.stringify(useParams())}`
    const [adv, setAdv] = useState()
    const [images, setImages] = useState()
    const handleBooleanString = bool=> (bool ? "Si": "No")
    
    // const images =useGetImages(`img_inmuebles/?inmueble_uuid=${advData.data[0].inmueble_uuid}`,{method:'GET'})
    // console.log(images)
    
    // if(advData){
    //     adv = advData.data[0]
    // }else{
    //     return <h2>Cargando datos solicitados ...</h2>
    // }
    
    useEffect(() => {
        const getAdvAndImges = async() =>{
            const data = await fetch(backRoutes.r_advSearcher + anuncio_uuid)
            const results = await data.json()
            setAdv(results.data[0])
            const data2 = await fetch(`${backRoutes.r_getImagesInmueblesInmuebleUUID}${results.data[0].inmueble_uuid}`)
            const results2 = await data2.json()
            setImages(results2.data)
        }
        getAdvAndImges()
        
        
    }, []);

    
    if(!adv){
        return <p>Cargando datos...</p>
    }

    return (
        <div>
            <div>
                <div className="AdvImageContainer">
                    {images &&
                        <Carousel autoplay>
                            {images.map(img=>{
                                    return(
                                        <div key={img.img_inmueble_uuid} className={"advCarouselImgContainer"}>
                                            <img src={backRoutes.r_host_port + img.img_inmueble.slice(1)} />
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                    }
                </div>
                <h1>Inmueble en alquiler:</h1>
                <h2>Datos de reserva</h2>
                <p><span>Precio</span> { adv.precio }€/mes <span>Fecha disponibilidad {adv.fecha_disponibilidad} </span> </p>
                <div className="advertisementDataContainer">
                    <Space direction="vertical">
                        <DatePicker format='DD-MM-YYYY' placeholder="Fecha entrada" showToday='true' className="primary-input date-picker" />
                    </Space>
                    <Space direction="vertical">
                        <DatePicker format='DD-MM-YYYY' placeholder="Fecha salida" showToday='true' className="primary-input date-picker" />
                    </Space>
                </div>
                <button className="primary-button">Solicitar reserva</button>
                <div>
                    <h2>Direccion:</h2>
                    <p><span>Comunidad</span> {adv.comunidad} <span>Provincia</span> {adv.provincia} </p>
                    <p><span>Numero</span> {adv.numero} <span>Piso</span> {adv.piso} <span>C.P.</span> {adv.cp} </p>
                </div>
                <div>
                    <h2>Características</h2>
                    <p><span>Metros cuadrados</span> {adv.m2} <span>Amueblado </span> {handleBooleanString(adv.amueblado)} </p>
                    <p><span>Calefaccion</span> {handleBooleanString(adv.calefaccion)} <span>Aire acondicinado</span> {handleBooleanString(adv.aire_acondicionado)} </p>
                    <p><span>Terraza</span> {handleBooleanString(adv.terraza)} <span>Jardin</span> {handleBooleanString(adv.jardin)} </p>
                    <p><span>Piscina</span> {handleBooleanString(adv.piscina)} </p>
                </div>
                


            </div>
        </div>
    )
}

export default Advertisement