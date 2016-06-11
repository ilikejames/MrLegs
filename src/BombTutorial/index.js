
import {Stage, Layer, Image as KImage, Sprite} from 'konva'
import loadImage from 'image-promise'
import manAnimation from './manSprite'
import textAnimation from './textSprite'
import {preloadSounds, playSound} from 'SoundManager'
import bombAnimation from './bombSprite'


export default class BombTutorial extends Stage {

	constructor(data) {

		super(data);

		preloadSounds(['soundExplosion', 'soundScream']);

		this.layer = new Layer();
		this.add(this.layer);

		Promise.all([
			loadImage('/images/bomb/sprite5.png'),
			loadImage('/images/bomb/bombbackground.png')
		])
		.then((images) => {
			this.init(images);
		});

	}

	init(images) {

		const background = new KImage({
			x: 0,
			y: 0,
			image: images[1],
			width: this.getWidth(),
			height: this.getHeight()
        });

        this.layer.add(background);
        this.bombs = [];
        this.index = 3;

        // man
        this.man = new Sprite({
		    x: 0,
		    y: 430,
		    image: images[0],
		    animation: 'normal',
		    animations: manAnimation,
		    frameRate: 0
		 });
		this.layer.add(this.man);
		this.man.start();

		// text
		this.text = new Sprite({
		    x: 128,
		    y: 268,
		    image: images[0],
		    animation: 'normal',
		    animations: textAnimation,
		    frameRate: 0
		 });
		this.layer.add(this.text);
		this.text.start();


        this.makeBomb(0, images[0]);
    	this.makeBomb(1, images[0]);
    	this.makeBomb(2, images[0]);
    	this.makeBomb(3, images[0], true);

    	this.layer.draw();
	}

	makeBomb(index, image, isLit) {

		let bomb = new Sprite({
			x : 265 + (index * 210),
			y : 390,
			image : image,
			animation : isLit ? 'burning' : 'unlit',
			animations : bombAnimation,
			frameRate : 10
		});

		this.layer.add(bomb);
		this.bombs.push(bomb);
		bomb.start();

		bomb.on('mouseover', this.setCursor.bind(this, 'mouseover'));
		bomb.on('mouseout', this.setCursor.bind(this,'mouseout'));
		bomb.on('click touchstart', this.onBombClick.bind(this, index));
	}

	setCursor(type) {

	}

	onBombClick(index) {

		if(this.index != index) return;

		playSound('soundExplosion');

		this.index = index-1;

		let bomb = this.bombs[index];
		bomb.setOffset((357-161)/2,-50); // the explosion is off position from the bomb
		bomb.on('frameIndexChange', (evt) => {
			console.log(evt.newVal);
			if(evt.newVal==5) {
				bomb.stop();
				bomb.destroy();
				this.layer.draw();
			}

		});

		bomb.setAnimation('explode');

		this.index>=0 && this.bombs[this.index].setAnimation('burning');
		this.text.setAnimation('' + index);

		if(index==0) {
			this.man.setAnimation('burnt');
			playSound('soundScream');
		}


	}
}

