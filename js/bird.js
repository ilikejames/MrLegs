
var birdAnimations = (function(){

	'use strict';

	var _layer, 
		_image,
		_stage,
		_hasReachedLimit = false,
		_originalSpawnFrequency = 5400,
		_spawnFrequency = _originalSpawnFrequency,
		_deadCount = 0,
		_scaleModifier = 1,
		_birdCount = 0;

	function getFrames() {
		var dimensions = {width:200, height:210, cols : 4, rows: 2};
		var o = [];
		for(var r=0;r<dimensions.rows;r++) {
			for(var c=0;c<dimensions.cols; c++) {
				o.push({
					x : c*dimensions.width,
					y : r*dimensions.height,
					width : dimensions.width,
					height: dimensions.height
				});
			}
		}
		return {flight : o};
	}

	function createBird() {

		_birdCount++;
		var speed = Math.floor(Math.random() * 12)+4 + (_originalSpawnFrequency/_spawnFrequency); 
		var y;

		if(_scaleModifier>5) {
			y = Math.floor(Math.random()*((_stage.getHeight()-150)));
		}
		else {
			y = Math.floor(Math.random()*((_stage.getHeight()-150)/(speed/5))); // smaller should be near top			
		}
		

		var scale = 1.8/speed * _scaleModifier, // faster, should be smaller to appear further away
			size  = 400,
			width = scale * size,
			duration = _stage.getWidth() / width,
			speed = 7,
			animation = new Kinetic.Sprite({
	          x: _stage.getWidth(),
	          y: y,
	          image: _image,
	          scale : scale,
	          animation: 'flight',
	          animations: getFrames(),
	          frameRate: speed,
	          index: speed
	     });

		_layer.add(animation);
		animation.start();

		animation.on('mousedown', function(e) {
			console.log('click object', e, this);
		});

		var tween = new Kinetic.Tween({
			node: animation,
			duration: duration,
			x: -width,
			onFinish : function() {
				this.node.destroy();
				this.destroy();
				_birdCount--;
				spawnIfCan();
			}
		});
		tween.play();

		spawnIfCan();
	}

	function spawnIfCan() {
		if(_birdCount<(_deadCount+15)) {
			setTimeout(createBird, (Math.random() *_spawnFrequency));
		}
	}

	function start(stage, layer) {
		_stage = stage;
		_layer = layer;
		_image = new Image();
		_image.onload = createBird;
		_image.src='images/birdsprite.png';

		soundmanager.preloadSounds(['soundBirdDeath']);
	}

	function onClick(pos) {
		var obj = _stage.getIntersection(pos);
		if(!obj || !obj.shape) return;
		obj = obj.shape;
		_birdCount--;

		var d = _stage.getHeight() - obj.getY() + obj.getHeight();
		var a = 200; //  pixels per second
		var t = Math.sqrt(d/a);
		_deadCount++;

		if((_deadCount % 2)==0){
			_spawnFrequency *= 0.66;
		}

		if((_deadCount % 10)==0){
			_scaleModifier*= (_deadCount > 30) ? 30 : _deadCount;
			_spawnFrequency*=3;
			setTimeout(function() {
				_scaleModifier=1;
				_spawnFrequency=_originalSpawnFrequency;
			},4000);
		}

		// kill it
		soundmanager.playSound('soundBirdDeath');

		var tween = new Kinetic.Tween({
			node: obj,
			duration: t,
			easing : Kinetic.Easings.EaseIn,
			y: _stage.getHeight() + obj.getHeight(),
			onFinish : function() {
				this.node.destroy();
				this.destroy();
			}
		});
		tween.play();

		// create a new bird
		setTimeout(createBird, 100);
	}

	return {
		start : start,
		onClick : onClick
		 };

})();