/**
 * Created by Dundee on 2017/5/27.
 */
var dom2 = document.getElementById('xk2');
var ctx2=dom2.getContext("2d");
dom2.width = wW;
dom2.height = wH;
var particle=[];
var opt = {
    particleAmount: 40,         //粒子个数
    defaultSpeed: 1,            //粒子运动速度
    variantSpeed: 1,            //粒子运动速度的变量
    particleColor: ['#ffffff','#2C2C2C','#FC0FB2','#CB0FFC','#830FFC','#0F7CFC','#0FDBFC','#0FFCE5','#0FFCAA','#BFFC0F','#F0FC3B','#FCAF3B','#FC5D3B'],       //粒子的颜色
    lineColor:"rgb(32,245,245)",            //网格连线的颜色
    defaultRadius: 1.2,           //粒子半径
    variantRadius:1.2,           //粒子半径的变量
    minDistance: 200            //粒子之间连线的最小距离
};

function Partical() {
    this.x=Math.random()*wW; //x 坐标
    this.y=Math.random()*wH;    ///y 坐标
    this.speed = opt.defaultSpeed + opt.variantSpeed*Math.random();     //粒子的运动速度
    this.directionAngle = Math.floor(Math.random()*360);                //粒子运动的方向
    this.color = rnd(opt.particleColor);                                //粒子的颜色
    this.radius = opt.defaultRadius+Math.random()*opt.variantRadius;    //粒子的半径大小
    this.vector = {
        x:this.speed * Math.cos(this.directionAngle),       //粒子在x轴的速度
        y:this.speed * Math.sin(this.directionAngle)        //粒子在y轴的速度
    }
}
Partical.prototype = {
    update: function () { //粒子更新函数
        this.border();                           //判断粒子是否到了边界
        this.x += this.vector.x;                //粒子下一时刻在x轴的坐标
        this.y += this.vector.y;                //粒子下一时刻在y轴的坐标
    },
    border:function () {
        if(this.x >= wW || this.x<= 0){      //如果到达左右边界，就让x轴的速度变为原来的负数
            this.vector.x *= -1;
        }
        if(this.y >= wH || this.y <= 0){     //如果到达上下边界，就让y轴的速度变为原来的负数
            this.vector.y *= -1;
        }
        if(this.x > wW){                     //下面是改变浏览器窗口大小时的操作，改变窗口大小后有的粒子会被隐藏，让他显示出来即可
            this.x = wW;
        }
        if(this.y > wH){
            this.y = wH;
        }
        if(this.x < 0){
            this.x = 0;
        }
        if(this.y < 0){
            this.y = 0;
        }
    },
    draw: function () {                 //绘制粒子的函数
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx2.closePath();
        ctx2.fillStyle = this.color;
        ctx2.fill();
    }

};
function init(){
    for(var i = 0;i<opt.particleAmount; i++){
        particle.push(new Partical());
    }

    loop();
}
function loop(){
    ctx2.clearRect(0,0,wW,wH);
    for(var i = 0;i<particle.length; i++){
        particle[i].update();
        particle[i].draw();
    }
    window.requestAnimationFrame(loop);
}
init();

