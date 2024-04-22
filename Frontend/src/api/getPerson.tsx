import axios from "axios"
import { BACKEND_URL } from './../../env';
import { useError } from "../hooks/useToast";

const getPerson = async (name: string) => {
    const response = await axios.get(`${BACKEND_URL}/user/getUserCheck?name=${name}`)
    if(!response.data.success){
        useError("Kişi bulunamadı")
    }
    return response.data
}

export default getPerson