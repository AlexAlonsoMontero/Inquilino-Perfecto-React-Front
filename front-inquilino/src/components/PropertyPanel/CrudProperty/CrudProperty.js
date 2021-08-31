import { Redirect, useParams } from "react-router"
import { useUser } from "../../../context/UserContext"
import { routes, backRoutes} from "../../../routes"
import { useEffect } from "react"
import { useState } from "react"
import { FormOutlined, DeleteOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import './CrudProperty.css'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const CrudProperty = () =>{
    const [user] = useUser()
    const  {username}   = useParams()
    const [properties, setProperties] = useState([])
    const [confirmDelete, setConfirmDelete]=useState()

    useEffect(() => {
        setConfirmDelete(false)
        if(!user || user.tipo==="INQUILINO"){
            {alert("Usuario sin acceso , regístrese como casero. Gracias")}
            return   <Redirect to={routes.home} />
        }else{
            const getProp = async() =>{
                const result= await fetch(backRoutes.r_PropertiesSelfUser + username,{                    
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token
                    },
                })
                const {data} = await result.json()
                
                setProperties(data)
            }
            getProp() 
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
                <Link to={routes.r_PropertyNewProp} className={"primary-button linkButton"} >Añadir nuevo imueble </Link>
                <table className={"crudTable"}>
                    <tr>
                        <th>Provincia</th>
                        <th>Ciudad</th>
                        <th>Calle</th>
                        <th>Número</th>
                        <th>Piso</th>
                        <th>C.P.</th>
                        <th>Modifar/Eliminar</th>
                    </tr>
                    {properties.map((prop=>{
                        return(
                            <tr>
                                <td>{prop.provincia}</td>
                                <td>{prop.ciudad}</td>
                                <td>{prop.calle}</td>
                                <td>{prop.numero}</td>
                                <td>{prop.piso}</td>
                                <td>{prop.cp}</td>
                                <td className="icons-crud"> <Link to={routes.r_updatePropertiesUser + '/' +prop.inmueble_uuid}>  <FormOutlined /> </Link><DeleteOutlined onClick={e=>handleDelete(e, prop)} /> </td>

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
export default CrudProperty