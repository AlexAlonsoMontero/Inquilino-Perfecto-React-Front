export const parse_googleAdress = (autoAdress)=>{
    const adress ={}
    autoAdress.forEach(element => {    
        if(element.types[0]==="street_number"){
            adress.numero=element.long_name
        }else if(element.types[0]==="route"){
            adress.calle=element.long_name
        }else if(element.types[0]==="locality"){
            adress.ciudad=element.long_name
        }else if(element.types[0]==="administrative_area_level_1"){
            adress.comunidad=element.long_name
        }
        else if(element.types[0]==="administrative_area_level_2"){
            adress.provincia=element.long_name
        }
        else if(element.types[0]==="postal_code"){
            adress.cp=element.long_name
        }
        else if(element.types[0]==="street_number"){
            adress.numero=element.long_name
        }
    })
    // console.log(adress)
    return adress
}