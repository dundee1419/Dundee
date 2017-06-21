
var dom5=document.getElementById('app5');

dom5.width=wW;
dom5.height=wH;

var ctx5=dom5.getContext('2d');

var particleArr=[];


var got={
    particleAmount: 80,         //粒子个数
    defaultSpeed: 1,            //粒子运动速度
    variantSpeed: 1,            //粒子运动速度的变量
    particleColor: "rgb(255,255,255)",       //粒子的颜色
    lineColor:"rgb(255,255,255)",            //网格连线的颜色
    defaultRadius: 1,           //粒子半径
    variantRadius: 1,           //粒子半径的变量
    minDistance: 1*fz           //粒子之间连线的最小距离

};
var line = got.lineColor.match(/\d+/g);

function Grain(){
    this.x=Math.random()*wW;    //粒子x轴坐标
    this.y=Math.random()*wH;    //粒子y轴坐标
    this.speed=got.defaultSpeed + got.variantSpeed*Math.random();   //粒子运动速度
    this.directionAngle=Math.floor(Math.random()*360);  //粒子运动方向
    this.color=got.particleColor;   //粒子颜色
    this.radius=got.defaultRadius + got.variantRadius*Math.random();    //粒子的半径大小
    this.vector={
        x:this.speed*Math.cos(this.directionAngle), //粒子在x轴的速度
        y:this.speed*Math.sin(this.directionAngle)  //粒子在y轴的速度
    };
}
Grain.prototype={
    update:function () {
       this.border();
        this.x += this.vector.x;
        this.y += this.vector.y;
    },

    border:function () {
        if(this.x>=wW || this.x<=0){ //判断粒子是否到达 左右边界
            this.vector.x *= -1;       //到达 ,让x轴的速度变为原来的负数
        }
        if(this.y>=wH || this.y<=0){//判断粒子是否到达 上下边界
            this.vector.y *= -1;    //到达 ,让y轴的速度变为原来的负数
        }
        if(this.x>wW){
            this.x=wW
        }
        if(this.x<0){
            this.x=0;
        }
        if(this.y>wH){
            this.y=wH
        }
        if(this.y<0){
            this.y=0;
        }
    },
    draw:function () {
        ctx5.beginPath();
        ctx5.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx5.closePath();
        ctx5.fillStyle=this.color;
        ctx5.fill();
    }
};

function init2() {
    for (var i=0;i<got.particleAmount;i++){
        particleArr.push(new Grain());
    }
    loop2();
}

function loop2() {
    ctx5.clearRect(0,0,wW,wH);
    for(var i=0;i<particleArr.length;i++){
        particleArr[i].update();
        particleArr[i].draw();
    }
    for(var i = 0;i<particleArr.length; i++){   //添加的是这个循环
        linePoint(particleArr[i],particleArr)
    }
    window.requestAnimationFrame(loop2);
}

/**
 * 画连接线
 * @param point
 * @param hub
 */
function linePoint(point,hub){
    for(var i = 0;i<hub.length;i++){
        var distance = getDistance(point,hub[i]);
        var opacity = 1 -distance/got.minDistance;
        if(opacity > 0){
            ctx5.lineWidth = 0.5;
            ctx5.strokeStyle = "rgba("+line[0]+","+line[1]+","+line[2]+","+opacity+")";
            ctx5.beginPath();
            ctx5.moveTo(point.x,point.y);
            ctx5.lineTo(hub[i].x,hub[i].y);
            ctx5.closePath();
            ctx5.stroke();
        }
    }
}
/**
 *
 * 获取边的距离  a的平方+b的平方=c的平方
 * @param point1
 * @param point2
 * @returns {number}
 */
function getDistance(point1,point2){
    return Math.sqrt(Math.pow(point1.x-point2.x,2) + Math.pow(point1.y - point2.y ,2));
}

init2();