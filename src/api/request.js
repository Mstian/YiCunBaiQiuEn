import axios from 'axios';
import Qs from 'qs' // 处理post请求数据格式
const $axios = axios.create({
    timeout: 30000,
    baseURL: 'http://tt.ybhealth.com',
})
$axios.interceptors.request.use((config) => {
    return config;
}, (err) => {
    return Promise.reject(err);
})

$axios.interceptors.response.use((response) => {
    if ((response.status >= 200 ) || response.status === 304) {
        return Promise.resolve(response.data)
    } else {
        return Promise.reject(response)
    }
}, (err) => {
    console.log(err);
    return Promise.reject(err);
});

export default{
    post(url,data){
        return $axios({
            method:'post',
            url,
            data: Qs.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
    },
    get(url,params){
        return $axios({
            method:'get',
            url,
            params
        }) 
    }
}