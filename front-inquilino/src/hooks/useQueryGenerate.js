
import { stringify } from "query-string"
/**
 * 
 * @param {object{object:string}} qparams 
 * @returns string
 * @description {nombreTabla(con prefijo hasta o desde si procede){nombredelCampo:valor}}
 */
const useQueryGenerate = (qparams) => {
        let query ='?'
        qparams.forEach(qpar => {
                if(Object.values(qpar)[0]!==undefined){
                        if(qpar==='true' || qpar===false){
                                query += `${Object.keys(qpar)[0]}=${Object.values(qpar)[0]}&` 
                        }else{
                                query += stringify(qpar) + '&'        
                        }
                        
                }
        });
        
        return (query)
}

export default useQueryGenerate