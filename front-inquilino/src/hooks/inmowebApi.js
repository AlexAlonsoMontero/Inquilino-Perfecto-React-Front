import { backRoutes } from "../routes";
import useFetch from "./useFetch";

//USER
export const useGetItem = (urlQParam) => useFetch(backRoutes.r_activationUser + '?' + Object.keys(urlQParam)[0] + '=' + Object.values(urlQParam)[0])
