import { MapContainer, TileLayer, Marker, Popup,useMap, MapConsumer } from 'react-leaflet'
import './MyMap.css'
import {  useEffect, useState} from 'react';


function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

const MyMap = ({mapData}) =>{
  const [center,setCenter] = useState([40.41, -3.703])

  useEffect(() => {
    if(Object.values(...mapData).length>0){
      setCenter([mapData[0].lat.toFixed(3),mapData[0].lng.toFixed(3)])
      
      
    }
  },[] );
  
  console.log("el centro", center )
  return  (
    <MapContainer
     center={center}
     zoom="30"
     scrollWheelZoom={true}
     >
     <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     />
      {/* <MapControl /> */}
      
      
      
      
      
       {/* {mapData.map((element)=>{
        return(
          <>
            <Marker  id={element.provincia}>
              <Popup>
              
                <p>pppp</p>
              </Popup>
            </Marker>
            
          </>
        )
      }) 

      } */}


      
    </MapContainer>
        
  )
}
export default MyMap



