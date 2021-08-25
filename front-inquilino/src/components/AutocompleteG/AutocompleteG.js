import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useState,useEffect } from 'react'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import './AutocompleteG.css'


const AutocompleteG = ({setAdressParams}) => {
    const [direccion, setDireccion] = useState()
    const [datos,setDatos] = useState([])
    const [coordinates, setCoordinates] = useState()
    let direccionCompleta= {}
    
    useEffect(() => {
        if(direccion){
            geocodeByAddress(direccion.label)
                .then(results => {
                    setDatos(results[0].address_components)
                    getLatLng(results[0])
                        .then((results)=>setCoordinates(results))
                // .then((results)=>    
                .catch(error => console.error(error));
                })
        }
    },[direccion]);
       
    if (datos && coordinates){
        setAdressParams(datos,coordinates)
        // setAdress(datos)
    }    


    return (
        <div id="googleAutocmplete-container">
            <div>
                <GooglePlacesAutocomplete apiKey="AIzaSyDBbYSjPW4Bc_0AIL65pvPeytfw5f-dzps" 
                    apiOptions={{ language: 'es', region: 'es' }}
                    selectProps={{
                        direccion,
                        onChange: setDireccion,
                        placeholder:"Introduce una dirección",
                        styles:{
                            input: (provided) => ({
                            ...provided,
                            color: "#1455F5",
                            }),
                            placeholder: (provided) => ({
                            ...provided,
                            color: "#1455F5",
                            opacity:"0.5"
                            }),
                            control: (provided) => ({
                            ...provided,
                            border: '1px solid #1455F5',
                            margin:'auto'
                            }),
                            dropdownIndicator:(provided) => ({
                            ...provided,
                            color:'1px solid #1455F5'
                            })
                            
                        }
                    }}
                    
                    autocompletionRequest={{
                            componentRestrictions: {
                            country: ['es'],
                    }
                    }}
                    
                />
            </div>
        </div>
    )
}

export default AutocompleteG