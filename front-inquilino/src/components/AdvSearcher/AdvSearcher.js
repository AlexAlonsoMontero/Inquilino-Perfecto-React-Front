import prov from '../../data/provincias.json'
import { useEffect, useState } from 'react'
import { backRoutes } from '../../routes'
import useFetch from '../../hooks/useFetch'
import queryString, { stringify } from 'query-string'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import useQueryGenerate from '../../hooks/useQueryGenerate'

const AdvSearcher =()=>{
        const [provincia, setProvincia] = useState("Alemería")
        const [precioMin, setPrecioMin] = useState(0)
        const [precioMax, setPRecioMax] = useState(100000000000)
        const history = useHistory()
        const qpar = [
            {from__precio:precioMin},
            {until__precio:precioMax},
            {provincia: provincia}
        ]       
        const query = useQueryGenerate(qpar)
        
        const handleFilter = async(e) =>{
            e.preventDefault()
            
            console.log(backRoutes.r_advSearcher + query)
            const result = await fetch(backRoutes.r_advSearcher + query)
            const {Data, info } = await (result.json())
            console.log(Data)
            history.push(`/search/adv/${query}`)
            
            
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