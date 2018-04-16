import axios from 'axios';
import { Loading, Message } from 'element-ui';
let loadingInstance = null;

let prefix = process.env.API_ROOT
// let prefix = ''

// Add a request interceptor 
axios.interceptors.request.use(function (config) {
    // alert(JSON.stringify(config));
    // if (loadingInstance) {
    //     loadingInstance.close();
    // }

    // loadingInstance = Loading.service({ target: '.content-container' });
    // Do something before request is sent     
    
    config.withCredentials = true;
    config.headers = config.headers || {};
    config.headers.Authorization = `token ${storeSession.get("token")}`;
    config.headers['X-Requested-With'] = 'XMLHttpRequest';

    return config;
}, function (error) {
    // loadingInstance.close();
    // Do something with request error 
    return Promise.reject(error);
});

// Add a response interceptor 
axios.interceptors.response.use(function (response) {
    // Do something with response data 
    // loadingInstance.close();
    //401-未登录，跳转登录
    if (response.data.code == 401) {
        window.location = "/#/login";
    } else if (response.data.code != 200) {
        Message.error(response.data.message);
        // return Promise.reject(response);
        return new Promise(() => {});
    } else {
        return response;
    }
}, function (error) {
    // Do something with response error 
    // loadingInstance.close();
    return Promise.reject(error);
});

export default axios