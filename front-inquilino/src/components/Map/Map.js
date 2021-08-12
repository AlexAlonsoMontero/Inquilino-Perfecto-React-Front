import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './Map.css'
import { OpenStreetMapProvider, GoogleProvider } from 'leaflet-geosearch';
import { useContext, useEffect, useState } from 'react';
const Map = ({mapAdress}) =>{
    const [coordinates,setCoordinates] = useState({x:40.416, y :-3.703 });
    const [googleApiResults,setGoogleApiResults] = useState([])
    const [showMarkMap,setShowMarkMap] = useState(false)
    console.log(mapAdress)
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
      const locateProperty = async()=>{
        console.log("prueba")
        const results= await provider.search({ query:"rua venezuela 78" })
        console.log(results )
      //   setGoogleApiResults(results)
      }    
      locateProperty()
      return () => {
        setGoogleApiResults()
      };
    }, []);


    // useEffect(()=>{
    //   const locateProperty = async()=>{
    //     console.log("prueba")
    //     const results= await provider.search({ query:"rua venezuela 78" })
    //     console.log(results )
    //   //   setGoogleApiResults(results)
    //   }    
    //   locateProperty()
    // } ,[])
    if(googleApiResults.length > 0){
      console.log("hay resultados")
      setShowMarkMap(true)
    }
    
    
    return  coordinates && (
        <MapContainer center={[coordinates.x, coordinates.y]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coordinates.x, coordinates.y]}>
              <Popup>
                  <p></p>
                  <button>Reserva</button>
              </Popup>
          </Marker>
          
        </MapContainer>
        
    )
}
export default Map