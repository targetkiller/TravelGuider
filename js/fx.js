//首页的图片轮播，不可以点的啦~~
(function(){
	var imgList = $('.page-home-pic-content li'),
		indexList = $('.page-home-pic-index li'),
		scrollIndex = 0;
	function scrollImage(){
		var toIndex = scrollIndex + 1,
			_len = indexList.length,
			currentImg, scrollImg;
		if(toIndex > _len-1){
			toIndex = 0;
		}
		scrollImg = $(imgList[toIndex]);
		scrollImg.css({left:'375px', zIndex:2, display:'block'});
		currentImg = $(imgList[scrollIndex]);
		currentImg.css({left:'0'});
		currentImg.animate({left:'-375px'}, 2000, 'ease-in-out', function(){
			currentImg.css({display:'none'});
			$(indexList[scrollIndex]).removeClass('active');
			scrollIndex = toIndex;
			loopScroll();
		});
		scrollImg.animate({left:'0'}, 2000, 'ease-in-out', function(){
			scrollImg.css({zIndex:1});
			$(indexList[toIndex]).addClass('active');
		});
	}
	function loopScroll(){
		setTimeout(function(){
			scrollImage();
		}, 6000);
	}
	scrollImage();
})();

// //首页的人头轮播，不可以点的啦~~
// (function(){
// 	var imgList = $('.page-home-guider-content li'),
// 		indexList = $('.page-home-guider-index li'),
// 		scrollIndex = 0;
// 	function scrollImage(){
// 		var toIndex = scrollIndex + 1,
// 			_len = indexList.length,
// 			currentImg, scrollImg;
// 		if(toIndex > _len-1){
// 			toIndex = 0;
// 		}
// 		scrollImg = $(imgList[toIndex]);
// 		scrollImg.css({left:'304px', zIndex:2, display:'block'});
// 		currentImg = $(imgList[scrollIndex]);
// 		currentImg.css({left:'0'});
// 		currentImg.animate({left:'-304px'}, 2000, 'ease-in-out', function(){
// 			currentImg.css({display:'none'});
// 			$(indexList[scrollIndex]).removeClass('active');
// 			scrollIndex = toIndex;
// 			loopScroll();
// 		});
// 		scrollImg.animate({left:'0'}, 2000, 'ease-in-out', function(){
// 			scrollImg.css({zIndex:1});
// 			$(indexList[toIndex]).addClass('active');
// 		});
// 	}
// 	function loopScroll(){
// 		setTimeout(function(){
// 			scrollImage();
// 		}, 6000);
// 	}
// 	scrollImage();
// })();