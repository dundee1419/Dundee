/**
 * Created by Dundee on 2017/6/2.
 */
$(function () {
// 获取终端的相关信息
     if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
     //alert(navigator.userAgent);
         return true;
     } else if (/(Android)/i.test(navigator.userAgent)) {
     //alert(navigator.userAgent);
         return true;
     } else {
        window.location.href='404.html';
     };
});


var wW=window.innerWidth;
var wH=window.innerHeight;
var fz;
if(wW>=640){
    fz='100'
}else{
    fz=100 * (wW / 640);
}

/**
 *  设置CSS 方法类
 * @param dom
 * @constructor
 */
function DomTag(dom) {
    this.dom=dom;
};
DomTag.prototype={
    setCss:function (arr) {
        for(var k in  arr){
            this.dom.style[k]=arr[k];
        }
    }
};

/**
 * 随机数方法
 * @param n 最小 | 数组
 * @param m 最大
 * @returns {*} 
 */
function rnd(n, m){
    if(Object.prototype.toString.call(n) === '[object Array]'){

        return n[Math.floor(Math.random()*n.length)];
    }else {
        return Math.random()*(m-n+1)+n;
    }
}