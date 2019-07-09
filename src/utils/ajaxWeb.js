import axios from 'axios'
import qs from 'qs'
import { Notification } from "element-ui";
import { Message } from "element-ui";


import router from '@/router'
import conf from '@/utils/conf.js'


let temp = true;
let url = conf.webApiUrl();
const Axios = axios.create({
    baseURL: url,
    timeout: 5000,
    responseType: "json",
    withCredentials: false, // 是否允许带cookie这些
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
});
Axios.interceptors.request.use(
    config => {
        if (
            config.method === 'post' ||
            config.method === 'put' ||
            config.method === 'delete'
        ) {
            config.data = qs.stringify(config.data);
        }
        if (sessionStorage.studentToken) {
            config.headers.Authorization = sessionStorage.studentToken;
        }else{
            console.log('发起请求-没有token')
        }
        return config;
    },
    error => {
        Notification({
            message: '请求错误',
            type: 'error'
        });
        return Promise.reject(error);
    }
)

Axios.interceptors.response.use(
    response => {
        let code = response.data.code;
        //请求正常
        if(code==0){
            return response.data;
        }
        let errMsg = '';

        // 1002 参数校验错误  3001 业务逻辑错误    4001 服务器错误    1003  接口不存在   1004  接口不可用 1005 接口不支持该设备    1006  接口random重复   
        if(code==1002||code==3001||code==4001||code==1003||code==1004||code==1005||code==1006){
            if(code==1002){
                errMsg = '参数错误';
            }else if(code==3001){
                errMsg = response.data.msg;
            }else if(code==4001){
                errMsg = '服务器错误,请稍后再试';
            }else if(code == 1003||code==1004||code==1005||code==1006){
                errMsg = '请求错误';
            }
            Notification({
                message: errMsg,
                type: 'error'
            })
            return Promise.reject(response.data);
        }
        //  token校验失败2006    用户在其他地方登录 2003   用户登录超时 2005
        else{
            if(code==2005){
                router.replace('/login');
                errMsg = '登录超时';
            }else if(code==2003){
                router.replace('/login');
                errMsg = '您的账号在其他地方登录';
            }else if(code==2006){
                router.replace('/login');
                errMsg = '校验失败';
            }
            //这里使用temp来做限制,避免一次谈出多个错误弹窗
            //code为1,7,8的错误. 1500ms内只会弹出一次
            if(temp){
                Notification({
                    message: errMsg,
                    type: 'error'
                });
                temp = false;
                window.setTimeout(()=>{
                    temp = true;
                },1500)
            }
        }
    },
    error => {
        Notification({
            message: '网络错误',
            type: 'error'
        })
        console.log("error",error)
        return Promise.reject(error);
    }
);

function fetch(url, params) {
    return new Promise((resolve, reject) => {
        Axios.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch(error => {
                reject(error)
            })
    });
}

export default {
    fetch
}
