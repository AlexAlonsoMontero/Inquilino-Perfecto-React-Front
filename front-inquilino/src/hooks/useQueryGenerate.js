
import { stringify } from "query-string"
/**
 * 
 * @param {object{object:string}} qparams 
 * @returns string
 * @description {nombreTabla(con prefijo hasta o desde si procede){nombredelCampo:valor}}
 */
const useQueryGenerate = (qparams) => {
        let query = "?"
        qparams.forEach(tables => {
            query += `${Object.keys(tables)[0]}.${stringify(Object.values(tables)[0])}&`
        })
        
        return (query)
    
}

export default useQueryGenerate