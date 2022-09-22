import axios from "axios"

const bulk_definition= async (api_payment, bank_id)=> {
    const res= await axios({
        url: `https://oauth.casso.vn/v2/sync`,
        method: "post",
        data: {
            bank_acc_id: bank_id
        },
        headers: {
            "Authorization": `Apikey ${api_payment}`,
            "Content-type": "application/json"
        },
        responseType: "json"
    })
    const result= await res.data
    return console.log(result)
}

export default bulk_definition