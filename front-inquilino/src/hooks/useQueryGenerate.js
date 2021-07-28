
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
                if(Object.values(qpar)[0]){
                        query += stringify(qpar) + '&'
                }
        });
        console.log(query)
        return (query)
}

export default useQueryGenerate