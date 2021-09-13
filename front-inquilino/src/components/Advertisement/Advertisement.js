import { useHistory, useParams } from 'react-router'
import './Advertisement.css'
import { useState } from 'react';
import { backRoutes } from '../../routes';
import { useEffect } from 'react';
import { Space, DatePicker, Carousel } from 'antd';
import { useUser } from '../../context/UserContext';
import { Rate } from 'antd';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

const Advertisement = () => {
    const moment = require('moment')
    const [user] = useUser()
    const queryString = require('query-string');
    const anuncio_uuid = `?${queryString.stringify(useParams())}`
    const [adv, setAdv] = useState()
    const [images, setImages] = useState()
    const [reserv, setReserv] = useState({})
    const [reviews, setReviews] = useState()
    const handleBooleanString = bool => (bool ? "Si" : "No")
    const history = useHistory()
    useEffect(() => {
        const getAdvAndImges = async () => {
            const data = await fetch(backRoutes.r_advSearcher + anuncio_uuid)
            const results = await data.json()
            setAdv(results.data[0])
            const data2 = await fetch(`${backRoutes.r_getImagesInmueblesInmuebleUUID}${results.data[0].inmueble_uuid}`)
            const results2 = await data2.json()
            setImages(results2.data)
            const f_reserva = moment(Date.now()).format('YYYY-MM-DD')

            if (user) {
                setReserv({
                    ...reserv,
                    usr_casero_uuid: results.data[0].usr_casero_uuid,
                    // usr_inquilino_uuid: user.user.user_uuid,
                    anuncio_uuid: results.data[0].anuncio_uuid,
                    fecha_reserva: f_reserva,
                    precio_reserva: results.data[0].precio,
                    estado_reserva: "PENDIENTE",


                })
            }
            const data3 = await fetch(`${backRoutes.r_reviewByUser}usr_casero_uuid=${results.data[0].usr_casero_uuid}`)
            const results3 = await data3.json()
            setReviews(results3.data)

        }
        getAdvAndImges()
        const getReviews = async () => {
        }

        getReviews()


    }, [user]);

    if (!adv) {
        return <p>Cargando datos...</p>
    }

    function onChangeStartDate(date, dateString) {
        if (date) {
            setReserv({ ...reserv, fecha_inicio: (`${date._d.getFullYear()}-${date._d.getMonth() + 1}-${date._d.getDate()}`) })
        }
    }
    function onChangeFinishDate(date, dateString) {
        if (date) {
            setReserv({ ...reserv, fecha_fin: (`${date._d.getFullYear()}-${date._d.getMonth() + 1}-${date._d.getDate()}`) })

        }
    }

    const ondHandleReserv = async () => {
        if (!reserv.fecha_inicio || !reserv.fecha_fin) {
            alert("Debe seleccionar fecha entrada y fecha de salida antes de solicitar reserva")
        } else {
            const data = await fetch(backRoutes.r_reservs, {
                method: 'POST',
                body: JSON.stringify(reserv),
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-type': 'application/json'

                }
            })
            const results = await data.json()
            if (results.error) {
                alert("No se ha realizado la reserva, verifique que la fecha de inicio es menor que la de fin, y mayor que la de disponibilidad")
            } else {
                alert("Reserva realizada correctamente")
                history.goBack()
            }
        }

    }
    console.log(images)
    return (
        <>
            <h1>Inmueble en alquiler:</h1>
            <div className={"adv-Container"}>
            {images && images.length>0 && adv.lat != 0.0 && adv.lng != 0.0 &&
                <div>
                    {images && images.length>0 &&
                        <div className="AdvImageContainer">
                            <Carousel autoplay centerPadding={true}>
                                {images.map(img => {
                                    return (
                                        <img src={backRoutes.r_host_port + img.img_inmueble.slice(1)} key={img.img_inmueble_uuid} className={"advImgSlider"} />
                                    )
                                })
                                }
                            </Carousel>

                        </div>
                    }
                    {adv.lat != 0.0 && adv.lng != 0.0 &&
                        <div className="advMapContainer">
                            <MapContainer
                                center={[adv.lat, adv.lng]}
                                zoom={5}
                                scrollWheelZoom={false}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[adv.lat, adv.lng]} />
                            </MapContainer>
                        </div>
                    }
                </div>}


                <div>


                    <h2>Datos de reserva</h2>
                    <p><span>Precio</span> {adv.precio}€/mes <span>Fecha disponibilidad {adv.fecha_disponibilidad} </span> </p>
                    <div className="advertisementDataContainer">
                        <Space direction="vertical">
                            <DatePicker onChange={onChangeStartDate} format='DD-MM-YYYY' placeholder="Fecha entrada" showToday='true' className="primary-input date-picker" />
                        </Space>
                        <Space direction="vertical">
                            <DatePicker onChange={onChangeFinishDate} format='DD-MM-YYYY' placeholder="Fecha salida" showToday='true' className="primary-input date-picker" />
                        </Space>
                    </div>
                    {(!user || user.tipo === 'CASERO') && <p className={"error"}>Para solicitar reserva debe estar registrado y logado como inquilino.</p>}
                    {user &&
                        <button className="primary-button solReservaButton" onClick={ondHandleReserv} >Solicitar reserva</button>
                    }
                    <div>
                        <h2>Direccion:</h2>
                        <p><span>Comunidad</span> {adv.comunidad} <span>Provincia</span> {adv.provincia} </p>
                        <p><span>Calle</span> {adv.calle}</p>
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
                {reviews &&
                    <div>
                        <h2>Reseñas casero</h2>
                        {reviews && reviews.map(item => {
                            return (
                                <>
                                    <p key={item.id_resena}><Rate value={item.puntuacion} /></p>
                                    <p> Observaciones: {item.contenido} </p>
                                </>
                            )
                        })}
                    </div>
                }
            </div>
        </>
    )
}

export default Advertisement