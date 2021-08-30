import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useUser } from '../../../context/UserContext'
import { backRoutes, routes } from '../../../routes'
import { Redirect } from 'react-router'
import { Checkbox } from 'antd'
import './UpdateProperty.css'
const UpdateProperty = () =>{
    const [user]= useUser()
    const [property,setProperty] = useState()
    const queryString = require('query-string')
    const {inmueble_uuid} =  useParams()
    useEffect (()=>{
        if(!user || user.tipo==="INQUILINO"){
            {alert("Usuario sin acceso , regístrese como casero. Gracias")}
            return   <Redirect to={routes.home} />
        }else{
            const getProperty = async() =>{
                console.log("entra")
                const data = await fetch(backRoutes.r_getPropertiesUuid + `${inmueble_uuid}`,{
                    method: 'GET',
                    headers:{
                        'Authorization': 'Bearer ' + user.token
                    }
                })
                const result = await data.json()
                setProperty(result.data[0])
            }
            getProperty()
        }


    },[])
    console.log(property)
    const handleSubmit = ()=> {

    }        
    if(!property){
        return <h1>Cargando datos del inmueble...</h1>
    }
    
    return (
        <div className="updatePropConteiner">
            <h1>Modificar inmueble</h1>
            <form className="updateProperty-form" onSubmit={ handleSubmit }>
                <div className={"updateProperty-container"}>
                    <div className="updatePropertyData-container">
                        <label>Calle
                            <input type="text" className="primary-input" placeholder="calle" value={property.calle}  onChange={e=> setProperty({...property,calle:e.target.value})  } required />
                        </label>
                        <label>Ciudad
                            <input type="text" className="primary-input" placeholder="Ayuntamiento" value={property.ciudad} onChange={e=> setProperty({...property,ciudad:e.target.value})  } required/>
                        </label>
                        <label>Piso
                            <input type="text" className="primary-input" placeholder="Piso" value={property.piso} onChange={e=> setProperty({...property,piso:e.target.value})  } required/>
                        </label>
                        <label>Provincia
                            <input type="text" className="primary-input" placeholder="Provincia" value={property.provincia} onChange={e=> setProperty({...property,provincia:e.target.value})  } required/>
                        </label>
                        <label> Comunidad
                            <input type="text" className="primary-input" placeholder="Comunidad" value={property.comunidad} onChange={e=> setProperty({...property,comunidad:e.target.value})  } required/>
                        </label>
                        <label>C.P.
                            <input type="text" className="primary-input" placeholder="C:P:" value={property.cp} onChange={e=> setProperty({...property,cp:e.target.value})  } required/>
                        </label>
                        <label>Número
                            <input type="text" className="primary-input" placeholder="N´umero" value={property.numero} onChange={e=> setProperty({...property,numero:e.target.value})  } required/>
                        </label>
                        <label>Metros
                            <input type="number" className="primary-input"  min="0"  placeholder="Metros" value={property.metros_2} onChange={e=> setProperty({...property,metros_2:e.target.value})  } required/>
                        </label>
                        <label>Número Baños
                            <input type="number" className="primary-input"  min="0"  placeholder="Numero baños" value={property.banos}  onChange={e=> setProperty({...property,banos:e.target.value})  } required/>
                        </label>
                        <label>Número Habitaciones
                            <input type="number" className="primary-input"  min="0"  placeholder="Numero Habitaciones"  value={property.habitaciones}  onChange={e=> setProperty({...property,habitaciones:e.target.value})  } required/>
                        </label>
                        <label>Latitud
                            <input  className="primary-input"  min="0"  placeholder="Latitud" value={property.lat}  />
                        </label>
                        <label>Longitud
                            <input  className="primary-input"  min="0"  placeholder="Longitud" value={property.lng} />
                        </label>
                    </div>
                    <div className="UpdatePropOptions-container" onSubmit={handleSubmit}>
                        <Checkbox checked={property.amueblado}  onChange={e=> setProperty({...property,amlueblado:e.target.checked})  }> Amueblado </Checkbox>
                        <Checkbox checked={property.calefaccion}  onChange={e=> setProperty({...property,calefaccion:e.target.checked})  }> Calefacción </Checkbox>
                        <Checkbox checked={property.aire_acondicionado} onChange={e=> setProperty({...property,aire_acondicionado:e.target.checked})  }> Aire Acondicionado </Checkbox>
                        <Checkbox checked={property.jardin}  onChange={e=> setProperty({...property,jardin:e.target.checked})  }> Jardin </Checkbox>
                        <Checkbox checked={property.terraza}  onChange={e=> setProperty({...property,terraza:e.target.checked})  }> Terraza </Checkbox>
                        <Checkbox checked={property.ascensor}  onChange={e=> setProperty({...property,ascensor:e.target.checked})  }> Ascensor </Checkbox>
                        <Checkbox checked={property.piscina}  onChange={e=> setProperty({...property,piscina:e.target.checked})  }> Piscina </Checkbox>
                    </div>
                </div>
                <button className={"primary-button updatePropButton"}>Guardar Cambios</button>
            </form>
        </div>
    )
}
export default UpdateProperty