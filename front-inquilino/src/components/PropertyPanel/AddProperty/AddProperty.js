import './AddProperty.css'
import {useUser} from '../../../context/UserContext'
import useVerifiateUser from '../../../hooks/useVerificateUser'
import { useState, useEffect } from 'react'
import  AutoCompleteG  from '../../AutocompleteG/AutocompleteG'
import { parse_googleAdress } from '../../../utils'
import Map from '../../Map/Map'
const AddProperty = () =>{
    const [user] = useUser()
    const [property, setProperty] = useState({})
    const [adress, setAdress] = useState([])
    const userVerification =useVerifiateUser(user.user,["CASERO","INQUILINO/CASERO"])
    if(userVerification===false){
        alert ("Solo los usuarios registrados como caseros pueden dar de alta inmuebles")
    }

    useEffect(()=>{
        if(adress.length>0){
            setProperty(parse_googleAdress(adress))
        }
    },[adress])
    
    return (
        <div className="addPropertyContainer">
            <h1>Añadir inmueble</h1>
            <AutoCompleteG setAdress={setAdress}/>
            
            <form className="addProperty-form">
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
                            <label>
                                Amueblado: 
                                <input type="checkbox" className="primary-input" min="0"  />
                            </label>
                            <label>
                                Calefacción: 
                                <input type="checkbox" className="primary-input" min="0"  />
                            </label>
                            <label>
                                Aire Acondicionado: 
                                <input type="checkbox" className="primary-input" min="0"  />
                            </label>
                            <label>
                                Jardin: 
                                <input type="checkbox" className="primary-input" min="0"  />
                            </label>
                            <label>
                                Terraza: 
                                <input type="checkbox" className="primary-input" min="0"  />
                            </label>
                            <label>
                                Ascensor: 
                                <input type="checkbox" className="primary-input" min="0"  />
                            </label>
                            <label>
                                Piscina: 
                                <input type="checkbox" className="primary-input" min="0"  />
                            </label>
                            
                        
            
            {/* <Map mapAdress={[property]}/> */}
            </form>
            <button className="primary-button addProperty-button">Guardar</button>

        </div>
    )
}

export default AddProperty