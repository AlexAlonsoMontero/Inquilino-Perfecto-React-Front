import './AddProperty.css'
import {useUser} from '../../../context/UserContext'
import useVerifiateUser from '../../../hooks/useVerificateUser'
import { useState, useEffect, useCallback } from 'react'
import  AutoCompleteG  from '../../AutocompleteG/AutocompleteG'
import { parse_googleAdress } from '../../../utils'
import { Redirect } from 'react-router-dom'
import { Checkbox } from 'antd'
import { MapContainer, TileLayer, Marker} from 'react-leaflet'
import MapMarker from '../../MapMaker/MapMaker'
const AddProperty = () =>{
    const [map,setMap] =useState(null)
    const [marker, setMarker] = useState(null)
    const [user] = useUser()
    const [property, setProperty] = useState({})
    const [adress, setAdress] = useState([])
    const [coordinates, setCoordinates] = useState()
    const userVerification =useVerifiateUser(user.user,["CASERO","INQUILINO/CASERO"])
    const setAdressParams = (adress, coordinates) =>{
        setAdress(adress)
        setCoordinates(coordinates)
        map.flyTo(coordinates, 13)
        
    }
    useEffect(()=>{
        if(marker){
            marker.setLatLng([property.lat, property.lng])
            
        }
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
    console.log("coordenadas")
    console.log([coordinates])
    
    
    

    return (
        <div className="addPropertyContainer">
            <h1>Añadir inmueble</h1>
            
            
            <form className="addProperty-form">
                <div id="addPropertyAutocomplete">
                    <AutoCompleteG setAdressParams={setAdressParams} />
                </div>
                <div className="addPropertyData-container">
                    <input type="text" className="primary-input" placeholder="calle" value={property.calle}  onChange={e=> setProperty({...property,calle:e.target.value})  }/>
                    <input type="text" className="primary-input" placeholder="Ayuntamiento" value={property.ciudad} onChange={e=> setProperty({...property,ciudad:e.target.value})  }/>
                    <input type="text" className="primary-input" placeholder="Piso" value={property.piso} onChange={e=> setProperty({...property,piso:e.target.value})  }/>
                    <input type="text" className="primary-input" placeholder="Provincia" value={property.provincia} onChange={e=> setProperty({...property,provincia:e.target.value})  }/>
                    <input type="text" className="primary-input" placeholder="Comunidad" value={property.comunidad} onChange={e=> setProperty({...property,comunidad:e.target.value})  }/>
                    <input type="text" className="primary-input" placeholder="C:P:" value={property.cp} onChange={e=> setProperty({...property,cp:e.target.value})  }/>
                    <input type="text" className="primary-input" placeholder="Numero" value={property.numero} onChange={e=> setProperty({...property,numero:e.target.value})  }/>
                    <input type="number" className="primary-input"  min="0"  placeholder="Metros" />
                    <input type="number" className="primary-input"  min="0"  placeholder="Numero baños"  />
                    <input type="number" className="primary-input"  min="0"  placeholder="Numero Habitaciones"  />
                    <input type="number" className="primary-input"  min="0"  placeholder="Coordenadas x" value={property.lat} />
                    <input type="number" className="primary-input"  min="0"  placeholder="Coordenadas y" value={property.lng} />
                </div>
                <div className="addpropOptions-container">
                    <Checkbox> Amueblado </Checkbox>
                    <Checkbox> Calefacción </Checkbox>
                    <Checkbox> Aire Acondicionado </Checkbox>
                    <Checkbox> Jardin </Checkbox>
                    <Checkbox> Terraza </Checkbox>
                    <Checkbox> Ascensor </Checkbox>
                    <Checkbox> Piscina </Checkbox>
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
                        <Marker position={[property.lat, property.lng]} whenCreated={setMarker}/>
                    }
                    

                    


                </MapContainer>
                            
                            
                <button className="primary-button addProperty-button">Guardar</button>        
            
            </form>

        </div>
    )
}

export default AddProperty