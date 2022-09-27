import axios from "axios"
import { SERVER_URL } from "../config/config"

const state= async ()=> {
    const res= await axios({
        url: `${SERVER_URL}/s/state`,
        method: "get", 
        params: {
            
        }
    })
}

export default state