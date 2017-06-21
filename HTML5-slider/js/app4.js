/**
 * Created by Dundee on 2017/5/27.
 * 画板
 *
 */
function Palette(lineCor,lineW) {
    this.onOff=false;     //标记
    this.oldX=0;       //初始位置 x
    this.oldY= 0;       //初始位置 y
    this.lineCor=lineCor; //画笔颜色
    this.lineW=lineW;    //线宽


}
Palette.prototype={

    init:function (dom,ctx) {
        this.start(dom);
        this.move(dom);
        this.draw(dom,ctx);

    },

    start:function (dom) {//添加鼠标按下事件

        dom.addEventListener('touchstart',function (e) {
            e=e||window.event;
            this.onOff=true;
            this.oldX=e.targetTouches[0].pageX;
            this.oldY=e.targetTouches[0].pageY;
        },false);

    },

    move:function (dom) {//添加鼠标弹起事件
        dom.addEventListener('touchend',function () {
            this.onOff=false;
        },true);



    },

    draw:function (dom,ctx) {//添加鼠标移动事件
        var _this=this;
        dom.addEventListener('touchmove',function (e) {
            e=e||window.event;

            if(this.onOff==true){
                var newX=e.targetTouches[0].pageX;
                var newY=e.targetTouches[0].pageY;

                ctx.beginPath();

                ctx.moveTo(this.oldX,this.oldY);

                ctx.lineTo(newX,newY);

                ctx.strokeStyle= _this.lineCor;

                ctx.lineWidth=_this.lineW;

                ctx.lineCap='round';

                ctx.stroke();

                this.oldX=newX;
                this.oldY=newY;

            }


        },false);
        



    }

};


draw();


function draw() {
    var dom4=document.getElementById('xk4');
    var ctx4=dom4.getContext('2d');
    dom4.width=wW;
    dom4.height=wH;

    var pal=new Palette('white',2);
    pal.init(dom4,ctx4);

}

