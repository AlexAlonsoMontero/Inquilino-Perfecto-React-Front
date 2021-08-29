import { backRoutes } from '../../routes'
import { useEffect, useState } from 'react';
import MiniAdvertisement from '../MiniAdvertisement/MiniAdvertisement'
const LocationSearch = () =>{
    const [advertisements,setAdvertisements] = useState([])
    const isGeoloc = ("geolocation" in navigator ? true:false)
    useEffect(()=>{
        if(isGeoloc){
            navigator.geolocation.getCurrentPosition(function(position){
                const coordSearchAdv = async()=>{
                const queryObj= {
                    from_lat: (parseFloat (position.coords.latitude) - parseFloat(0.200)).toFixed(3) ,
                    until_lat: (parseFloat (position.coords.latitude) + parseFloat(0.200)).toFixed(3) , 
                    from_lng: (parseFloat (position.coords.longitude) - parseFloat(0.200)).toFixed(3),
                    until_lng: (parseFloat (position.coords.longitude) + parseFloat(0.200)).toFixed(3)
                }
                const pr = backRoutes.r_advSearcher
                    const query = `?from__lat=${queryObj.from_lat}&until__lat=${queryObj.until_lat}&`+
                                    `from__lng=${queryObj.from_lng}&until__lng=${queryObj.until_lng}&`
                    const result = await fetch(backRoutes.r_advSearcher + query)
                    const {data} = await (result.json())
                    setAdvertisements(data)
                    
                }
            coordSearchAdv()
            })    
        
        }else{
            console.log("no hay geolocalización")
        }
    },[])
    console.log(advertisements.length)
    if(advertisements.length>0){
        return(
            <div>
            <h1 className={"bodyHeader"}>Anuncios entorno a su ubicación geográfica actual</h1>
                <div className={"resultSearchCotainer"}>
                    { 
                        advertisements.map(adv=>{
                            return <MiniAdvertisement key={adv.anuncio_uuid} advertisements={adv}/>
                        })
                        
                    }
                </div>
            </div>
        )
    }else{
        return  (
            <div>
                <h1 className={"bodyHeader"}>Ralizando busqueda inmuebles en su ubicación actual</h1>
                <h2 className={"bodyHeader"}>Puede realizar una búsqueda por ciudad o provincia</h2>
            </div>
        )
    }
}
export default LocationSearch