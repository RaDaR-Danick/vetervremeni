import { IP_API_URL } from "../config";
import axios from "axios";

export default class IpService {
    static async check() {
        const url = IP_API_URL

        return 'Russia'
        // try {
        //     const getData = await axios.get(url)
        //     const country = getData.data

        //     return country.country_name
        // } catch(e) {
        //     return 'Kazakhstan'
        // }
    }
}