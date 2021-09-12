import { useUser } from "../../context/UserContext"
import { useEffect, useState } from "react"
import { Redirect } from 'react-router-dom'
import { routes, backRoutes} from "../../routes"
import { DateToSTring } from "../../utils"
import { Rate } from 'antd'
import { useParams } from "react-router"
import './PropertyRservPanel.css'
const InquilinoReservsPanel = () =>{
    const [user] = useUser()
    const [reservs,setReservs] = useState()
    const [filter, setFilter] = useState("TODAS")
    const [props,setProps] = useState()
    const [stars, setStars] = useState(0)
    const [revContenido, setResContenido] = useState()
    const {rol} = useParams()
    
    
    
    useEffect(() => {
        const getReservs = async() =>{
            console.log(backRoutes.r_reservsInquilinoByInquiliUUID + user.user.user_uuid)
            const data = await fetch(backRoutes.r_reservsInquilinoByInquiliUUID + rol + '/' + user.user.user_uuid, {
                method: 'GET',
                headers:{
                    'Authorization': 'Bearer ' + user.token
                }
            })
            const results = await data.json()
            setReservs(results.data)
            const data2 = await fetch(backRoutes.r_Properties,{
                method: 'GET',
                headers:{
                    'Authorization': 'Bearer ' + user.token
                }
            })
            const resutls2 = await data2.json()
            setProps(resutls2.foundProps)
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
    const onHandleAddRev = async(e,res) =>{
        e.preventDefault()
        if(stars>0){
            const contenido = (revContenido ? revContenido :" ")
            const rev = {
                reserva_uuid: res.reserva_uuid,
                autor_uuid: user.user.user_uuid,
                rol: rol.toUpperCase(),
                objetivo:(rol==="casero"? "INQUILINO":"CASERO"),
                inmueble_uuid: res.inmueble_uuid,
                usr_casero_uuid: res.usr_casero_uuid,
                usr_inquilino_uuid:res.usr_inquilino_uuid,
                puntuacion:stars,
                contenido:contenido

            }
            
            const data = await fetch(backRoutes.r_review,{
                method: 'POST',
                body:JSON.stringify(rev),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                }
            })
            const results = await data.json()
            if(results.error){
                alert("No se ha podido almacenar la reseña, " + results.error)
            }
            

        }else{
            alert("La puntuación mínima para una reseña es de 1")
        }
        
        
    }
    const onHandleStars = value =>{
        setStars(value)
    }
    return reservs && (
        <div className={"reservsContainer"}>
            <h1>Reservas de usuario {rol}  {user.user.username} </h1>
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
                    <th>Inmueble</th>
                    <th>Reseñas</th>
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
                                    <td>
                                    {props && props.map(item=>{
                                        if (item.inmueble_uuid === res.inmueble_uuid ){return <p>{item.calle} {item.numero} {item.ciudad} </p>}
                                    })}
                                    </td>
                                    <td>
                                        {res.estado_reserva==="ACEPTADA" &&
                                            <form onSubmit={e=>onHandleAddRev(e,res)}>  
                                                <Rate onChange={onHandleStars}/>
                                                <input type="text" placeholder={"Texto reseña"}  className={"primary-input"} onChange={e=>setResContenido(e.target.value)}  />
                                                <button className="primary-button" >Añadir Reseña</button>
                                            </form>
                                        }
                                    </td>
                                    
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
                                    {res.estado_reserva==="ACEPTADA" &&
                                            <form onSubmit={e=>onHandleAddRev(e,res)}>  
                                                <Rate onChange={onHandleStars}/>
                                                <input type="text" placeholder={"Texto reseña"}  className={"primary-input"} onChange={e=>setResContenido(e.target.value)}  />
                                                <button className="primary-button" >Añadir Reseña</button>
                                            </form>
                                        }
                                    </td>
                                </tr>
                                
                            )
                        }
                        })
                    }
                    
                </table>
        </div>
            
            
        
    )
}
export default InquilinoReservsPanel