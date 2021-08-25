import useQueryGenerate from '../../hooks/useQueryGenerate'
import { backRoutes } from '../../routes'
import { useEffect, useState } from 'react';
import MiniAdvertisement from '../MiniAdvertisement/MiniAdvertisement'

const LocationSearch = () =>{
    const [advertisements, setAdvertisements] = useState()
    const isGeoLoc = ("geolocation" in navigator ? true:false)
    useEffect(() => {
        if (isGeoLoc){
            navigator.geolocation.getCurrentPosition(function(position){
                const coorSearchAdv = async()=>{
                    
                    const queryObj = {
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
                coorSearchAdv()
            })
        }else{
            console.log("no ok")
        }   
        
    },[])
    console.log(advertisements)

    return (
        <>
            {/* {advertisements.length>0 && 
                <>
                    <h1 class="bodyHeader">Inmuebles en su zona</h1>
                    
                    <div className="resultSearchCotainer">
                        {advertisements.map(adver=>
                            <MiniAdvertisement advertisements={adver}/>
                            
                        )}
                    </div>
                </>
            } */}
            {advertisements.length <1 &&
                <>
                    <h1 className="bodyHeader">No se localizan inmuebles en sus coordenadas</h1>
                    <h2 className="bodyHeader">Pruene a buscar por provincia o ciudad </h2>
                </>
            }
        </>
    )
}
export default LocationSearch