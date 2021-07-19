import { useLocation } from 'react-router-dom'
import { useGetItem } from '../../hooks/inmowebApi'
import useFetch from '../../hooks/useFetch'
const queryString = require('query-string')


const ActivateUser = () =>{
    const { search } = useLocation()
    const initialState = queryString.parse(search) || {}
    console.log(initialState)
    const param = initialState
    console.log(param)
    const user = useGetItem(param)
    console.log("el usuario")
    console.log(user)
    return (
        <h2>Activación de usuario</h2>

    )
}

export default ActivateUser