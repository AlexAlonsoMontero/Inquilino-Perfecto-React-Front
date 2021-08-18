import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useState,useEffect } from 'react'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import './AutocompleteG.css'


const AutocompleteG = ({setAdress}) => {
    const [direccion, setDireccion] = useState()
    const [datos,setDatos] = useState()
    const [coordinates, setCoordinates] = useState()
    let direccionCompleta= {}
    // console.log(direccion.value.terms)
    useEffect(() => {
        if(direccion){
            geocodeByAddress(direccion.label)
                .then(results => {
                    setDatos(results[0].address_components)
                    getLatLng(results[0])
                        .then((results)=>setCoordinates(results))
                .catch(error => console.error(error));
                })
            if(datos && coordinates){
                console.log(datos)
                console.log(coordinates)
                console.log([...datos,coordinates])
                // setAdress([...datos,coordinates])
                // console.log([...datos, {lat:coordinates.lat}, {lng:coordinates.lng}])
            }       
        }
    },[direccion]);
        
    if(datos && coordinates){
        console.log(datos)
        console.log(coordinates)
        console.log([...datos,coordinates])
        // setAdress([...datos,coordinates])
        // console.log([...datos, {lat:coordinates.lat}, {lng:coordinates.lng}])
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