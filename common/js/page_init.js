
(function(){
	$('.sections > .section:not(.hide):not(.show)').addClass('hide').waypoint({
		handler: function(direction) {
			$(this.element).removeClass('hide').addClass('show');
			this.destroy();
		},
		offset: '80%'
	});

	$(function(){
		Waypoint.refreshAll();
		setTimeout(function(){
			Waypoint.refreshAll();
		},800)
	})


})(jQuery);
