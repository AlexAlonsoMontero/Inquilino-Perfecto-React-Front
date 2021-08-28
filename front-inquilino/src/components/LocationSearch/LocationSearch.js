import useQueryGenerate from '../../hooks/useQueryGenerate'
import { backRoutes } from '../../routes'
import { useEffect, useState } from 'react';
import MiniAdvertisement from '../MiniAdvertisement/MiniAdvertisement'

const LocationSearch = () =>{
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
                    console.log(result)
                    const {data} = await (result.json())
                    console.log(data)
                }
           
            coordSearchAdv()
            })    
            
        }else{
            console.log("no hay geolocalización")
        }
    },[])
    
    return (
       <p>prueba</p>
    )
}
export default LocationSearch