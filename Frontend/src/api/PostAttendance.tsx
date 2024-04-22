import axios from "axios"
import { BACKEND_URL } from "../../env"

const PostAttendance = async (index : number) => {
    const response = await axios.post(`${BACKEND_URL}/user/attendance`, {
        studentIndex:index
    })
    console.log(response.data)
    return response.data


}

export default PostAttendance