import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useUser } from '../../../context/UserContext'
import { backRoutes, routes } from '../../../routes'
import { Redirect } from 'react-router'
import { Checkbox } from 'antd'
import './UpdateProperty.css'
import AddAdv from '../../AdvPanel/AddAdv'
import { useHistory } from 'react-router-dom'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
const UpdateProperty = () =>{
    const [user]= useUser()
    const [property,setProperty] = useState()
    const {inmueble_uuid} =  useParams()
    const [imageStyle,setImageStyle] = useState([])
    const [files,setFiles] =  useState([])
    const [changeImages,setChangeImages] = useState(false)
    const history = useHistory()
    useEffect (()=>{
        if(!user || user.tipo==="INQUILINO"){
            {alert("Usuario sin acceso , regístrese como casero. Gracias")}
            return   <Redirect to={routes.home} />
        }else{
            const getProperty = async() =>{
                const data = await fetch(backRoutes.r_Properties + `${inmueble_uuid}`,{
                    method: 'GET',
                    headers:{
                        'Authorization': 'Bearer ' + user.token
                    }
                })
                const result = await data.json()
                setProperty(result.data[0])
            }
            getProperty()

            const getImages = async() =>{
                const data =await fetch(`${backRoutes.r_getImagesInmueblesInmuebleUUID}${inmueble_uuid}`,{method:'GET'})
                const result=await data.json()
                let img
                const auxArray = []
                for (let cont = 0; cont<result.data.length; cont ++){
                    img= backRoutes.r_host_port + result.data[cont].img_inmueble.slice(1)
                    auxArray.push({backgroundImage: 'url(' + img + ')' })
                    
                }
                setImageStyle(auxArray)
            }
            getImages()
           

        }

    },[])

    const handleSubmit = async(e)=> {
        e.preventDefault()
        const fdProp= new FormData()
        for (let cont =0; cont <Object.keys(property).length; cont++){
            fdProp.append(Object.keys(property)[cont],Object.values(property)[cont])
        }
        for (let cont =0; cont<files.length; cont++){
            fdProp.append('file',files[cont])
        }
        const data = await fetch(backRoutes.r_Properties + property.inmueble_uuid,{
            body:fdProp,
            method: 'PUT',
            headers:{
                'Authorization': 'Bearer ' + user.token
            },
            
        })
        const results = await data.json()
        alert(results.info)

        
        

    }        
    
    const handleImagesProperty = (e) =>{
        if(e.target.files.length<2){
            if(!changeImages){
            setImageStyle([({backgroundImage: 'url(' + URL.createObjectURL(e.target.files[0]) + ')' })])
            setChangeImages(true)
            }else{
                setImageStyle([...imageStyle, ({backgroundImage: 'url(' + URL.createObjectURL(e.target.files[0]) + ')' })])
            }
                setFiles( [...files,e.target.files[0]])
                
        }
    }    
    
    if(!property){
        return <h1>Cargando datos del inmueble...</h1>
    }
    
   
    return (
        

        <div className="updatePropContainer">
            <h1>Modificar inmueble</h1>
            
            <form className="updateProperty-form" onSubmit={ handleSubmit }>
            { property.lat && property.lng &&
            <MapContainer 
            center={[property.lat, property.lng]}
            zoom={5}
            scrollWheelZoom={false}
            >
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                    <Marker position={[property.lat, property.lng]} />
            </MapContainer>
        }
                <div className={"updateProperty-container"}>
                    
                    <div className="updatePropertyData-container">
                        <label><p>Calle</p>
                            <input type="text" className="primary-input" placeholder="calle" value={property.calle}  onChange={e=> setProperty({...property,calle:e.target.value})  } required />
                        </label>
                        <label><p>Ciudad</p>
                            <input type="text" className="primary-input" placeholder="Ayuntamiento" value={property.ciudad} onChange={e=> setProperty({...property,ciudad:e.target.value})  } required/>
                        </label>
                        <label><p>Piso</p>
                            <input type="text" className="primary-input" placeholder="Piso" value={property.piso} onChange={e=> setProperty({...property,piso:e.target.value})  } required/>
                        </label>
                        <label><p>Provincia</p>
                            <input type="text" className="primary-input" placeholder="Provincia" value={property.provincia} onChange={e=> setProperty({...property,provincia:e.target.value})  } required/>
                        </label>
                        <label> <p>Comunidad</p>
                            <input type="text" className="primary-input" placeholder="Comunidad" value={property.comunidad} onChange={e=> setProperty({...property,comunidad:e.target.value})  } required/>
                        </label>
                        <label><p>C.P.</p>
                            <input type="text" className="primary-input" placeholder="C:P:" value={property.cp} onChange={e=> setProperty({...property,cp:e.target.value})  } required/>
                        </label>
                        <label><p>Número</p>
                            <input type="text" className="primary-input" placeholder="N´umero" value={property.numero} onChange={e=> setProperty({...property,numero:e.target.value})  } required/>
                        </label>
                        <label><p>Metros</p>
                            <input type="number" className="primary-input"  min="0"  placeholder="Metros" value={property.metros_2} onChange={e=> setProperty({...property,metros_2:e.target.value})  } required/>
                        </label>
                        <label><p>Número Baños</p>
                            <input type="number" className="primary-input"  min="0"  placeholder="Numero baños" value={property.banos}  onChange={e=> setProperty({...property,banos:e.target.value})  } required/>
                        </label>
                        <label><p>Número Habitaciones</p>
                            <input type="number" className="primary-input"  min="0"  placeholder="Numero Habitaciones"  value={property.habitaciones}  onChange={e=> setProperty({...property,habitaciones:e.target.value})  } required/>
                        </label>
                        <label><p>Latitud</p>
                            <input  className="primary-input"  min="0"  placeholder="Latitud" value={property.lat} />
                        </label>
                        <label><p>Longitud</p>
                            <input  className="primary-input"  min="0"  placeholder="Longitud" value={property.lng} />
                        </label>
                    </div>
                    <div className="UpdatePropOptions-container" onSubmit={handleSubmit}>
                        <Checkbox className="primary-checkbox" checked={property.amueblado}  onChange={e=> setProperty({...property,amlueblado:e.target.checked})  }> Amueblado </Checkbox>
                        <Checkbox className="primary-checkbox" checked={property.aire_acondicionado} onChange={e=> setProperty({...property,aire_acondicionado:e.target.checked})  }> Aire Acondicionado </Checkbox>
                        <Checkbox className="primary-checkbox" checked={property.calefaccion}  onChange={e=> setProperty({...property,calefaccion:e.target.checked})  }> Calefacción </Checkbox>
                        <Checkbox className="primary-checkbox" checked={property.jardin}  onChange={e=> setProperty({...property,jardin:e.target.checked})  }> Jardin </Checkbox>
                        <Checkbox className="primary-checkbox" checked={property.terraza}  onChange={e=> setProperty({...property,terraza:e.target.checked})  }> Terraza </Checkbox>
                        <Checkbox className="primary-checkbox" checked={property.ascensor}  onChange={e=> setProperty({...property,ascensor:e.target.checked})  }> Ascensor </Checkbox>
                        <Checkbox className="primary-checkbox" checked={property.piscina}  onChange={e=> setProperty({...property,piscina:e.target.checked})  }> Piscina </Checkbox>
                    </div>
                </div>
                <div className="propertyImages-container">
                    <label name="propertyImage-label" className="propertyImage-label" onChange={e=>handleImagesProperty(e)}>
                        <div class="property-preview " style={imageStyle[0]}></div>
                        <div class="property-preview"  style={imageStyle[1]}></div>
                        <div class="property-preview"  style={imageStyle[2]}></div>
                        <div class="property-preview"  style={imageStyle[3]}></div>
                        <div class="property-preview"  style={imageStyle[4]}></div>
                        <div class="property-preview"  style={imageStyle[5]}></div>
                    <input className="primary-file-select-property" name="propertyFile" type="file" accept="image/*" />
                            
                            
                </label>
                </div>
                <button className={"primary-button updatePropButton"}>Guardar Cambios</button>
            </form>
            <div className={"updatePropAddv-Container"}>
                <AddAdv uuids={{inmueble_uuid:property.inmueble_uuid,usr_casero_uuid:property.usr_casero_uuid}}/>
            </div>
            

            
            
        </div>

    )
}
export default UpdateProperty