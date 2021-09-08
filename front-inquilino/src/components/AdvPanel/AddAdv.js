import { useState } from "react"
import { Space, DatePicker } from "antd"
import './AddAdv.css'
import { useEffect } from "react"
import { backRoutes, routes } from "../../routes"
import { useUser } from "../../context/UserContext"
import { useHistory } from "react-router-dom"

const AddAdv = ({uuids}) =>{
    var moment = require('moment')
    const [existAdv, setExistAdv] = useState(false)
    const [user] = useUser()
    const [adv,setAdv]= useState(uuids)
    const history = useHistory()
    
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
            if(results.data){
                setExistAdv(true)
                setAdv({...adv,anuncio_uuid:results.data.anuncio_uuid ,precio: results.data.precio, fecha_disponibilidad: new Date(results.data.fecha_disponibilidad)})
            }
        }
        getAdv()
        
    }, []);
    const handleAddAdv = async(e) => {
        e.preventDefault()
        adv.fecha_disponibilidad = moment(adv.fecha_disponibilidad).format('YYYY-MM-DD')
        if(adv.precio){
            const data= await fetch(backRoutes.r_getAdvertisement,{
                method:'POST',
                body: JSON.stringify(adv),
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-type': 'application/json'
                }
            })
            const results = await data.json()
            if(results.data){
                alert("Anucio publicado con éxito")
                history.push(`${routes.r_ControlPanelCasero}/${user.username}`)
            }
        }else{
            alert("Debe introducir un precio para poder publiar el anuncio")
        }
}
    const onHandleModifyAdv = async(e)=>{
        e.preventDefault()
        if(moment(adv.fecha_disponibilidad)){
            adv.fecha_disponibilidad=moment(adv.fecha_disponibilidad).format("yyyy/MM/DD").toString()

        }
        const data = await  fetch(`${backRoutes.r_getAdvertisement}${adv.anuncio_uuid}`,{
            method: 'PUT',
            body: JSON.stringify(adv),
            headers:{
                Authorization: 'Bearer ' + user.token,
                'Content-type': 'application/json'
            }
        })
        const results = await data.json()
        if(results.newData){
            alert("Anuncio modificado con éxito")
            history.push(`${routes.r_ControlPanelCasero}/${user.username}`)

        }
    }

    return(
        <div className={"controlAdvContainer"}>
            <h2>Publicar Anuncio</h2>
            <form className ="formAnuncio" >
                <label>Fecha disponibilidad
                    <Space direction="vertical">
                        <DatePicker onChange={onChangeDate} Name="primary-input date-picker" value={moment(adv.fecha_disponibilidad)}  format='DD-MM-YYYY' placeholder="Fecha disponibilidad." showToday='true' className="primary-input date-picker" />
                    </Space>
                </label>
                <label>Precio €/mes
                <input type="number" className="primary-input"  min="0" step="50" placeholder="Precio" value={adv.precio} onChange={ e=>setAdv({...adv,precio:e.target.value})} className="primary-input date-picker"/>
                </label>
                {!existAdv &&
                <button className="primary-button" onClick={handleAddAdv} >Publicar anuncio</button>
                }
                {existAdv &&
                    <button className="primary-button" onClick={onHandleModifyAdv}>Modificar anuncio</button>
                }
            </form>
                
        </div>
    )
}
export default AddAdv