// import _ from 'lodash'
// import {preloadSounds, playSound} from './SoundManager'
// import Kinetic from 'Kinetic'

// export default function BirdAnimation(stage, layer) {

// 	const _layer = layer;
// 	const _stage = stage;

// 	var _image,
// 		_hasReachedLimit = false,
// 		_originalSpawnFrequency = 8400,
// 		_spawnFrequency = _originalSpawnFrequency,
// 		_deadCount = 0,
// 		_scaleModifier = 1,
// 		_birdCount = 0,
// 		_crosshairsLayer,
// 		_crosshairs;

// 	const mousemoveListener = _.throttle(onMouseMove, 10);

// 	function start() {

// 		_image = new Image();
// 		_image.onload = createBird;
// 		_image.src='images/birdsprite.png';

// 		_crosshairsLayer = new Kinetic.Layer({
// 			x: 0,
// 			y: 0,
// 			width : stage.getWidth(),
// 			height : stage.getHeight(),
// 			fill : 'red'
// 		});
// 		_stage.add(_crosshairsLayer);

// 		var crosshair = new Image();
// 		crosshair.onload = _.bind(createCrossHairs, this, crosshair);
// 		crosshair.src = 'images/crosshair.png';

// 		preloadSounds(['soundBirdDeath']);

// 		window.addEventListener('mousemove', mousemoveListener);

// 	}

// 	function destroy() {
// 		window.removeEventListener('mousemove', mousemoveListener)
// 	}



// 	function getFrames() {
// 		var dimensions = {width:200, height:210, cols : 4, rows: 2};
// 		var o = [];
// 		for(var r=0;r<dimensions.rows;r++) {
// 			for(var c=0;c<dimensions.cols; c++) {
// 				o.push({
// 					x : c*dimensions.width,
// 					y : r*dimensions.height,
// 					width : dimensions.width,
// 					height: dimensions.height
// 				});
// 			}
// 		}
// 		return {flight : o};
// 	}

// 	function createBird() {

// 		_birdCount++;
// 		var speed = Math.floor(Math.random() * 12)+4 + (_originalSpawnFrequency/_spawnFrequency);
// 		var y;

// 		if(_scaleModifier>5) {
// 			y = Math.floor(Math.random()*((_stage.getHeight()-150)));
// 		}
// 		else {
// 			y = Math.floor(Math.random()*((_stage.getHeight()-150)/(speed/5))); // smaller should be near top
// 		}

// 		var scale = 1.8/speed * _scaleModifier, // faster, should be smaller to appear further away
// 			size  = 400,
// 			width = scale * size,
// 			duration = _stage.getWidth() / width,
// 			speed = 7,
// 			animation = new Kinetic.Sprite({
// 	          x: _stage.getWidth(),
// 	          y: y,
// 	          image: _image,
// 	          scale : scale,
// 	          animation: 'flight',
// 	          animations: getFrames(),
// 	          frameRate: speed,
// 	          index: speed
// 	     });

// 		_layer.add(animation);
// 		animation.start();

// 		animation.on('mousedown', function(e) {
// 			console.log('click object', e, this);
// 		});

// 		var tween = new Kinetic.Tween({
// 			node: animation,
// 			duration: duration,
// 			x: -width,
// 			onFinish : function() {
// 				this.node.destroy();
// 				this.destroy();
// 				_birdCount--;
// 				spawnIfCan();
// 			}
// 		});
// 		tween.play();

// 		spawnIfCan();
// 	}

// 	function spawnIfCan() {
// 		if(_birdCount<(_deadCount+15)) {
// 			setTimeout(createBird, (Math.random() *_spawnFrequency));
// 		}
// 	}

// 	function createCrossHairs(image) {
// 		_crosshairs = new Kinetic.Image({
// 			image : image,
// 			name : 'crosshair',
// 			x : 0,
// 			y: 0,
// 			offset : {x: 55, y: 56},
// 			opacity : 0.5
// 		});
// 		_crosshairsLayer.add(_crosshairs);
// 		_crosshairsLayer.draw();
// 	}

// 	function onMouseMove(e) {
// 		if(!_crosshairs) return;
// 		_crosshairs.setAttrs({x: e.pageX, y: e.pageY, visible: e.target.tagName!='A'});
// 		_crosshairsLayer.draw();
// 	}

// 	function onClick(pos) {
// 		var obj = _layer.getIntersection(pos);
// 		if(!obj || !obj.shape) return;
// 		obj = obj.shape;
// 		_birdCount--;

// 		var d = _stage.getHeight() - obj.getY() + obj.getHeight();
// 		var a = 200; //  pixels per second
// 		var t = Math.sqrt(d/a);
// 		_deadCount++;

// 		if((_deadCount % 2)==0){
// 			_spawnFrequency *= 0.66;
// 		}

// 		if((_deadCount % 10)==0){
// 			_scaleModifier*= (_deadCount > 20) ? 20 : _deadCount;
// 			_spawnFrequency*=3;
// 			setTimeout(function() {
// 				_scaleModifier=1;
// 				_spawnFrequency=_originalSpawnFrequency;
// 			},6000);
// 		}

// 		// kill it
// 		playSound('soundBirdDeath');

// 		var tween = new Kinetic.Tween({
// 			node: obj,
// 			duration: t,
// 			easing : Kinetic.Easings.EaseIn,
// 			y: _stage.getHeight() + obj.getHeight(),
// 			onFinish : function() {
// 				this.node.destroy();
// 				this.destroy();
// 			}
// 		});
// 		tween.play();

// 		// create a new bird
// 		setTimeout(createBird, 100);
// 	}

// 	return {
// 		start,
// 		onClick
// 	}
// }
