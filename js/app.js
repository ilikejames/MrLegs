$(function() {
	var stage = new Kinetic.Stage({
        container: 'birds',
        width: window.innerWidth,
        height: window.innerHeight
     });

	var layer = new Kinetic.Layer({width:stage.getWidth(), height:stage.getHeight()});
	stage.add(layer);
	birdAnimations.start(stage, layer);

	bombui.init('carousel');
	bombui.setWidth($('#carousel').width());

	function onWindowResize(e) {
		bombui.setWidth($('#carousel').width());
		stage.setWidth($(document).width());
		stage.setHeight($(document).height());
	}

	$('#app-store .iphone').click(function (e) {
		$('#iphone-not-ready').modal({overlayClose:true, autoResize:true, autoPosition:true});
		return false;
	});

	$(window).resize(_.debounce(onWindowResize,100));
	$(window).on('mousedown touchstart', function(e) { birdAnimations.onClick({x:e.clientX, y:e.clientY}); });
});