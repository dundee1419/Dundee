$(function(){

$(".form-div").each(function() {
	$(".form-div").find('input').blur(function(){
			if ($(this).val()!='') {
				$(this).siblings('i').show()
			} else {
				$(this).siblings('i').hide()
			}
	}).keyup(function(){
		 $(this).triggerHandler("blur");
	}).focus(function(){
			 $(this).triggerHandler("blur");
	});

	$(this).find('i').click(function(){
		$(this).hide()
		$(this).siblings("input").val('')
	})
});
});
var reg= /^[1][3578]\d{9}$/;
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
var code = ""; //验证码
var codeLength = 6;//验证码长度
var pid = "form"			//父栏目
function sendMessage(obj) {
	P_obj = $(obj).parents("." + pid)
	curCount = count;
	var phone=P_obj.find(".phone").val();//手机号码
	if(reg.test(phone)){
		//产生验证码
		for (var i = 0; i < codeLength; i++) {
			code += parseInt(Math.random() * 9).toString();
		}
		//设置button效果，开始计时
		$(obj).attr("disabled", "true");
		$(obj).html("重新获取 <span>(" + curCount + "S)</span>");
		$(obj).addClass("hover")
		InterValObj = window.setInterval(function(){
			if (curCount == 0) {                
				window.clearInterval(InterValObj);//停止计时器
				$(obj).removeAttr("disabled");//启用按钮
				$(obj).removeClass("hover")
				$(obj).text("重新发送验证码");
			}
			else {
				curCount--;
				$(obj).html("重新获取 <span>(" + curCount + "S)</span>");
			}
		}, 1000); //启动计时器，1秒执行一次
		P_obj.find(".form-tips").html('短信发送成功！请输入短信验证码！');
	//向后台发送处理数据
/*		$.ajax({
			type: "POST", //用POST方式传输
			dataType: "text", //数据格式:JSON
			url: 'Login.php', //目标地址
			data: "phone=" + phone + "&code=" + code,
			error: function (XMLHttpRequest, textStatus, errorThrown) { },
			success: function (msg){ }
		});*/
	}else{
		P_obj.find(".form-tips").html('请输入正确的手机号码!');
	}
}



$('.form-text').blur(function(){
	P_obj = $(this).parents("." + pid)
	 if( $(this).is('.phone') ){
			if(!reg.test(this.value)){
					P_obj.find(".form-tips").html('请输入正确的手机号码！');
					$(this).addClass('onError')
			}else{
					P_obj.find(".form-tips").html(' ');
					$(this).removeClass('onError')
			}
	 }
	 if( $(this).is('.checkCode') ){ 
			if(this.value=="" || this.value.length < 6){
					P_obj.find(".form-tips").html('请输入正确的手机短信验证码！');
					$(this).addClass('onError')
			}else{
					P_obj.find(".form-tips").html(' ');
					$(this).removeClass('onError')
			}
	 }


}).keyup(function(){
  $(this).triggerHandler("blur");
}).focus(function(){
  $(this).triggerHandler("blur");
});//end blur


//提交，最终验证。
$('.verify').click(function(){
	P_obj = $(this).parents("." + pid)
	P_obj.find(".checkCode").trigger('blur');
	P_obj.find(".phone").trigger('blur');
	var numError = $('.onError').length;
	if(numError){
		return false;
	}
	$(this).parents(".modal").hide();
	var a =1;
	if(a===1){
		window.location.href='success.html';		//办理成功
	}else if(a===2){
		window.location.href='fail.html';			//办理失败
	}
});

		
