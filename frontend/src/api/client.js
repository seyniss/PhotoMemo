import axios from "axios"

const BASE_URL=import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL:BASE_URL
})

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')

    //includes() config.url안에 ('  ')이 포함되는가?
    if(config.url?.includes('/api/auth/login')||config.url?.includes('/api/auth/register')){
        delete config.headers.Authorization
        return config
    }

    if(token) config.headers.Authorization=`Bearer ${token}`

    return config
})


export default api