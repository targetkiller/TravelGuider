// var page_data = [];

// // 首页
// page_data[1000] = {
// 	'header':{
// 		'type':'1','btn_left':false,'btn_right':true,'title':'首页'
// 	},
// 	'hasFooter':true,
// 	'activeFooter':1
// };
// // 搜索
// page_data[2000] = {
// 	'header':{
// 		'type':'1','btn_left':false,'btn_right':true,'title':'搜索'
// 	},
// 	'hasFooter':true,
// 	'activeFooter':2
// };
// // 发现
// page_data[3000] = {
// 	'header':{
// 		'type':'1','btn_left':false,'btn_right':true,'title':'发现'
// 	},
// 	'hasFooter':true,
// 	'activeFooter':3
// };
// // 个人
// page_data[4000] = {
// 	'header':{
// 		'type':'1','btn_left':false,'btn_right':true,'title':'个人'
// 	},
// 	'hasFooter':true,
// 	'activeFooter':4
// };
// // 详情页
// page_data[5000] = {
// 	'header':{
// 		'type':'1','btn_left':true,'btn_right':true,'title':'游记详情'
// 	},
// 	'hasFooter':false,
// 	'activeFooter':1
// };
// // 详情页2
// page_data[5001] = {
// 	'header':{
// 		'type':'1','btn_left':true,'btn_right':true,'title':'游记详情'
// 	},
// 	'hasFooter':false,
// 	'activeFooter':1
// };

// 刷新状态
// srcid:源页面id destid:目标页面id direction:0/1/2（前进，后退，不动画）
function freshStatus(_srcId,_destId,_direction){
	// // 获取该页面数据
	// var data = page_data[_destId];
	// var _type = data.header.type;
	// var _btn_left = data.header.btn_left;
	// var _btn_right = data.header.btn_right;
	// var _title = data.header.title;
	// var _hasFooter = data.hasFooter;
	// var _activeFooter = data.activeFooter;

	// // 切换header类型
	// $('.header').addClass('hide');
	// $('#header'+_type).removeClass('hide');

	// // 切换header头信息
	// _btn_left === true?$('#header'+_type+' .btn-left').removeClass('hide'):$('#header'+_type+' .btn-left').addClass('hide')
	// _btn_right === true?$('#header'+_type+' .btn-right').removeClass('hide'):$('#header'+_type+' .btn-right').addClass('hide')
	// $('#header'+_type+' .title').text(_title);

	// // 切换底部tab信息
	// _hasFooter === true?$('#tab').removeClass('hide'):$('#tab').addClass('hide');
	// $('.tab').removeClass('active');
	// switch(_activeFooter){
	// 	case 1: $('.tab-home').addClass('active');break;
	// 	case 2: $('.tab-search').addClass('active');break;
	// 	case 3: $('.tab-find').addClass('active');break;
	// 	case 4: $('.tab-mine').addClass('active');break;
	// 	default: $('.tab-home').addClass('active');break;
	// }

	switch(_destId){
		case '1000': $('#tab').removeClass('hide');$('.tab').removeClass('active');$('.tab-home').addClass('active');break;
		case '2000': $('#tab').removeClass('hide');$('.tab').removeClass('active');$('.tab-search').addClass('active');break;
		case '3000': $('#tab').removeClass('hide');$('.tab').removeClass('active');$('.tab-find').addClass('active');break;
		case '4000': $('#tab').removeClass('hide');$('.tab').removeClass('active');$('.tab-mine').addClass('active');break;
		default: $('#tab').addClass('hide');break;
	}

	$('.page').addClass('hide');
	$('#'+_destId).removeClass('hide');
	// 翻页动画
	// if(_direction==1){
	// 	pageNext(_srcId,_destId);
	// }
	// else if(_direction==1){
	// 	pageBack(_srcId,_destId);
	// }
	// else{
	// 	$('.page').addClass('hide');
	// 	$('#'+_destId).removeClass('hide');
	// }
}

