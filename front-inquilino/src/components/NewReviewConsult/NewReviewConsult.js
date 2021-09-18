import { useHistory, useParams } from "react-router"
import { useState, useEffect } from "react"
import { backRoutes } from "../../routes";
import { DateToSTring } from "../../utils";
import { isTSNamedTupleMember } from "@babel/types";
import { Rate } from "antd";
import { useUser } from "../../context/UserContext";
import { routes } from "../../routes";
const NewReviewConsult = () =>{
    const [generalInfo, setGeneralInfo] = useState()
    const [chargeData, setChargeData] = useState(false)
    const params = useParams()
    const queryRoute =`?usr_${params.rol}_uuid=${params.user_uuid}`
    const [stars, setStars] = useState(0)
    const [revContenido, setResContenido] = useState()
    const [user] = useUser()
    const history = useHistory()
    useEffect(() => {
        console.log("entra")
        const reviewData = async() =>{
            const data = await fetch (backRoutes.r_NewReviewsconsult + queryRoute, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const result = await data.json()
            console.log(result)
            setGeneralInfo(result.data)
            
            setChargeData(true)
        }
        reviewData()
        
    }, []);
    
    const onHandleStars = value =>{
        setStars(value)
    }
    
    const onHandleAddRev = async(e,item) =>{
        e.preventDefault()
        if(stars>0){
            const contenido = (revContenido ? revContenido :" ")
            const rev = {
                reserva_uuid: item.reserv_uuid,
                autor_uuid: user.user.user_uuid,
                rol: params.rol.toUpperCase(),
                objetivo:(params.rol==="casero"? "INQUILINO":"CASERO"),
                inmueble_uuid: item.inmu_uuid,
                usr_casero_uuid: item.caser_uuid,
                usr_inquilino_uuid:item.inqui_uuid,
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
            }else{
                alert("La reseña se ha añadido correctamente")
                window.location.reload()
            }
            

        }else{
            alert("La puntuación mínima para una reseña es de 1")
        }
        
        
    }

    if(!generalInfo){return <p>Cargando datos</p>}
    return generalInfo && (
            <div>   
                <table className="crudTable" >
                    <tr>
                        <th>Fecha reserva</th>
                        <th>Fecha inicio</th>
                        <th>Dirección</th>
                        <th>Estado Reserva</th>
                        <th>Reseñas</th>
                    </tr>
               
                    {generalInfo.map(item =>{ 
                        return (
                            <tr>
                                <td>{DateToSTring(item.fecha_reserva)}</td>
                                <td>{DateToSTring(item.fecha_inicio)}</td>
                                <td> {item.Ciudad} {item.calle} {item.numero} </td> 
                                <td> {item.estado_reserva} </td>
                                <td> 
                                    {item.puntuacion && <Rate value={item.puntuacion} disabled/>}  
                                    {!item.puntuacion && 
                                        <form className="addReview" onSubmit={e=>onHandleAddRev(e,item)}>  
                                            {console.log("////////////////////////////////")}
                                            {console.log(item)}
                                            {console.log(generalInfo)}
                                            <Rate  onChange={onHandleStars} />
                                            <input type="text" placeholder={"Texto reseña"}  className={"primary-input"} />
                                            <button className="primary-button" >Añadir Reseña</button>
                                        </form>
                                    
                                    }
                                </td>

                            </tr>
                        )
                    })
                    
                    }
                    </table>
            </div>
        )

}
export default NewReviewConsult