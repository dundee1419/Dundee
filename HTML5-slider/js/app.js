/**
 * Created by Dundee on 2017/5/27.
 */

var dom = document.getElementById('xk');
var starsArr = [];
var ctx = dom.getContext("2d");
dom.width = wW;
dom.height = wH;

function Stars(ctx) {
    this.ctx = ctx;
    this.color = '#ffffff';
    this.COLOR = ['#ffffff', '#2C2C2C', '#FC0FB2', '#CB0FFC', '#830FFC', '#0F7CFC', '#0FDBFC', '#0FFCE5', '#0FFCAA', '#BFFC0F', '#F0FC3B', '#FCAF3B', '#FC5D3B'];
}
Stars.prototype = {
    init: function (x, y, radius) {
        this.x = x || 0.0;   // 出生 位置x
        this.y = y || 0.0;    //出生 位置y
        this.radio = radius || 10; //出生大小
        this.color = rnd(this.COLOR);//出生 颜色
        this.theta = rnd(0, Math.PI * 2); //出生 角度
        this.force = rnd(2, 8); //出生 距离圆心半径
        this.vX = Math.sin(this.theta) * this.force;  // x 坐标
        this.vY = Math.cos(this.theta) * this.force;  //y 坐标
    },

    update: function () {
        this.x += this.vX;
        this.y += this.vY;

        this.vX += Math.sin(this.theta) * 0.1;//扩散递增
        this.vY += Math.cos(this.theta) * 0.1;

        this.vX *= 0.92;
        this.vY *= 0.92;
        this.radio *= 0.96;//慢慢变小

    },

    draw: function () {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.globalCompositeOperation = 'lighter';//白色遮罩
        this.ctx.fill();
    }


};

dom.addEventListener('touchmove', function (e) {
    e = e || window.event;
    var eX = e.targetTouches[0].pageX;
    var eY = e.targetTouches[0].pageY;

    for (var j = 0; j < rnd(1, 10); j++) {
        spawn(eX, eY);
    }

}, false);


function spawn(x, y) {//对象创建
    var stars = new Stars(ctx);//实例化一个对象
    stars.init(x, y, rnd(2, 0.2 * fz));//调用创建方法
    starsArr.push(stars);//把每一个粒子装到 数组中

    if (starsArr.length >= 800) {//如果已知对象超过800
        starsArr.shift();//删除数组中的第一个
    }
}
actStars();
function actStars() {//让粒子对象动起来  渲染函数
    ctx.clearRect(0, 0, wW, wH);
    for (var i = 0; i < starsArr.length; i++) {
        starsArr[i].draw();
        starsArr[i].update();
    }
    window.requestAnimationFrame(actStars);//循环执行 actStars 递归调用
}










