import axios from 'axios'
// import Cookies from 'js-cookie';
axios.defaults.baseURL = 'http://crud.loc/api/'
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('Token');
if(localStorage.getItem('ACCESS_TOKEN')!==null)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('ACCESS_TOKEN');
const API = {
    token:{
    },
    auth: {
    },
    post: {
        LoginCheck:(data)=>axios.post('/login',data),
        SignUp:(data)=>axios.post('/register',data),
        RefreshToken : ()=> axios.post('refresh/token'),
        Logout:()=> axios.post('/logout'),
    },
    patch: {
        deleteTask:(data) =>axios.patch(`/deleteTask?category=${data.categoryId}&task=${data.index}`),
        updateTaskPlace: (data) => axios.patch(`/updateTask_place`, data),
        updateTask: (data) =>axios.patch(`/updateTask?category=${data.categoryId}&task=${data.index}`,data.task)
    },
}

export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$API', { value: API })
    }
}