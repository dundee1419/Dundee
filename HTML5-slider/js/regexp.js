/**
 * Created by Dundee on 2017/2/9.
 * 正则验证
 */

/**
 * 公共函数 检查是否要显示提示窗口
 * @param ShowMsg 提示文字
 * @returns {boolean}
 * @constructor
 */
function IfShow(ShowMsg){
    if (ShowMsg == "" ) {
        return false;
    } else {
        return true;
    }
}
/**
 * 非空检测
 * @param obj
 * @param ShowMsg 输入框为空，请输入！
 * @returns {boolean}
 */
function isNull(obj,ShowMsg) {
    var show = IfShow(ShowMsg) ;
    //非空检查
    if(obj.value == "") {
        if (show){
            alert(ShowMsg);
        }
        obj.focus();
        obj.select();
        return false;
    } else {
        return true;
    }
}
/**
 * 验证身份证号码是否有效
 * @param obj
 * @param ShowMsg 未输入或输入身份证号不正确！
 * @returns {boolean}
 */
function isIDno(obj,ShowMsg)
{
    var show = IfShow(ShowMsg);

    //aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",71:"台湾",81:"香港",82:"澳门",91:"国外"};
    var aCity = "11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91";

    var iSum = 0;
    var info = "";
    var idCardLength = obj.value.length;

    if(!/^\d{17}(\d|x)$/i.test(obj.value)&&!/^\d{15}$/i.test(obj.value)) {
        if (show) {
            alert(ShowMsg);
        }
        obj.focus();
        obj.select();
        return false;
    }
    //在后面的运算中x相当于数字10,所以转换成a
    obj.value = obj.value.replace(/x$/i,"a");

    var curCity = obj.value.substr(0,2);

    if(!(aCity.indexOf(curCity) > 0) ) {
        if (show){
            alert(ShowMsg);
        }
        obj.focus();
        obj.select();
        return false;
    }

    if (idCardLength==18) {
        sBirthday=obj.value.substr(6,4)+"-"+Number(obj.value.substr(10,2))+"-"+Number(obj.value.substr(12,2));
        var d = new Date(sBirthday.replace(/-/g,"/"));
        if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())) {
            if (show){
                alert(ShowMsg);
            }
            obj.focus();
            obj.select();
            return false;
        }

        for(var i = 17;i>=0;i --)
            iSum += (Math.pow(2,i) % 11) * parseInt(obj.value.charAt(17 - i),11);

        if(iSum%11!=1) {
            if (show){
                alert(ShowMsg);
            }
            obj.focus();
            obj.select();
            return false;
        }

    }else if (idCardLength==15) {
        sBirthday = "19" + obj.value.substr(6,2) + "-" + Number(obj.value.substr(8,2)) + "-" + Number(obj.value.substr(10,2));
        var d = new Date(sBirthday.replace(/-/g,"/"))
        var dd = d.getFullYear().toString() + "-" + (d.getMonth()+1) + "-" + d.getDate();

        if(sBirthday != dd) {
            if (show){
                alert(ShowMsg);
            }
            obj.focus();
            obj.select();
            return false;
        }
    }
    return true;
}
/**
 * 验证电话号码格式是否正确
 * @param obj
 * @param ShowMsg 未输入或输入电话号码格式不正确！
 * @returns {boolean}
 */
function isPhoneNo(obj,ShowMsg){
    var show = IfShow(ShowMsg);
    var phoneNo = obj.value;
    var Endvalue = true;
    var allowstrlist = "1234567890()-";
    if(phoneNo!="") {
        for (var i=0;i<phoneNo.length;i++) {
            if (allowstrlist.indexOf(phoneNo.substr(i,1)) == -1) {
                Endvalue = false;
                break;
            }
        }
        if(Endvalue == false) {
            if (show)
                alert(ShowMsg);
            obj.focus();
            obj.select();
            return false;
        }
    } else {
        if (show)
            alert(ShowMsg);
        obj.focus();
        obj.select();
        return false;
    }
    return true;
}