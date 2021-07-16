import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useState } from 'react'
import { geocodeByAddress } from 'react-google-places-autocomplete';



const Autocomplete = () => {
    const [direccion, setDireccion] = useState()
    const [datos, setDatos] = useState()
    if(direccion){
        geocodeByAddress(direccion.label)
        .then(results => setDatos(results))
        .catch(error => console.error(error));
    }
    console.log(datos)
    
    return (
        <>
            <GooglePlacesAutocomplete apiKey="AIzaSyDBbYSjPW4Bc_0AIL65pvPeytfw5f-dzps" 
                apiOptions={{ language: 'es', region: 'es' }}
                selectProps={{
                    direccion,
                    onChange: setDireccion,
                }}
                
                autocompletionRequest={{
                        componentRestrictions: {
                        country: ['es'],
                }
                }}
            />
        </>
    )
}

export default Autocomplete