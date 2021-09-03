import './AddProperty.css'
import {useUser} from '../../../context/UserContext'
import useVerifiateUser from '../../../hooks/useVerificateUser'
import { useState, useEffect, useCallback } from 'react'
import  AutoCompleteG  from '../../AutocompleteG/AutocompleteG'
import { parse_googleAdress } from '../../../utils'
import { Redirect } from 'react-router-dom'
import { Checkbox } from 'antd'
import { MapContainer, TileLayer, Marker} from 'react-leaflet'
import { backRoutes } from '../../../routes'


const AddProperty = () =>{
    const [map,setMap] =useState(null)
    const [user] = useUser()
    const [property, setProperty] = useState({})
    const [adress, setAdress] = useState([])
    const [coordinates, setCoordinates] = useState()
    const userVerification =useVerifiateUser(user.user,["CASERO","INQUILINO/CASERO"])
    const [imageStyle,setImageStyle]=useState([])
    const [files, setFiles] =useState([])


    const setAdressParams = (adress, coordinates) =>{
        setAdress(adress)
        setCoordinates(coordinates)
        map.flyTo(coordinates, 13)
        
    }
    useEffect(()=>{
        
        if(adress.length>0){
            if (adress.length>0 && coordinates){
                setProperty(parse_googleAdress(adress,coordinates))
                
            }         
        }
       
    },[adress])
    if(userVerification===false || !user){
        alert ("Solo los usuarios registrados como caseros pueden dar de alta inmuebles")
        return <Redirect to="/"/>
    }
    
    const handleImagesProperty = (e) => {
            if(e.target.files.length<2){
                console.log(e.target.files[0])
                setImageStyle([...imageStyle, ({backgroundImage: 'url(' + URL.createObjectURL(e.target.files[0]) + ')' })])
                    setFiles( [...files,e.target.files[0]])
                    
                }
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const fdProp = new FormData()
        for (let cont = 0; cont<Object.keys(property).length; cont ++){
            fdProp.append(Object.keys(property)[cont], Object.values(property)[cont])
        }
        for (let cont = 0; cont<files.length; cont++){
            fdProp.append('file', files[cont])
        }
        // ********************************* FETCH
        const addProperty = await fetch(backRoutes.r_Newproperties,{
            body:fdProp,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
        const res = await addProperty.json()
        console.log(res)

        /***********************************AXIOS */
        // const addProperty = axios({
        //     method: 'post',
        //     data: fdProp,
        //     headers:{
        //         'Content-Type': 'multipart/form-data',
        //         'Authorization': 'Bearer ' + user.token
        //     }.then(function(response){
        //         console.log(response)
        //     })
        // })
    }
    return (
        <div className="addPropertyContainer">
            <h1>Añadir inmueble</h1>
            
            
            <form className="addProperty-form" onSubmit={ handleSubmit }>
                <div id="addPropertyAutocomplete">
                    <AutoCompleteG setAdressParams={setAdressParams} />
                </div>
                <div className="addPropertyData-container">
                    <input type="text" className="primary-input" placeholder="calle" value={property.calle}  onChange={e=> setProperty({...property,calle:e.target.value})  } required />
                    <input type="text" className="primary-input" placeholder="Ayuntamiento" value={property.ciudad} onChange={e=> setProperty({...property,ciudad:e.target.value})  } required/>
                    <input type="text" className="primary-input" placeholder="Piso" value={property.piso} onChange={e=> setProperty({...property,piso:e.target.value})  } required/>
                    <input type="text" className="primary-input" placeholder="Provincia" value={property.provincia} onChange={e=> setProperty({...property,provincia:e.target.value})  } required/>
                    <input type="text" className="primary-input" placeholder="Comunidad" value={property.comunidad} onChange={e=> setProperty({...property,comunidad:e.target.value})  } required/>
                    <input type="text" className="primary-input" placeholder="C:P:" value={property.cp} onChange={e=> setProperty({...property,cp:e.target.value})  } required/>
                    <input type="text" className="primary-input" placeholder="Numero" value={property.numero} onChange={e=> setProperty({...property,numero:e.target.value})  } required/>
                    <input type="number" className="primary-input"  min="0"  placeholder="Metros" value={property.metros_2} onChange={e=> setProperty({...property,metros_2:e.target.value})  } required/>
                    <input type="number" className="primary-input"  min="0"  placeholder="Numero baños" value={property.banos}  onChange={e=> setProperty({...property,banos:e.target.value})  } required/>
                    <input type="number" className="primary-input"  min="0"  placeholder="Numero Habitaciones"  value={property.habitaciones}  onChange={e=> setProperty({...property,habitaciones:e.target.value})  } required/>
                    <input  className="primary-input"  min="0"  placeholder="Coordenadas x" value={property.lat}  />
                    <input  className="primary-input"  min="0"  placeholder="Coordenadas y" value={property.lng} />
                </div>
                <div className="addpropOptions-container" onSubmit={handleSubmit}>
                    <Checkbox value={property.amueblado}  onChange={e=> setProperty({...property,amlueblado:e.target.checked})  }> Amueblado </Checkbox>
                    <Checkbox value={property.calefaccion}  onChange={e=> setProperty({...property,calefaccion:e.target.checked})  }> Calefacción </Checkbox>
                    <Checkbox value={property.aire_acondicionado}  onChange={e=> setProperty({...property,aire_acondicionado:e.target.checked})  }> Aire Acondicionado </Checkbox>
                    <Checkbox value={property.jardin}  onChange={e=> setProperty({...property,jardin:e.target.checked})  }> Jardin </Checkbox>
                    <Checkbox value={property.terraza}  onChange={e=> setProperty({...property,terraza:e.target.checked})  }> Terraza </Checkbox>
                    <Checkbox value={property.ascensor}  onChange={e=> setProperty({...property,ascensor:e.target.checked})  }> Ascensor </Checkbox>
                    <Checkbox value={property.piscina}  onChange={e=> setProperty({...property,piscina:e.target.checked})  }> Piscina </Checkbox>
                </div>
                <MapContainer 
                center={[40.420, -3.704]}
                zoom={13}
                scrollWheelZoom={false}
                whenCreated={setMap}>
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { property.lat &&
                        <Marker position={[property.lat, property.lng]} />
                    }
                    

                    


                </MapContainer>
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

                            
                <button className="primary-button addProperty-button">Guardar</button>        
            
            </form>
        </div>
    )
}

export default AddProperty