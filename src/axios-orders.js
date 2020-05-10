import axios from 'axios'

const instance = axios.create({
    baseURL: "https://my-app-c4914.firebaseio.com/"
})

export default instance;