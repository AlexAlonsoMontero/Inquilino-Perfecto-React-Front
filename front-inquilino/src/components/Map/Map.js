import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './Map.css'
import { OpenStreetMapProvider, GoogleProvider } from 'leaflet-geosearch';
import { useContext, useEffect, useState } from 'react';
const Map = ({adress}) =>{
    const [coordinates,setCoordinates] = useState({x:40.416, y :-3.703 });
    const [googleApiResults,setGoogleApiResults] = useState()
    const direccion  = `${adress.calle} ${adress.numero},${adress.ciudad} ${adress.cp}  `
    const provider = new GoogleProvider({
        params: {
          key: 'AIzaSyDBbYSjPW4Bc_0AIL65pvPeytfw5f-dzps',
          language: 'es', 
          region: 'es', 
        },
      });
      //configuracion otro proveedor
      // const provider2 = new OpenStreetMapProvider({
      //   params: {
      //     'accept-language': 'es', // render results in Dutch
      //     countrycodes: 'es', // limit search results to the Netherlands
      //     addressdetails: 1, // include additional address detail parts
      //   },
      // });
    useEffect((direccion)=>{
      console.log(direccion)
      const locateProperty = async(direccion)=>{
        console.log("Direccopm " + direccion)
        const results= await provider.search({ query:direccion })
        // const prob = await results.json()
        console.log(results )
        setGoogleApiResults(results)
      }    
      locateProperty()
    } ,[])
    if(googleApiResults.length > 0){
      console.log("hay resultados")
    }
    
    
    return  coordinates && (
        <MapContainer center={[coordinates.x, coordinates.y]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coordinates.x, coordinates.y]}>
            <Popup>
                <p>{direccion}</p>
                <button>Reserva</button>
            </Popup>
        </Marker>
        </MapContainer>
    )
}
export default Map