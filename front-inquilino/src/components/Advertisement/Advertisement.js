import { useParams } from 'react-router'
import './Advertisement.css'
import { useState } from 'react';
import { backRoutes } from '../../routes';
import { useEffect } from 'react';
import { Space, DatePicker, Carousel } from 'antd';
import { useUser } from '../../context/UserContext';
const Advertisement = () => {
    const moment = require('moment')
    const [user] =useUser()
    const queryString = require('query-string');
    const  anuncio_uuid   = `?${queryString.stringify(useParams())}`
    const [adv, setAdv] = useState()
    const [images, setImages] = useState()
    const [reserv, setReserv] = useState({})
    const handleBooleanString = bool=> (bool ? "Si": "No")
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

    function onChangeStartDate(date) {
        if(date){
            setReserv({...reserv, fecha_inicio:(`${date._d.getFullYear()}-${date._d.getMonth()+1}-${date._d.getDate()}`)})
        }
    }
    function onChangeFinishDate(date) {
        if(date){
            alert("entra")
            setReserv({...reserv, fecha_fin:(`${date._d.getFullYear()}-${date._d.getMonth()+1}-${date._d.getDate()}`)})
        }
    }

    const ondHandleReserv = () => {
        

        const f_reserva = moment(Date.now()).format('YYYY-MM-DD')
        setReserv ({...reserv,
            usr_casero_uuid:adv.usr_casero_uuid,
            usr_inquilino_uuid: user.user.user_uuid,
            inmuebles_uuid: adv.inmueble_uuid,
            anuncio_uuid: adv.anuncio_uuid,
            fecha_reserva: f_reserva,
            precio_reserva: adv.precio,
            estado_reserva: "PENDIENTE",
            

        })
        console.log(reserv)
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
                        <DatePicker onChange={onChangeStartDate} format='DD-MM-YYYY' placeholder="Fecha entrada" showToday='true' className="primary-input date-picker" />
                    </Space>
                    <Space direction="vertical">
                        <DatePicker onChange={onChangeFinishDate} format='DD-MM-YYYY' placeholder="Fecha salida" showToday='true' className="primary-input date-picker" />
                    </Space>
                </div>
                {(!user || user.tipo==='CASERO') && <p>Para solicitar reserva debe estar registrado y logado como inquilino o casero/inquilino</p>}
                {user && 
                    <button className="primary-button" onClick={ondHandleReserv} >Solicitar reserva</button>
                }
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