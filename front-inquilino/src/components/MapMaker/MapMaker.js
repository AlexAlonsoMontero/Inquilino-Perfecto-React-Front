import { Marker, Popup } from "leaflet"

const MapMarker =  ({property},map) => {
    
    if(Object.keys(property[0]).length ===0){
        return null
    }
    return(
            property.map(item =>{
                
                <Marker position={[42.2247567,-8.7239536]} keys={[item.lat,item.lng]}>
                </Marker>
                
            })
            
        )
}
export default MapMarker