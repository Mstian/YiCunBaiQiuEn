export const isShare = true;
export function formatDate(timestamp){
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '年';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + '日 ';
    var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
    var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
     return Y+M+D+h+m;
}