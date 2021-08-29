import { Redirect, useParams } from "react-router"
import { useUser } from "../../../context/UserContext"
import { routes, backRoutes} from "../../../routes"
import { useEffect } from "react"
import { useState } from "react"
import { FormOutlined, DeleteOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import './CrudProperty.css'
const CrudProperty = () =>{
    const [user] = useUser()
    const  {username}   = useParams()
    const [properties, setProperties] = useState([])
    useEffect(() => {
        if(!user || user.tipo==="INQUILINO"){
            {alert("Usuario sin acceso , regístrese como casero. Gracias")}
            return   <Redirect to={routes.home} />
        }else{
            const getProp = async() =>{
                console.log("entra")
                const result= await fetch(backRoutes.r_getPropertiesUser + username,{
                    method: 'GET',
                    headers:{
                        'Authorization': 'Bearer ' + user.token
                    }
                })
                const {data} = await result.json()
                setProperties(data)
            }
            getProp() 
        }  
        
    },[] );
    
    console.log(properties)

    
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
                                <td className="icons-crud"> <Link to={routes.r_updatePropertiesUser+prop.inmueble_uuid}>  <FormOutlined /> </Link><DeleteOutlined /> </td>

                            </tr>
                            )
                    }))

                    }
                </table>
            </div>
            )
    }else{
        return ("Cargand imuebles")
    }
    
}
export default CrudProperty