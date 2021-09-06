import { useState, useEffect } from "react"
import { useUser  } from "../../context/UserContext"
import { routes, backRoutes } from "../../routes"
import { Redirect } from 'react-router-dom'
import { useHistory, useParams } from "react-router"
import { DateToSTring } from "../../utils"



const PropertyRservPanel =  () => {
    const [user] = useUser()
    const {inmueble_uuid} = useParams()
    const [reservs, setReservs] = useState()
    const [filter, setFilter] = useState("TODAS")
    var moment = require('moment')
    const history = useHistory()

    useEffect(() => {
        const getReserv = async() =>{
            const data = await  fetch(backRoutes.r_reservsByInmueble + inmueble_uuid,{
                method: 'GET',
                headers:{
                    'Authorization': 'Bearer ' + user.token
                }
            })
            const results = await data.json()
            setReservs(results.Data)
        }
        getReserv()
    }, []);
    

    if(!user || user.tipo==="INQUILINO"){
        <Redirect to={routes.home} />
    }
    if(!reservs){
        return(
            <p>No se han encontrado reservsas para este inmueble</p>
        )
    }
    const onHandleEstado = (e)=>{
        setFilter(e)
    }

    const onHandleAceptRes =async(e,res,estado)=>{
        e.preventDefault()
        res.estado_reserva =estado
        res.fecha_reserva = moment(res.fecha_disponibilidad).format('YYYY-MM-DD')
        res.fecha_inicio = moment(res.fecha_inicio).format('YYYY-MM-DD')
        res.fecha_fin = moment(res.fecha_fin).format('YYYY-MM-DD')
        const data = await fetch(backRoutes.r_reservs + '/' + res.reserva_uuid, {
            method:'PUT',
            body: JSON.stringify(res),
            headers:{
                'Authorization': 'Bearer ' + user.token,
                'Content-type': 'application/json'
            }
        })
        const results = await data.json()
        if(results.info && estado==="ACEPTADA"){
            alert("Reserva aceptada")
            history.push(routes.r_ControlPanelCasero + '/' + user.user.username)
        }else if(results.info && estado==="RECHAZADO"){
            alert("Reserva rechazada")
            window.location.reload()
        }
    }


    return reservs && (
        <>
            <h1>Reservas</h1>

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
                    <th>Resseñas</th>
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
                                        {res.estado_reserva ==="PENDIENTE" &&
                                            <>
                                            <button  className={"primary-button"} onClick={e=>onHandleAceptRes(e,res,"ACEPTADA")}>Aceptar</button>
                                            <button  className={"primary-button"} onClick={e=>onHandleAceptRes(e,res,"RECHAZADO")}>Rechazar</button>
                                            </>
                                        }
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
                                        <td>
                                        {res.estado_reserva ==="PENDIENTE" &&
                                            <>
                                            <button  className={"primary-button"} onClick={e=>onHandleAceptRes(e,res,"ACEPTADA")}>Aceptar</button>
                                            <button  className={"primary-button"} onClick={e=>onHandleAceptRes(e,res,"RECHAZADO")}>Rechazar</button>
                                            </>
                                        }
                                        </td>
                                        
                                    </tr>
                                )
                            }
                        })
                    }
                
            </table>
        </>
    )
}
export default PropertyRservPanel