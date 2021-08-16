import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './Map.css'
import { OpenStreetMapProvider, GoogleProvider } from 'leaflet-geosearch';
import {  useEffect, useState } from 'react';
const Map = ({mapAdress}) =>{
    const [coordinates,setCoordinates] = useState({x:40.416, y :-3.703 });
    const [showMarkMap,setShowMarkMap] = useState(false)
    const [markData,setMarkData] = useState()
    const provider = new GoogleProvider({
        params: {
          key: 'AIzaSyDBbYSjPW4Bc_0AIL65pvPeytfw5f-dzps',
          language: 'es', 
          region: 'es', 
        },
      });
      // configuracion otro proveedor
      const provider2 = new OpenStreetMapProvider({
        params: {
          'accept-language': 'es', // render results in Dutch
          countrycodes: 'es', // limit search results to the Netherlands
          addressdetails: 1, // include additional address detail parts
        },
      });
      
    useEffect(() => {
        const LocateData = async()=>{
        const results =[]
        for (let cont=0; cont<mapAdress.length; cont++){
          results[cont] = await provider.search({ query: `${mapAdress[cont].calle} ${mapAdress[cont].numero} ${mapAdress[cont].ciudad} ${mapAdress[cont].provincia} `  })
            
        }
        const respuestas = await Promise.all(results)
        if(respuestas.error_message){
          alert("No se ha podido localizar de forma automatica las coordenadas, introduzcalas manualmente, si así lo desea")
        }
        if(respuestas.length>0){
          setShowMarkMap(true)
         
        }
        
      }
      LocateData()
      
    }, []);
    return  coordinates && (
        <MapContainer center={[coordinates.x, coordinates.y]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showMarkMap && <p>prueba</p>}
        {/* <Marker position={[coordinates.x, coordinates.y]}>
              <Popup>
                  <p></p>
                  <button>Reserva</button>
              </Popup>
          </Marker> */}
          
        </MapContainer>
        
    )
}
export default Map