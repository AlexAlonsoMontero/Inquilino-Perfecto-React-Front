import { useParams } from 'react-router'
import { useAdvSearcher } from '../../hooks/inmowebApi'



const Advertisement = () => {
    const queryString = require('query-string');

    const  anuncio_uuid   = `?${queryString.stringify(useParams())}`
    console.log(queryString.stringify(useParams()))
    // console.log(queryString(anuncio_uuid))
    const adv = useAdvSearcher(anuncio_uuid)
    console.log(adv)
    
    return (
        <p>Prueba</p>
    )
}

export default Advertisement