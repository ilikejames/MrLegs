
var bombui = (function(){

	'use strict';
	
	var stage, layer;
	var bombs = [];
	var man, bannerText;
	var explosion;


	var manAnimation = {

		normal : [
			{
				x:35,
				y:1010,
				width: 230,
				height: 350
			}
		],
		burnt : [
			{
				x:305,
				y:1010,
				width: 230,
				height: 350
			}
		]
	};

	var bombAnimation = {
		unlit : [
			{
				x : 0,
				y : 680,
				width : 161,
				height : 320
			}
		],
		burning : getBombRow(1, 3, 686, 161, 320),
		explode : getBombRow(0, 3, 0, 357, 341).concat(getBombRow(0, 3, 342, 357, 341))
	};

	var textAnimation = {
		normal : 
			[{
				x: 0,
				y: 1408,
				width: 1070,
				height: 87
			}],
		'3' : 
			[{
				x: 0,
				y: 1496,
				width: 1070,
				height: 87
			}],
		'2' : 
			[{
				x: 0,
				y: 1585,
				width: 1070,
				height: 82
			}],
		'1' : 
			[{
				x: 0,
				y: 1670,
				width: 1070,
				height: 82
			}],
		'0' : 
			[{
				x: 0,
				y: 1762,
				width: 1070,
				height: 87
			}]
		
	};

	function getBombRow(start, end, y, width, height) {
		var o = [];
		for(var cols=start; cols<end; cols++) {
			o.push({
				x : cols*width,
				y : y,
				width: width,
				height : height
			});
		}
		return o;
	}

	function onBackgroundLoaded() {
        var background = new Kinetic.Image({
          x: 0,
          y: 0,
          image: this,
          width: stage.getWidth(),
          height: stage.getHeight()
        });
		layer.add(background);      

		var bombsprite = new Image();
		bombsprite.onload = onSpriteLoaded;
		bombsprite.src='images/bomb/sprite5.png';  
	}

	function onSpriteLoaded() {
		var image = this;
		man = new Kinetic.Sprite({
		    x: 0,
		    y: 405,
		    image: this,
		    animation: 'normal',
		    animations: manAnimation,
		    frameRate: 0
		 });
		layer.add(man);
		man.start();

		// add text
		bannerText = new Kinetic.Sprite({
		    x: 128,
		    y: 268,
		    image: this,
		    animation: 'normal',
		    animations: textAnimation,
		    frameRate: 0
		 });
		layer.add(bannerText);
		bannerText.start();



		// add bombs
		for(var i=0; i<4; i++) {
			var bomb = makeBomb(i, image, i==3); 
			bombs.push(bomb);
			layer.add(bomb);
			bomb.start();
		}
	}

	function setCursor(event, e) {
		if(this.getAnimation()!='burning') return;
		document.body.style.cursor = (event=='mouseover' ? 'pointer' : 'default');
	}

	function makeBomb(index, image, isLight) {
		var bomb = new Kinetic.Sprite({
			x : 265 + (index * 210),
			y : 390,
			image : image,
			animation : isLight ? 'burning' : 'unlit',
			animations : bombAnimation,
			frameRate : 10
		});

		bomb.on('mouseover', _.partial(setCursor,'mouseover'));
		bomb.on('mouseout', _.partial(setCursor,'mouseout'));
		bomb.on('click touchstart', _.partial(onBombClick, index));
		return bomb;
	}

	function onBombClick(index, e) {
		if(this.getAnimation()!='burning') return;

		document.body.style.cursor = 'default';
		var sprite = this;
		sprite.setOffset((357-161)/2,-50);
		sprite.stop();

		setTimeout(function() {
			bannerText.setAnimation(index);
        	if(index>0) {
        		bombs[index-1].setAnimation('burning');
        	} 
        	else {
				man.setAnimation('burnt');
				soundmanager.playSound('soundScream');
				man.start();
        	}
      	}, 20);

		sprite.afterFrame(4, function() {
        	sprite.stop();
        	sprite.destroy();
      	});

      	sprite.setAnimation('explode');
      	sprite.start();
		soundmanager.playSound('soundExplosion'); // explosion.play();

	}

	function setWidth(width) {
		stage.setScale(width/1280);
	}

	function init(container){
		stage = new Kinetic.Stage({
			container : container,
			width: 1280,
			height: 780
		});

		soundmanager.preloadSounds(['soundExplosion', 'soundScream']);

		layer = new Kinetic.Layer({});
		stage.add(layer);

		var bkgroundImage = new Image();
		bkgroundImage.onload = onBackgroundLoaded;
		bkgroundImage.src = 'images/bomb/bombbackground.png';
	}

	return {
			init: init,
			setWidth : setWidth
		};

})();