import prov from '../../data/provincias.json'
import { useState } from 'react'
import { backRoutes } from '../../routes'
import { useHistory } from 'react-router-dom'
import useQueryGenerate from '../../hooks/useQueryGenerate'
import { DatePicker, Space } from 'antd';
import MiniAdvertisement from '../MiniAdvertisement/MiniAdvertisement'
import './AdvSearcher.css'
import { Checkbox } from 'antd' 


const AdvSearcher =()=>{
        const [provincia, setProvincia] = useState()
        const [precioMin, setPrecioMin] = useState(0)
        const [precioMax, setPrecioMax] = useState(100000000000)
        const [ciudad,setCiudad] = useState()
        const [calle,setCalle] = useState()
        const [numero,setNumero] = useState()
        const [cp, setCp] = useState()
        const [piso,setPiso] = useState()
        const [metros_2, setMetros_2]=useState()
        const [banos, setBanos] = useState()
        const [habitaciones, setHabitaciones] = useState()
        const [amueblado,setAmueblado] = useState()
        const [calefaccion, setCalefaccion] = useState()
        const [aire_acondicionado, setAire_acondicionado] = useState()
        const [jardin, setJardin] = useState()
        const [terraza, setTerraza] = useState()
        const [ascensor, setAscensor] = useState()
        const [piscina, setPiscina] = useState()
        const [from__fecha_inicio, setFrom__fecha_inicio] = useState()
        const [from__fecha_disponibilidad, setFrom__fecha_dispinibilidad] = useState()
        const [until__fecha_fin, setUntil__fecha_fin] = useState()
        const history = useHistory()
        const qpar = [
            {from__precio:precioMin},
            {until__precio:precioMax},
            {provincia: provincia},
            {ciudad: ciudad},
            {calle: calle},
            {numero:numero},
            {cp: cp},
            {piso: piso},
            {metros_2: metros_2},
            {banos: banos},
            {habitaciones: habitaciones},
            {amueblado: amueblado},
            {calefaccion: calefaccion},
            {aire_acondicionado: aire_acondicionado},
            {jardin: jardin},
            {terraza: terraza},
            {ascensor: ascensor},
            {piscina: piscina},
            {from__fecha_inicio: from__fecha_inicio},
            {from__fecha_disponibilidad:from__fecha_disponibilidad},
            {until__fecha_fin:until__fecha_fin}
        ]       
        const query = useQueryGenerate(qpar)
        prov.sort((a, b)=>a.nm.localeCompare(b.nm))
        
        const [advertisements, setAdvertisements] = useState()
        console.log(advertisements)

        const handleFilter = async(e) =>{
            e.preventDefault()
            console.log(query)
            const result = await fetch(backRoutes.r_advSearcher + query)
            const {data } = await (result.json())
            history.push(`/search/adv/${query}`)
            setAdvertisements(data)
        }
        
        function onChangeDate(date, dateString) {
            
            if(date){
                setFrom__fecha_dispinibilidad(`${date._d.getFullYear()}-${date._d.getMonth()+1}-${date._d.getDate()}`)
            }
            
        }
        return(
            <div>
                <div className="advertisement-search-container">
                    
                    <form onSubmit={handleFilter}>
                    <h1>Búsqueda de inmuebles</h1>
                    <div className="searchPropertyData-container">
                        <select className="primary-input" name="provincias" defaultValue="Provincias" onChange={e =>setProvincia(e.target.value)}>
                            <option disabled>Provincias</option>
                            {prov.map((p)=>{return(
                                <option key={p.id} > {p.nm} </option>
                            
                            )})}
                        </select>
                        
                        <input type="text" className="primary-input" placeholder="Municipio" onChange={e=>setCiudad(e.target.value)}/>
                        <input type="text" className="primary-input" placeholder="Calle" onChange={e=>setCalle(e.target.value)}/>
                        <input type="number" className="primary-input"  min="10000"  placeholder="C.P." onChange={ e => setCp(e.target.value) } />
                        <input type="number" className="primary-input"  min="0"  placeholder="Metros" onChange={ e => setMetros_2(e.target.value) } />
                        <input type="number" className="primary-input"  min="0"  placeholder="Numero baños" onChange={ e => setBanos(e.target.value) } />
                        <input type="number" className="primary-input"  min="0"  placeholder="Numero Habitaciones" onChange={ e => setHabitaciones(e.target.value) } />
                    
                        <Checkbox className="primary-checkbox" min="0" onChange={e=>setAmueblado(!amueblado)}>Amueblado </Checkbox>
                        <Checkbox className="primary-checkbox" min="0" onChange={e=>setCalefaccion(!calefaccion)}>Calefacción </Checkbox>
                        <Checkbox className="primary-checkbox" min="0" onChange={e=>setAire_acondicionado(!aire_acondicionado)}>Aire acondicionado </Checkbox>
                        <Checkbox className="primary-checkbox" min="0" onChange={e=>setJardin(!jardin)}>Jardín </Checkbox>
                        <Checkbox className="primary-checkbox" min="0" onChange={e=>setTerraza(!terraza)}>Terraza </Checkbox>
                        <Checkbox className="primary-checkbox" min="0" onChange={e=>setAscensor(!ascensor)}>Ascensor </Checkbox>
                        <Checkbox className="primary-checkbox" min="0" onChange={e=>setPiscina(!piscina)} >Piscina </Checkbox>
                    </div>
                    <div className="resservSearch-container">
                        <h2>Datos reserva:</h2>
                        <input type="number" className="primary-input"  min="0" step="100" placeholder="Precio Mínimo" onChange={ e => setPrecioMin(e.target.value) } />
                        <input type="number" className="primary-input"  min="0" step="100" placeholder="Precio máximo" onChange={ e => setPrecioMax(e.target.value)} />
                        <Space direction="vertical">
                            <DatePicker onChange={onChangeDate} format='DD-MM-YYYY' placeholder="Fecha disponibilidad." showToday='true' className="primary-input date-picker" />
                        </Space>
                        <button className="primary-button">Buscar</button>
                    </div>
                    </form>
                </div>   
                {advertisements &&
                <>
                    <h1 id="bodyHeader">Anuncios encontrados según su criterio de búsqueda</h1>
                    <div className="resultSearchCotainer">
                            {advertisements.map(adver=>
                                <MiniAdvertisement advertisements={adver}/>
                               
                            )}
                    </div>
                </>
                }
            </div>
        )
}

export default AdvSearcher