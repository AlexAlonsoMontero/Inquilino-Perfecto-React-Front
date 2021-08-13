import './AddProperty.css'
import {useUser} from '../../../context/UserContext'
import useVerifiateUser from '../../../hooks/useVerificateUser'
import { useState, useEffect } from 'react'
import  AutoCompleteG  from '../../AutocompleteG/AutocompleteG'
import { parse_googleAdress } from '../../../utils'
const AddProperty = () =>{
    const [user] = useUser()
    const [property, setProperty] = useState({})
    const [adress, setAdress] = useState([])
    
    useEffect(()=>{
        if(adress.length>0){
            parse_googleAdress(adress)
        }
    },[adress])
    const userVerification =useVerifiateUser(user.user,["CASERO","INQUILINO/CASERO"])
    if(userVerification===false){
        alert ("Solo los usuarios registrados como caseros pueden dar de alta inmuebles")
    }
    return (
        <div className="addPropertyContainer">
            <h1>Añadir inmueble</h1>
            <form className="addProperty-form">
                <input type="text" className="primary-input" placeholder="calle" onChange={e=> setProperty({...property,calle:e.target.value})  }/>
                <input type="text" className="primary-input" placeholder="numero" onChange={e=> setProperty({...property,numero:e.target.value})  }/>
                <AutoCompleteG setAdress={setAdress}/>
            </form>
        </div>
    )
}

export default AddProperty