// 页面前跳
function pageNext(_srcId,_destId){
	var $src = $('#'+_srcId);
	var $dest = $('#'+_destId);

	$dest.css({
		'-webkit-transform':'translateX(100%)',
		'transform':'translateX(100%)'
	});
	$dest.removeClass('hide');

	setTimeout(function(){
		$dest.css({'-webkit-transform':'translateX(0)','transform':'translateX(0)'});
	},4);

	setTimeout(function(){
		$src.addClass('hide');
	},300);
}

// 页面后跳
function pageBack(_srcId,_destId){
	var $src = $('#'+_srcId);
	var $dest = $('#'+_destId);

	$dest.css({
		'-webkit-transform':'translateX(-100%)',
		'transform':'translateX(-100%)'
	});
	$dest.removeClass('hide');

	setTimeout(function(){
		$dest.css({'-webkit-transform':'translateX(0)','transform':'translateX(0)'});
	},4);

	setTimeout(function(){
		$src.addClass('hide');
	},300);
}

$('#content').width($(window).width());
$('#content').height($(window).height());

$('#pre-wrap').height($(window).height());
$('.pre').height($(window).height());

// 模块内前进
$('.cantap').bind('tap',function(){
	var destId = $(this).attr('data-dest');
	var _data = historyController.skipDest(destId);
	freshStatus(_data.srcPage,_data.destPage,0);
});

// 模块内后退
$('.canback').bind('tap',function(){
	var _data = historyController.skipBack();
	freshStatus(_data.srcPage,_data.destPage,1);
	if($(this).hasClass('btn-back')){
		$('#'+_data.srcPage).addClass('hide');
	}
});

// 模块间
$('.cantab').bind('tap',function(){
	var srcId = $(this).attr('id');
	var destId = $(this).attr('data-dest');
	historyController.resetOrigin(destId);
	freshStatus(srcId,destId,2);
});

function touchStart(event){
  var event = event || window.event;
}

function touchMove(event){
  event.preventDefault();
  var event = event || window.event;
  var distance = event.touches[0].clientX-adjustClientX;
  if(distance < touch_end && distance > touch_start){
    $('#select-bar').css('left',distance);
    $('#select-num').css('left',distance+6);
    $num = $('.pay-num');
    $snum = $('.select-num');
  	
    if(distance>240){$num.text('¥ 260.00');$snum.text('13人');}
    else if(distance>220){$num.text('¥ 240.00');$snum.text('12人');}
    else if(distance>200){$num.text('¥ 220.00');$snum.text('11人');}
    else if(distance>180){$num.text('¥ 200.00');$snum.text('10人');}
    else if(distance>160){$num.text('¥ 180.00');$snum.text('9人');}
    else if(distance>140){$num.text('¥ 160.00');$snum.text('8人');}
    else if(distance>120){$num.text('¥ 140.00');$snum.text('7人');}
    else if(distance>100){$num.text('¥ 120.00');$snum.text('6人');}
    else if(distance>80){$num.text('¥ 100.00');$snum.text('5人');}
    else if(distance>60){$num.text('¥ 80.00');$snum.text('4人');}
    else if(distance>40){$num.text('¥ 60.00');$snum.text('3人');}
    else if(distance>20){$num.text('¥ 40.00');$snum.text('2人');}
    else{$num.text('¥ 20.00');$snum.text('1人');}
  }
}

function touchEnd(event){
  var event = event || window.event;
}

var touch_start = 0;
var touch_end = 250;
var adjustClientX = 70;
var frame2Bar = $('#select-bar')[0];
frame2Bar.addEventListener('touchstart',touchStart,false);
frame2Bar.addEventListener('touchmove',touchMove,false);
frame2Bar.addEventListener('touchend',touchEnd,false);

$('.select-item').bind('tap',function(){
	$('.select-item').removeClass('select-item-active');
	$(this).addClass('select-item-active');
});

