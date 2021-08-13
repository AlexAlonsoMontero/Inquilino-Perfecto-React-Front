import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useState,useEffect } from 'react'
import { geocodeByAddress } from 'react-google-places-autocomplete';



const AutocompleteG = ({setAdress}) => {
    console.log(setAdress)
    const [direccion, setDireccion] = useState()
    const [datos, setDatos] = useState()
    let direccionCompleta= {}
    // console.log(direccion.value.terms)
    useEffect(() => {
       if(direccion){
            geocodeByAddress(direccion.label)
            .then(results => setAdress(results[0].address_components))
            .catch(error => console.error(error));
         }
         
    },[direccion]);
    // const prueba =[...datos]
    
    
    
    
    // if (datos != null){
        
    //     console.log(datos[0].address_components)
    //     direccionCompleta={
    //         calle:datos[0].address_components[0].long_name,
    //         ciudad:datos[0].address_components[1].long_name,
    //         provincia:datos[0].address_components[2].long_name,
    //         comunidad:datos[0].address_components[3].long_name,
    //         pais:datos[0].address_components[4].long_name
    //     }    
    //     console.log(direccionCompleta)
    // }
    
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

export default AutocompleteG