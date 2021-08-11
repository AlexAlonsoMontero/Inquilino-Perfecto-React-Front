import { useParams } from 'react-router'
import { useAdvSearcher } from '../../hooks/inmowebApi'
import { AutoComplete, DatePicker, Space } from 'antd';
import Map from '../Map/Map'

import './Advertisement.css'


const Advertisement = () => {
    const queryString = require('query-string');
    const  anuncio_uuid   = `?${queryString.stringify(useParams())}`
    console.log(queryString.stringify(useParams()))
    let adv;
    const advData = useAdvSearcher(anuncio_uuid)
    const handleBooleanString = bool=> (adv.amueblado ? "Si": "No")
    
    if(advData){
        console.log(advData)
        adv = advData.data[0]
        console.log("imprimo adv")
        console.log(adv)
    
    }else{
        return <h2>Cargando datos solicitados ...</h2>
    }
    return  adv && (
        <div>
            <div>
                <div className="AdvImageContainer"> </div>
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
                <Map adress={{cp:adv.cp, calle:adv.calle, numero:adv.numero, fecha_disponibilidad:adv.fecha_disponibilidad,
                ciudad:adv.ciudad, comunidad:adv.comunidad, provincia:adv.provincia, precio:adv.precio }}/>


            </div>
        </div>
    )
}

export default Advertisement