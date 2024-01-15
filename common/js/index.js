/*
 * common.js
 * ---
 * @author takaaki.koyama
 * ---
 * ---------------------------------------------
 * (c) baqemono.inc. all rights reserved.
 * ---------------------------------------------
 */
(function($){

	var $images = $('#images li');
	var $title = $('#site-name');

	var timer = subTimer = null;
	var numImages = $images.length
	var current = Math.floor(Math.random()*numImages);
	var INTERVAL = 5000;


	var title = $title.text();
	var typo_delay = [
		12, // 1 M
		12, // 2 I
		14, // 3 K
		 2, // 4 I
		 8, // 5 Y
		 4, // 6 A
		 5, // 7 K
		15, // 8 O
		12, // 9 B
		16, //10 A
		 9, //11 Y
		20, //12 A
		15, //13 S
		17, //14 H
		10  //15 I
	]

	$title.html('');
	$.each(title.replace(/[\t\s]/g,'').split(''),function(i,c){
		var $s = $('<span class="c'+(i+1)+'">'+c+'</span>');
		var d = typo_delay[i]
		$s.css(Modernizr.prefixedCSS('transition-delay'), (d/30)*1000+'ms')
		$title.append($s);
	});


	$images.each(function(){
		var $img = $(this).find('img');
		$(this).css({
			'background-image' : 'url('+$img.attr('src')+')'
		});
		$img.css('display','none');
	});

	function start(){
		timer = setTimeout(function(){
			var old = current;
			$images.eq(old).addClass('hide');
			subTimer = setTimeout(function(){
				$images.eq(old).removeClass('current hide');
			},2200)
			current = getRandomNext();
			$images.eq(current).addClass('current');

			start();

		}, INTERVAL);
	}

	function stop(){
		clearTimeout(timer);
		clearTimeout(subTimer);
	}

	function getRandomNext(){
		var n = Math.floor(Math.random()*numImages);
		if(n==current){
			while(n==current){
				n = Math.floor(Math.random()*numImages);
			}
		}
		return n;
	}


	function addEvents(){
		$('#scroll-info a').on('click.index',function(e){
			$(document).off('mousewheel.index touchmove.index');
			stop();
		})

		$(document).on('mousewheel.index touchmove.index', function(e){
			$(document).off('mousewheel.index touchmove.index');
			bq.page.show($('#scroll-info a').attr('href'));
		});
	}

	function removeEvents(){
		$('#scroll-info a').off('click.index');
		$(document).off('mousewheel.index touchmove.index');
	}

	var init_timers = []
	$(window).one('enter.page.bq', function(){

		init_timers[init_timers.length] = setTimeout(function(){
			$title.addClass('show');
		}, 0);

		init_timers[init_timers.length] = setTimeout(function(){
			$images.eq(current).addClass('current');
			start();
		}, 800);

		init_timers[init_timers.length] = setTimeout(function(){
			$('#scroll-info').addClass('show');
		}, 1300);

		init_timers[init_timers.length] = setTimeout(addEvents, 2000);
	}).one('exit.page.bq', function(){
		removeEvents();
		stop();
		for (var i = init_timers.length - 1; i >= 0; i--) {
			clearTimeout(init_timers[i]);
		}
	})



})(jQuery)