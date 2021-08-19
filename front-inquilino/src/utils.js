export const parse_googleAdress = (autoAdress, coordinates)=>{
    const adress ={}
    if(autoAdress.length>0){
        autoAdress.forEach(element => {    
            if(element.types){
                if(element.types[0]){
                    if(element.types[0]==="locality"){
                        adress.ciudad=element.long_name
                    }else if(element.types[0]==="street_number"){
                        adress.numero=element.long_name
                    }else if(element.types[0]==="route"){
                        adress.calle=element.long_name
                    }else if(element.types[0]==="administrative_area_level_2"){
                        adress.provincia=element.long_name
                    }else if(element.types[0]==="localadministrative_area_level_1ity"){
                        adress.comunidad=element.long_name
                    }else if(element.types[0]==="country"){
                        adress.pais=element.long_name
                    }else if(element.types[0]==="postal_code"){
                        adress.cp=element.long_name
                    }
                }
            }
            if(coordinates){
                if (coordinates.lat){
                    adress.lat = coordinates.lat
                    adress.lng = coordinates.lng
                
                }
            }
        })
    
    
    }
    
    
    return adress
}