$('.page-detail-cantap').bind('tap', function(){
	var isShow = $(this).hasClass('page-detail-list-show'),
		parent = $(this).parent(),
		parentHeight = parent.height(),
		detailHeight = $('#page-detail-list-content').height(),
		_height;
	parent.css({height:parentHeight});
	if(!isShow){
		$('#page-detail-list-content').css({display:'block'});
		detailHeight = $('#page-detail-list-content').height();
		_height = parentHeight + detailHeight;
		$(this).addClass('page-detail-list-show');
	}else{
		_height = parentHeight - detailHeight;
		$('#page-detail-list-content').css({display:'none'});
		$(this).removeClass('page-detail-list-show');
	}
	parent.animate({height:_height}, 400, 'ease-in-out');
});

$('.pre').bind('tap',function(){
	var index = parseInt($(this).attr('data-index'));
	if(index == 5){
		return false;
	}
	else{
		$('.pre'+index).css({'-webkit-transform':'translate3d(-100%,0,0)','transform':'translate3d(-100%,0,0)'})
		$('.pre'+(index+1)).css({'-webkit-transform':'translate3d(0%,0,0)','transform':'translate3d(0%,0,0)'}).addClass('active');
	}
});

$('.pre5 .ele-btn').bind('tap',function(){
	$('#pre-wrap').addClass('hide');
	$('#content').removeClass('hide');
});

// 微信支付
$('.btn-pay').bind('tap',function(){
	$('.frame5-cover').css({'opacity':1,'top':0});
	$('.frame5-dialog').css({'-webkit-transform':'translateY(260px)'});
	$('.frame5-keyboard').css({'-webkit-transform':'translateY(-216px)'});
	var keyboardIndex = 1;
	var codeIndex = 1;
	setTimeout(function(){
		var keyboardInter = setInterval(function(){
			$('.frame5-keyboard-code'+keyboardIndex).removeClass('hide');
			$('.frame5-dialog-code'+codeIndex).removeClass('hide');
			var tmpIndex = keyboardIndex;
			setTimeout(function(){
				$('.frame5-keyboard-code'+tmpIndex).addClass('hide');
			},200);
			keyboardIndex++;
			codeIndex++;
			if(codeIndex>6){
				clearInterval(keyboardInter);
				// $('.frame5').css({'-webkit-transform':'translateX(-100%)','opacity':0});
				var _data = historyController.skipDest(5006);
				freshStatus(_data.srcPage,_data.destPage,0);
				console.log(_data.srcPage);
				$('#'+_data.srcPage).addClass('hide');

				// RESET
				$('.frame5-cover').css({'opacity':0});
				$('.frame5-dialog').css({'-webkit-transform':'translateY(-260px)'});
				$('.frame5-keyboard').css({'-webkit-transform':'translateY(216px)'});	
				$('.frame5-dialog-code').addClass('hide');
			}
		},400);
	},200);
});

$('.page-pay-success .btn-share').bind('tap',function(){
	var _data = historyController.skipDest(5004);
	freshStatus(_data.srcPage,_data.destPage,0);
				console.log(_data.srcPage);
	$('#'+_data.srcPage).addClass('hide');
});

$('.frame7-btn-select').bind('tap',function(){
	$('.frame7-select').removeClass('hide');
	setTimeout(function(){
		// $('.frame7').css({'-webkit-transform':'translateX(-100%)','opacity':0});
		var _data = historyController.skipDest(5005);
		freshStatus(_data.srcPage,_data.destPage,0);
				console.log(_data.srcPage);
		$('#'+_data.srcPage).addClass('hide');

		$('.frame7-select').addClass('hide');
		setTimeout(function(){
			$('.frame8-msg').css({'-webkit-transform':'translateY(-306px)'});
		},300);
	},200);
});

$('.page-search-cancel-2').bind('tap',function(){
	$('.page-search-input').val('');
});

