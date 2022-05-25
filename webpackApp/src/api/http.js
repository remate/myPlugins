let host = 'http://localhost:9000'
console.log(IS_DEV)
if (IS_DEV) {
    host = 'http://localhost:9000'
}
let url = '/api/getUserInfo'
import axios from "axios";
export const getUserInfo = () => {
    axios.get(url).then(res=>{
        console.log(res)
    })
}