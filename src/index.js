
import Kinetic from 'kinetic'
//import BirdAnimation from './BirdAnimation'
import BirdGame from './BirdGame'
import BombTutorial from './BombTutorial'
import './googleAnalytics';


function init() {

	// const stage = new Kinetic.Stage({
	//     container: 'birds',
	//     width: window.innerWidth,
	//     height: window.innerHeight
	//  });

	// const layer = new Kinetic.Layer({ width:stage.getWidth(), height:stage.getHeight() });
	// stage.add(layer);

	// const birds = new BirdAnimation(stage, layer);
	// birds.start();
	//
	const birdGame = new BirdGame({
		container : 'birds',
		width : window.innerWidth,
		height : window.innerHeight
	});


	var bombTutorial = new BombTutorial('carousel');
	bombTutorial.setWidth(document.querySelector('#carousel').scrollWidth);
}



function onWindowResize(e) {
	// bombui.setWidth($('#carousel').width());
	// stage.setWidth($(document).width());
	// stage.setHeight($(document).height());
}

// $('#app-store .iphone').click(function (e) {
// 	$('#iphone-not-ready').modal({overlayClose:true, autoResize:true, autoPosition:true});
// 	return false;
// });


//$(window).resize(_.debounce(onWindowResize,100));
//$(window).on('mousedown touchstart', function(e) { birdAnimations.onClick({x:e.clientX, y:e.clientY}); });

document.addEventListener('DOMContentLoaded', init);
