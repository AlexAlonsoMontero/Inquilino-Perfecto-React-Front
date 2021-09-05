import { Redirect, useHistory, useParams } from "react-router"
import { useUser } from "../../context/UserContext"
import { routes, backRoutes } from "../../routes"
import { useEffect } from "react"
import { useState } from "react"
import { FormOutlined, DeleteOutlined, PlusSquareTwoTone  } from "@ant-design/icons"
import { Link } from "react-router-dom"
import './ControlPanelCasero.css'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { template } from "@babel/core"


const ControlPanelCasero = () =>{
    const history = useHistory()
    const [user] = useUser()
    const  {username}   = useParams()
    const [properties, setProperties] = useState([])
    const [confirmDelete, setConfirmDelete]=useState()
    const [totalReservs, setTotalReservs] = useState({
        TOTAL:0,
        PENDIENTE:0,
        ACEPTADA:0,
        RECHAZADO:0,
        
    })
    const [reservs,setReservs] = useState()


    useEffect(() => {
        setConfirmDelete(false)
        if(!user || user.tipo==="INQUILINO"){
            {alert("Usuario sin acceso , regístrese como casero. Gracias")}
            return   <Redirect to={routes.home} />
        }else{
            const getPropAndReserv = async() =>{
                const result= await fetch(backRoutes.r_PropertiesSelfUser + username,{                    
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token
                    },
                })
                const {data} = await result.json()
                
                setProperties(data)
                console.log(backRoutes.r_reservsByUserUuid + user.user.user_uuid)
                const reservResults = await fetch(backRoutes.r_reservsByUserUuid + user.user.user_uuid ,{
                    method: 'GET',
                    headers:{
                        'Authorization': 'Bearer ' + user.token
                    },
                })
                const resultsData = await reservResults.json()
                const pendientes = resultsData.Data.filter(item=>{
                    return item.estado_reserva==='PENDIENTE'
                })
                const aceptada =resultsData.Data.filter(item=>{
                    return item.estado_reserva==='ACEPTADA'
                })

                const rechazado = resultsData.Data.filter(item=>{
                    return item.estado_reserva==='RECHAZADO'
                })
                

                setTotalReservs({TOTAL:resultsData.Data.length, PENDIENTE:pendientes.length, ACEPTADA:aceptada.length, RECHAZADO:rechazado.length})
                setReservs(resultsData.Data)
            }


            getPropAndReserv() 
        }  
        
    },[confirmDelete] );
    

    const handleDelete = (e, prop) =>{
        
        confirmAlert({
            title: 'Confirmar',
            message: 'Desea eliminar este  inmueble.',
            buttons: [
                {
                    label: 'Si',
                    onClick: () => noShowProp()
                },
                {
                    label: 'No',
                    onClick: () => alert("Borrado cancelado. Gracias")

                }
                
            ]
          });
        

        const noShowProp = async() =>{
            prop.disponibilidad=false
            const fdProp =new FormData()
            for (let cont =0; cont <Object.keys(prop).length; cont++){
                fdProp.append(Object.keys(prop)[cont],Object.values(prop)[cont])
            }
            const data = await fetch(backRoutes.r_Properties + prop.inmueble_uuid,{
                body:fdProp,
                method: 'PUT',
                headers:{
                'Authorization': 'Bearer ' + user.token
                },
            })
            setConfirmDelete(true)
            
        }
        

    }
    
    if(properties.length >0){
        return (
            <div className="propertyCrudContainer">
                <h1 className={"bodyHeader"} >Listado de inmuebles {username}</h1>
                <p><Link to={routes.r_PropertyNewProp} className={"primary-button linkButton"} >Añadir nuevo imueble </Link></p>
                {totalReservs &&   
                    <p> Reservas: Total <span className={"spanTotalReserv"}> {totalReservs.TOTAL} </span>               
                    Pendientes <span className={"spanPendientesReserv"}> {totalReservs.PENDIENTE}  </span> 
                    Aceptadas <span className={"spanAceptadaReserv"}> {totalReservs.ACEPTADA} </span> 
                    Rechazadas<span className={"spanRechazadaReserv"}> {totalReservs.RECHAZADO} </span> 
               
                </p>}
                <table className={"crudTable"}>
                    <tr>
                        <th>Provincia</th>
                        <th>Ciudad</th>
                        <th>Calle</th>
                        <th>Número</th>
                        <th>Piso</th>
                        <th>C.P.</th>
                        <th>Inmuebles</th>   
                        <th>Anuncios</th>
                        <th>Reservas</th>
                    </tr>
                    {properties.map((prop=>{
                        return(
                            <tr key={prop.inmueble_uuid}>
                                <td>{prop.provincia}</td>
                                <td>{prop.ciudad}</td>
                                <td>{prop.calle}</td>
                                <td>{prop.numero}</td>
                                <td>{prop.piso}</td>
                                <td>{prop.cp}</td>
                                <td > <Link to={routes.r_updatePropertiesUser + '/' +prop.inmueble_uuid}>  <FormOutlined /> </Link><DeleteOutlined onClick={e=>handleDelete(e, prop)} /> </td>
                                <td > <Link to={routes.r_updatePropertiesUser + '/' +prop.inmueble_uuid}><PlusSquareTwoTone />  </Link> <Link to={routes.r_updatePropertiesUser + '/' +prop.inmueble_uuid}>  <FormOutlined /> </Link></td>
                               
                                    <td > 
                                        <Link to ={routes.r_ReservPanelByProperty + '/' + prop.inmueble_uuid} > 
                                            <span className={"spanPendientesReserv"}>    { reservs && reservs.filter(item=>{ if(item.inmueble_uuid===prop.inmueble_uuid && item.estado_reserva==="PENDIENTE"){return item}}).length }</span>
                                            <span className={"spanAceptadaReserv"}>    { reservs && reservs.filter(item=>{ if(item.inmueble_uuid===prop.inmueble_uuid && item.estado_reserva==="ACEPTADA"){return item}}).length }</span>
                                            <span className={"spanRechazadaReserv"}>    { reservs && reservs.filter(item=>{ if(item.inmueble_uuid===prop.inmueble_uuid && item.estado_reserva==="RECHAZADO"){return item}}).length }</span>
                                            <span className={"spanTotalReserv"}>    { reservs && reservs.filter(item=>{ if(item.inmueble_uuid===prop.inmueble_uuid ){return item}}).length } </span>
                                        </Link>
                                    </td>
                                
                            </tr>
                            )
                    }))

                    }
                </table>
            </div>
            )
    }else{
        return (<h1 className={"bodyHeader"} > {username} no dispone de inmuebles dados de alta</h1>)
    }
    
}
export default ControlPanelCasero