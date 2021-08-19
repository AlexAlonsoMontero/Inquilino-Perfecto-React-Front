import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './MyMap.css'
import {  useEffect,  useState } from 'react';
// import { Marker } from 'react-leaflet';
const MyMap = ({mapData}) =>{
  const [coord, setCoord]=useState()
  console.log("mapData")
  console.log(Object.values(...mapData).length)
  if(Object.values(...mapData).length>0){
    console.log("al fin")
    console.log(mapData[0].lng)
    
  }
  useEffect(()=>{
    if(Object.values(...mapData).length>0){
      console.log("al fin")
      console.log(mapData[0].lng)
      
    }
  },[])
  
  console.log("coordeandas")
  console.log(coord)
  
  // useEffect(()=>{
    
  //   if(Object.values(mapData[0]).length>0){
      
  //     mapData.forEach(element => {
  //       setMarkData([element])
  //     });
  //   }
  // },[])
  // console.log("markData")
  // console.log(markData)
  //     const [coordinates,setCoordinates] = useState({x:40.416, y :-3.703 });
//     const [showMarkMap,setShowMarkMap] = useState(false)
//     const [markData,setMarkData] = useState()
    
    // const provider = new GoogleProvider({
    //     params: {
    //       key: 'AIzaSyDBbYSjPW4Bc_0AIL65pvPeytfw5f-dzps',
    //       language: 'es', 
    //       region: 'es', 
    //     },
    //   });
    //   // configuracion otro proveedor
    //   const provider2 = new OpenStreetMapProvider({
    //     params: {
    //       'accept-language': 'es', // render results in Dutch
    //       countrycodes: 'es', // limit search results to the Netherlands
    //       addressdetails: 1, // include additional address detail parts
    //     },
    //   });
      
    // useEffect(() => {
      //   const LocateData = async()=>{
      //   const results =[]
      //   for (let cont=0; cont<mapAdress.length; cont++){
      //     results[cont] = await provider.search({ query: `${mapAdress[cont].calle} ${mapAdress[cont].numero} ${mapAdress[cont].ciudad} ${mapAdress[cont].provincia} `  })
            
      //   }
      //   const respuestas = await Promise.all(results)
      //   if(respuestas.error_message){
      //     alert("No se ha podido localizar de forma automatica las coordenadas, introduzcalas manualmente, si así lo desea")
      //   }
      //   if(respuestas.length>0){
      //     setShowMarkMap(true)
         
      //   }
        
      // }
      // LocateData()
      
    // }, []);
    return  (
        
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    
          {/* <Marker position={[40.417097,-3.705]} >
            <Popup>
            <p>pppp</p>
            </Popup>
          </Marker> */}
          {mapData.map((element)=>{
            return(
            <Marker position={[51.505, -0.09]} id={element.provincia}>
              <Popup>
              {console.log("lass coord", coord)
              
              }
                <p>pppp</p>
              </Popup>
            </Marker>
            )
          })

          }
          
                
        </MapContainer>
        
      //   {mapData.map((element)=>{
      //     <Marker position={[element.lat, element.lng]} >
      //       <Popup>
      //         <p>{element.pais}</p>
      //       </Popup>

      //     </Marker>
      //   }
      // }
        


        
    )
}
export default MyMap