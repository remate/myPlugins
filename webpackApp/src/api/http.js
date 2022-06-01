let url = 'http://localhost:9000/api/getUserInfo'
import axios from "axios";
export const getUserInfo = () => {
    axios.get(url).then(res=>{
        console.log(res)
    })
}