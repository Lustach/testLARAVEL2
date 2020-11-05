import Vue from 'vue'
const localVue = new Vue()
export default {
    namespaced: true,
    state: {
      isLogin: false,
    },
    actions: {
        async ['REFRESH_TOKEN'](){
            const result = await localVue.$API.post.RefreshToken()
            localStorage.setItem('ACCESS_TOKEN', result)
            console.log(result)
        },
        async ['LOGIN'] ({state},payload){
            console.log(localVue,this,payload,'HERE')
          const result = await localVue.$API.post.LoginCheck(payload)
          state.isLogin = true
          console.log(result,'hope')
        },
        async ['LOGOUT'] ({state}){
          const result = await localVue.$API.post.Logout()
          console.log(result)
          localStorage.remove('ACCESS_TOKEN')
          state.isLogin = false
        },
        async ['REGISTER'] ({commit},payload){
          const result = await localVue.$API.post.SignUp(payload)
          console.log(result,commit)
        },
    },
}
