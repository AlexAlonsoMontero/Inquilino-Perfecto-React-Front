import prov from '../../data/provincias.json'
import { useEffect, useState } from 'react'
import { backRoutes } from '../../routes'
import useFetch from '../../hooks/useFetch'
import queryString, { stringify } from 'query-string'
import { useHistory, useLocation, useParams } from 'react-router-dom'

const AdvSearcher =()=>{
        const [provincia, setProvincia] = useState("Almería")
        const [precioMin, setPrecioMin] = useState(0)
        const [precioMax, setPRecioMax] = useState(100)
        const history = useHistory()
        const backUrl = backRoutes.r_searchMultiTableMultiParams + 'anuncios/inmuebles/inmueble_uuid/inmueble_uuid/?'
        const handleFilter = async(e) =>{
            e.preventDefault()
            const q = 'inmuebles.' + stringify({provincia})
            const result = await fetch(backUrl + q)
            const {data, info} = await (result.json())
            console.log(data)
            history.push(`/search/adv/${q}`)
            
            
        }

        

        return(
            <div>
                <form onSubmit={handleFilter}>
                    <label>
                        Provincias:
                        <select className="primary-input" name="provincias" defaultValue="Almería" onChange={e =>setProvincia(e.target.value)}>
                            {prov.map((p)=>{return(
                                <option key={p.id} > {p.nm} </option>
                            
                            )})}
                        </select>
                    </label>
                    <input type="number" className="primary-input"  min="0" step="100" placeholder="Precio Mínimo" onChange={ e => setPrecioMin(e.target.value) } />
                    <input type="number" className="primary-input"  min="0" step="100" placeholder="Precio máximo" onChange={ e => setPRecioMax(e.target.value)} />
                    <button className="primary-button">Buscar</button>
                </form>    
            </div>
        )
}

export default AdvSearcher