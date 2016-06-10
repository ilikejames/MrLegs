
import Kinetic from 'kinetic'
import manAnimation from './manSprite'
import textAnimation from './textSprite'
import {preloadSounds, playSound} from 'SoundManager'
import bombAnimation from './bombSprite'


export default function BombTutorial(container) {

	const stage = new Kinetic.Stage({
			container : container,
			width: 1280,
			height: 780
		});

	const layer = new Kinetic.Layer({});


	let bombs = [];
	let man, bannerText;
	let explosion;

	init();


	this.setWidth = function setWidth(width) {
		stage.setScale(width/1280);
	}


	function init() {
		stage.add(layer);
		preloadSounds(['soundExplosion', 'soundScream']);
		let bkgroundImage = new Image();
		bkgroundImage.onload = onBackgroundLoaded;
		bkgroundImage.src = 'images/bomb/bombbackground.png';
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
				playSound('soundScream');
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


}
