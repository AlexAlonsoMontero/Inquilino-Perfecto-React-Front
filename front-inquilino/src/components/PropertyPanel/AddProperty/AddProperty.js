import './AddProperty.css'
import {useUser} from '../../../context/UserContext'
import useVerifiateUser from '../../../hooks/useVerificateUser'
import { useState, useEffect } from 'react'
import  AutoCompleteG  from '../../AutocompleteG/AutocompleteG'
import { parse_googleAdress } from '../../../utils'
import Map from '../../Map/Map'
import { Redirect } from 'react-router-dom'
import { Checkbox } from 'antd'
const AddProperty = () =>{
    const [user] = useUser()
    const [property, setProperty] = useState({})
    const [adress, setAdress] = useState([])
    const [coordinates, setCoordinates] = useState()
    const userVerification =useVerifiateUser(user.user,["CASERO","INQUILINO/CASERO"])
    const setAdressParams = (adress, coordinates) =>{
        setAdress(adress)
        setCoordinates(coordinates)
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
    console.log("propertyyyyyyyyyyy")
    console.log(property)

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
                    <input type="number" className="primary-input"  min="0"  placeholder="Coordenadas x"  />
                    <input type="number" className="primary-input"  min="0"  placeholder="Coordenadas y"  />
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

                            
                <button className="primary-button addProperty-button">Guardar</button>        
            
            {/* <Map mapAdress={[property]}/> */}
            </form>


        </div>
    )
}

export default AddProperty