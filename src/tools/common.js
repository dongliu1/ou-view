
export const getItem = (item) => {
    return JSON.parse(sessionStorage.getItem(item))
}

export const setItem = (key, value) => {
    return sessionStorage.setItem(key, JSON.stringify(value))
}

export const download = (src,_str) => {
    var xhr = new XMLHttpRequest();
    xhr.open('get', src, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
        var blob = this.response;
        var fileReader = new FileReader();
        console.log(blob);

        fileReader.readAsDataURL(blob);
        fileReader.onload = function (e) {
            var a = document.createElement('a');
            console.log(src);
            var index = src.lastIndexOf("\/");
            if(!_str){
                var str = src.substring(index + 1, src.length);
            }else{
                var str = _str;
            }
            a.download = str;
            a.href = e.target.result;
            var app = document.getElementById('app');
            console.log(app)
            app.appendChild(a);
            a.click();
            app.removeChild(a);
        }
    }
    xhr.send();
}

