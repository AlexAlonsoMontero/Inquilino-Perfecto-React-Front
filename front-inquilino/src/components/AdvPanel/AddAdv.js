import { useState } from "react"
import { Space, DatePicker } from "antd"
import './AddAdv.css'
import { useParams } from "react-router"
import { backRoutes } from "../../routes"
import { useUser } from "../../context/UserContext"
const AddAdv = ({uuids}) =>{
    
    const [user] = useUser()
    const [adv,setAdv]= useState(uuids)
    function onChangeDate(date, dateString) {
        if(date){
            setAdv({...adv, fecha_disponibilidad:(`${date._d.getFullYear()}-${date._d.getMonth()+1}-${date._d.getDate()}`)})
        }
    }
    const handleAddAdv = async(e) => {
        e.preventDefault()

        console.log(adv)
        
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
        <div>
            <h2>Publicar Anuncio</h2>
            <form className ="formAnuncio" onSubmit={handleAddAdv}>
                <Space direction="vertical">
                    <DatePicker onChange={onChangeDate} format='DD-MM-YYYY' placeholder="Fecha disponibilidad." showToday='true' className="primary-input date-picker" />
                </Space>
                <input type="number" className="primary-input"  min="0" step="50" placeholder="Precio" onChange={ e=>setAdv({...adv,precio:e.target.value})} />
                <button className="primary-button">Publicar anuncio</button>

            </form>
        </div>
    )
}
export default AddAdv