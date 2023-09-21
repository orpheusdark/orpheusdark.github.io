/*
 * portfolio_detail.js
 * ---
 * @author takaaki.koyama
 * ---
 * ---------------------------------------------
 * (c) baqemono.inc. all rights reserved.
 * ---------------------------------------------
 */
(function($){



	var $info, $photo, $win, $d, $b,
		uid = (new Date()).getTime(),
		scrollFix = true,
		_scrollTimer = null,
		wh,dh;

	function init(){
		if($.browser.mobile) return;
		$info = $('#portfolio-detail #info');
		$photo = $('#portfolio-detail #photo');
		$win = $(window);
		$d = $(document);
		$b = $('body');

		$('.entry-detail', $info).mCustomScrollbar();
		$win.on('resize.portfolio_detail.'+uid, resize)
			//.on('scroll.portfolio_detail.'+uid, scroll);
		$info.closest('.content').one('remove.page.bq', end);

		resize();
		_scrollTimer = window.requestAnimationFrame(__scroll)
	}


	function resize(){
		var sh = $win.height()-60;
		$info.height(sh);
	}

	function __scroll(){
		if(_scrollTimer) window.cancelAnimationFrame(_scrollTimer);
		if(!scrollFix) return;

		wh = $win.height();
		dh = $d.height();
		var st = $win.scrollTop();
		var top = Math.min(dh-wh,Math.max(0, st));
		$info.css('top', top);
		_scrollTimer = window.requestAnimationFrame(__scroll);
	}

	function end(){
		scrollFix = false;
		$win.off('resize.portfolio_detail.'+uid).off('scroll.portfolio_detail.'+uid);
	}

	$(function(){
		init();
	})

/*
	var scrollTimer = null,
		scrolling = false;
	function scroll(){
		if(scrolling){
			clearTimeout(scrollTimer);
			scrollTimer = setTimeout(_scroll,100);
		}else{
			if($b.hasClass('nav-open')){
				_scroll();
			}else{
				scrolling = true;
				$info.addClass('fixed')
			}
		}
	}

	function _scroll(){
		scrolling = false;
		var st = $win.scrollTop();
		$info.removeClass('fixed');
		$info.css('top', Math.max(0,st));
	}

*/

})(jQuery);


(function($){

	function embedMovie($t){
		var url = $t.closest('.movie').data('movie-url');
		var embed, video_id;
		if(!url) return;
		if(url.match('youtu.be')){
			video_id = url.replace(/^https?:\/\/youtu\.be\/(.*)$/,'$1');
			embed = '<iframe class="embed-item" src="//www.youtube.com/embed/'+video_id+'?wmode=transparent&autoplay=1&rel=0&showinfo=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		}else if(url.match('youtube')){
			video_id = url.replace(/^https?:\/\/(www)?\.youtube\.com\/watch\?(.+&)?v=(.*)(&.+)?$/,'$3');
			embed = '<iframe class="embed-item" src="//www.youtube.com/embed/'+video_id+'?wmode=transparent&autoplay=1&rel=0&showinfo=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		}else if(url.match('vimeo')){
			video_id = url.replace(/^https?:\/\/vimeo\.com\/(.*)$/,'$1');
			embed = '<iframe class="embed-item" src="//player.vimeo.com/video/'+video_id+'?portrait=0&autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		}

		if(embed){
			$t.addClass('hide').after('<div class="embed-container">'+embed+'</div>')
		}
	}

	var uid = (new Date()).getTime();
	$(function(){
		$('.entry-photo.movie .photo').on('click.portfolio_detail.'+uid, function(){
			embedMovie($(this));
		})
	});

})(jQuery);