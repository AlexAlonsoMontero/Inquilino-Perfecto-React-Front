import { useLocation } from 'react-router-dom'
import { useGetItem } from '../../hooks/inmowebApi'
const queryString = require('query-string')


const ActivateUser = () =>{
    const { search } = useLocation()
    const initialState = queryString.parse(search) || {}
    console.log(initialState)
    const param = initialState
    const user = useGetItem(param)
    if (user.error){
        return (
            <>
                <h1>Error en la activación, pongase en contancto con el administrador</h1>
                <a href="mailto:soporte_inquilinoperfecto@outlook.com">soporte_inquilinoperfecto@outlook.com</a>
            </>
        )
    }
    return (
        <div>
            <h1>Tu usuario ya ha sido activado, puedes iniciar sesión</h1>
        </div>
        

    )
}

export default ActivateUser