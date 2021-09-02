import { useState } from "react"
import { Space, DatePicker } from "antd"
import './AddAdv.css'
import { useEffect } from "react"
import { backRoutes } from "../../routes"
import { useUser } from "../../context/UserContext"

const AddAdv = ({uuids}) =>{
    var moment = require('moment')
    const [existAdv, setExistAdv] = useState(false)
    const [user] = useUser()
    const [adv,setAdv]= useState(uuids)
    const [defaultStartDate, setDefaulStartDate] = useState(moment(Date.now())  )
    
    function onChangeDate(date, dateString) {
        if(date){
            setAdv({...adv, fecha_disponibilidad:(`${date._d.getFullYear()}-${date._d.getMonth()+1}-${date._d.getDate()}`)})
        }
    }

    useEffect(() => {
        const getAdv = async() =>{
            const data = await fetch(`${backRoutes.r_advSearcherByProp}${adv.inmueble_uuid}`,{
                headers:{
                    'Authorization': 'Bearer ' + user.token
                },
            })
            const results = await data.json()
            console.log("LOS RESULTADOSSSSSSSSSSSSSSSSSSSSSSSSSSS")
            console.log(results.data.fecha_disponibilidad)
            if(results.data){
                setExistAdv(true)
                setAdv({...adv, precio: results.data.precio, fecha_disponibilidad: moment(new Date(results.data.fecha_disponibilidad))})
            }
        }
        getAdv()
        
    }, []);
    const handleAddAdv = async(e) => {
        e.preventDefault()
        const data= await fetch(backRoutes.r_getAdvertisement,{
            method:'POST',
            body: JSON.stringify(adv),
            headers: {
                'Authorization': 'Bearer ' + user.token,
                'Content-type': 'application/json'
            }
        })
        const results = data.json()
    }

    return(
        <div className={"controlAdvContainer"}>
            <h2>Publicar Anuncio</h2>
            <form className ="formAnuncio" onSubmit={handleAddAdv}>
                <label>Fecha disponibilidad
                    <Space direction="vertical">
                        <DatePicker onChange={onChangeDate} value={adv.fecha_disponibilidad}  format='DD-MM-YYYY' placeholder="Fecha disponibilidad." showToday='true' className="primary-input date-picker" />
                    </Space>
                </label>
                <label>Precio €/mes
                <input type="number" className="primary-input"  min="0" step="50" placeholder="Precio" value={adv.precio} onChange={ e=>setAdv({...adv,precio:e.target.value})} className="primary-input date-picker"/>
                </label>
                {!existAdv &&
                <button className="primary-button">Publicar anuncio</button>
                }
                {existAdv &&
                <button className="primary-button">Modificar anuncio</button>
                }
            </form>
        </div>
    )
}
export default AddAdv