
import BirdGame from './BirdGame'
import BombTutorial from './BombTutorial'
import './googleAnalytics'
import './fb'


var birdGame;
var bombTutorial;

function init() {

	birdGame = new BirdGame({
		container : 'birds',
		width : window.innerWidth,
		height : window.innerHeight
	});

	// var bombTutorial = new BombTutorial('carousel');
	// bombTutorial.setWidth(document.querySelector('#carousel').scrollWidth);
	let w =  document.querySelector('#carousel').scrollWidth;
	bombTutorial = new BombTutorial({
		width : 1280,
		height : 780,
		container : 'carousel'
	});
	bombTutorial.scale({ x : w/1280, y: w/1280 });

}



function onWindowResize(e) {

	let w =  document.querySelector('#carousel').scrollWidth;
	bombTutorial.scale({ x : w/1280, y: w/1280 });

	//birdGame.setWidth()

}

// $('#app-store .iphone').click(function (e) {
// 	$('#iphone-not-ready').modal({overlayClose:true, autoResize:true, autoPosition:true});
// 	return false;
// });


//$(window).resize(_.debounce(onWindowResize,100));
//$(window).on('mousedown touchstart', function(e) { birdAnimations.onClick({x:e.clientX, y:e.clientY}); });

document.addEventListener('DOMContentLoaded', init);
