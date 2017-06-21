$(document).ready(function(){
	$('.modal').delegate('.mod-hide','click',function(){
		$(this).parents(".modal").fadeOut(400);
	})	
});

function modal(obj,Oheight){
	$('.modal').hide();
	obj = $("#" + obj );
	obj.find(".mod-area").css("top",0);
	obj.fadeIn(400);
	if(!Oheight){
		Oheight=.65;
	}
	obj.find(".mod-con").css("max-height",$(window).height()*Oheight);
	obj.find(".mod-area").animate({'top':'50%'},400)
}


