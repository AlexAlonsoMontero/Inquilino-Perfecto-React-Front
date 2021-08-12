import './AddProperty.css'
import {useUser} from '../../../context/UserContext'
import useVerifiateUser from '../../../hooks/useVerificateUser'
import { backRoutes, routes } from '../../../routes'
import { Redirect } from 'react-router'
const AddProperty = () =>{
    const [user] = useUser()
    const userVerification =useVerifiateUser(user.user,["CASERO","INQUILINO/CASERO"])
    if(userVerification===false){
        alert ("Solo los usuarios registrados como caseros pueden dar de alta inmuebles")
    }
    return (
        <div className="addPropertyContainer">
            <h1>Añadir inmueble</h1>
            <form className="addProperty-form">

            </form>
        </div>
    )
}

export default AddProperty