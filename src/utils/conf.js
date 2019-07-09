//开发环境(严品)的值为 sanquan
//开发环境(陈义龙)的值为 chenyl
//打包部署到正式环境的值为 prod

let env = 'sanquan';
// let env = 'prod';

//项目根地址
function baseUrl() {
    if (env=='prod') {
        return '//www.gdjyzx.com.cn:8060';
    } else if(env=='chenyl') {
        return '//10.0.0.103:8060';
    } else if(env=='sanquan'){
        return '//10.0.0.147:8060';
    }
}

//api调用的地址
function apiUrl() {
    return baseUrl() + '/sys';
}

//文件上传的地址
function uploadUrl() {
    return baseUrl() + '/sys/upload';
}

//前端api的地址
function webApiUrl() {
    return baseUrl() + '/web';
}

//管理员api的地址
function mngApiUrl() {
    return baseUrl() + '/mng';
}
//时间提示框配置
function timeconfig() {
    var a = {
        //第一次弹出时间(分钟)
        ejectionTime: 30,
        //弹出间隔（分钟）
        ejectionInterval: 5
    }
    return a
}

function colorTotal(num) {

    if (num == 1) {
        return ['#d3faf9','#d9d9d9','#eeebe2',"#defff5",'#fffcf4','#fff0f4','#f8ffeb','#dad2f3','#df9bb2']
    } else {
        return ['#00a29f','#2e2e2e','#938762',"#1dd69e",'#dca719','#c96788','#8aa653','#403366','#6f264a']
    }
}
export default {
    apiUrl,
    uploadUrl,
    baseUrl,
    webApiUrl,
    timeconfig,
    colorTotal,
    mngApiUrl
}
