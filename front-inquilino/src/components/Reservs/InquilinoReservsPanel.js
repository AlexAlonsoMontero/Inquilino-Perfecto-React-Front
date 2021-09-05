import { useUser } from "../../context/UserContext"
import { useEffect, useState } from "react"
import { Redirect } from 'react-router-dom'
import { routes, backRoutes} from "../../routes"
import { DateToSTring } from "../../utils"

const InquilinoReservsPanel = () =>{
    const [user] = useUser()
    const [reservs,setReservs] = useState()
    const [filter, setFilter] = useState("TODAS")

    useEffect(() => {
        const getReservs = async() =>{
            console.log(user.user.user_uuid)
            const data = await fetch(backRoutes.r_reservsInquilinoByInquiliUUID + user.user.user_uuid, {
                method: 'GET',
                headers:{
                    'Authorization': 'Bearer ' + user.token
                }
            })
            const results = await data.json()
            setReservs(results.data)

        }
        getReservs()
    }, []);


    if(!user || user.tipo==="CASERO"){
        alert ("Pagina disponible unicamente para usuario con rol casero")
        return <Redirect to={routes.home}/>
    }
    const onHandleEstado = (e)=>{
        setFilter(e)
    }
    if(!reservs){
        return <h1>No hay reservas para el usuario solicitado</h1>
    }
    
    return reservs && (
        <>
            <h1>Reservas de usuario inquilino  {user.user.username} </h1>
            
            <select className="primary-input" name="resEstado" defaultValue="TODAS" onChange={e =>onHandleEstado(e.target.value)}>
                    <option>TODAS</option>
                    <option>PENDIENTE</option>
                    <option>ACEPTADA</option>
                    <option>RECAHAZADO</option>
                </select>

                <table className={"crudTable"}>
                    <tr>
                        <th>Fecha solicitud</th>
                        <th>Fecha entrada</th>
                        <th>Fecha salida</th>
                        <th>Prcio €/mes</th>
                        <th>Estado Reserva</th>
                        <th></th>
                    </tr>
                    
                        {filter && reservs.map(res=>{
                                if (filter==="TODAS"){
                                    return(
                                        <tr key={res.reserva_uuid}>
                                            <td>{DateToSTring(res.fecha_reserva)}</td>
                                            <td>{DateToSTring(res.fecha_inicio)}</td>
                                            <td>{DateToSTring(res.fecha_fin)}</td>
                                            <td>{res.precio_reserva}</td>
                                            <td>{res.estado_reserva}</td>
                                        </tr>
                                    )
                                }else if(res.estado_reserva===filter) {
                                    return(
                                        <tr key={res.reserva_uuid}>
                                            <td>{DateToSTring(res.fecha_reserva)}</td>
                                            <td>{DateToSTring(res.fecha_inicio)}</td>
                                            <td>{DateToSTring(res.fecha_fin)}</td>
                                            <td>{res.precio_reserva}</td>
                                            <td>{res.estado_reserva}</td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    
                </table>
        </>
            
            
        
    )
}
export default InquilinoReservsPanel