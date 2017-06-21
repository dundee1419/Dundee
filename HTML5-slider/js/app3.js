/**
 * Created by Dundee on 2017/6/1.
 */
/**
 * 面向对象- 打字机特效
 * @param dom Dom 节点
 * @param msg 所打印的文字
 * @param speed 打印的速度
 * @constructor Dundee
 */
function Writer(dom,msg,speed) {
    this.dom=dom;
    this.msg=msg;
    this.seq=0; //起始下标位置
    this.speed=speed;
    this.tot=null; //定时器
}
Writer.prototype={

    getMsg:function () {
        var _this=this;
        var len=this.msg.length;//文字长度
        this.dom.innerHTML=this.msg.substring(0,this.seq)+(this.seq & 1 ? '_' : '');
        if(this.seq==len){//当下标=文字长度
            this.seq=0;

            clearTimeout(this.tot);//清除定时器
        
        }else {
            var current=this.msg.substr(this.seq,1);    //获取一个字符
            if(current=='<'){   //判断是否有HTML标签
                this.seq=this.msg.indexOf('>',this.seq)+1; //过滤HTML标签
            }else {
                this.seq++;
            }
            this.tot=setTimeout(function () {
                _this.getMsg();
            },this.speed);

        }
    }

};


