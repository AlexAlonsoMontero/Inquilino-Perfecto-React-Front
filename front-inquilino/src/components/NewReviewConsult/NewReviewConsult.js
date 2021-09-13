import { useParams } from "react-router"
import { useState, useEffect } from "react"
import { backRoutes } from "../../routes";
import Item from "antd/lib/list/Item";
import { isIfStatement, isTSNamedTupleMember } from "@babel/types";
const NewReviewConsult = () =>{
    const [generalInfo, setGeneralInfo] = useState()
    const [chargeData, setChargeData] = useState(false)
    const params = useParams()
    const queryRoute =`?usr_${params.rol}_uuid=${params.user_uuid}`
    useEffect(() => {
        const reviewData = async() =>{
            console.log(backRoutes.r_NewReviewsconsult + queryRoute)
            const data = await fetch (backRoutes.r_NewReviewsconsult + queryRoute, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const result = await data.json()
            setGeneralInfo(result.data)
            console.log(result)
            setChargeData(true)
        }
        reviewData()
    }, []);

    if(!chargeData){
        return <h1>Cargando datos...</h1>
    }else{
        return ( 
            <>
                <h1>Reservas {params.rol}</h1>
                <table className={"crudTable"}>
                    <tr>
                        <th>Fecha solicitud</th>
                        <th>Fecha entrada</th>
                        <th>Fecha salida</th>
                        <th>Prcio €/mes</th>
                        <th>Estado Reserva</th>
                        <th>Dirección</th>
                        <th>Puntuación</th>
                        <th></th>
                    </tr>
                    {generalInfo && generalInfo.map(item=>{
                        if(item.estado_reserva==="ACEPTADA"){
                            return(
                                <tr key={item.resena_uuid + item.id_resena}>
                                    <td>{item.fecha_reserva}</td>
                                    <td>{item.fecha_inicio}</td>
                                    <td>{item.fecha_fin}  </td>
                                    <td>{item.precio_reserva} </td>
                                    <td>{item.estado_reserva} </td>
                                    <td>{item.ciudad} {item.calle} {item.numero} {item.piso}  </td>
                                    <td>{item.puntuacion} </td>
                                </tr>
                            )
                            }
                        
                    })

                    }
                    </table>   
            </>
            
        )
    }
}
export default NewReviewConsult