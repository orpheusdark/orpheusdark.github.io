/*
 * flow_grid_init.js
 * ---
 * @author takaaki.koyama
 * ---
 * ---------------------------------------------
 * (c) baqemono.inc. all rights reserved.
 * ---------------------------------------------
 */
(function(){

	$('.flow-grid > .entry img[data-original]').fadeTo(0,0).waypoint({
		handler: function(direction) {
			var $t = $(this.element);
			$('<img />').one('load',function(){
				$t.attr('src',this.src).fadeTo(500,1)
			}).attr('src', $t.data('original'));
			this.destroy();
		},
		offset: '100%'
	})

	$(function(){
		$('.flow-grid').each(function(){
			if(!$(this).data('FlowGrid')){
				$(this).data('FlowGrid',  new bq.ui.FlowGrid(this));
			}
		}).one('remove.page.bq', function(){
			if($(this).data('FlowGrid')){
				$(this).data('FlowGrid').destory();
				$(this).removeData('FlowGrid');
			}
		});
	});
})(jQuery);