
import Kinetic from 'Kinetic'
import animations from './BirdSpriteFrames'
import birdImage from './BirdImageData'
import {playSound} from 'SoundManager'

const speedMod = 1
const sprite = {
	width : 400,
	height : 150
}

const image = new Image();
image.src=birdImage;



export default class Bird extends Kinetic.Sprite {

	constructor(stageWidth, stageHeight, frequency) {

		let index =  Math.floor(Math.random() * 8); // + (_originalSpawnFrequency/_spawnFrequency)
		let frameRate = Math.floor(Math.random() * 12) + 4 + frequency;
		let scale = 1.8 / index * speedMod;
		let y = Math.floor(Math.random() * (stageHeight - sprite.height));
		let x = stageWidth;
		let duration = stageWidth / (scale * sprite.width);
		let data = {
			x,
			y,
			image,
			scale,
			animation : 'flight',
			animations,
			frameRate : frameRate,
			frameIndex : index
		}

		super(data);

		this.listeners = {};
		this.stageHeight = stageHeight;


		this.tween = new Kinetic.Tween({
			node: this,
			duration: duration,
			x: -sprite.width,
			onFinish : () => {
				//this.tween.node.destroy();
				this.destroy();
				this.trigger('end');
			}
		});

	}

	get width() {
		return this.scale * spriteWidth;
	}

	start() {
		super.start()
		this.tween.play();
	}

	pause() {
		super.pause();
		this.tween.pause();
	}

	trigger(type) {
		if(!this.listeners[type]) return;
		this.listeners[type].forEach(x => x());
	}

	subscribe(type, fn) {

		var isSubscribed = true;
		this.listeners[type] = this.listeners[type] || [];
		this.listeners[type].push(fn);

		return function unsubscribe() {

			if (!isSubscribed) {
				return
			}

			isSubscribed = false

			var index = this.listeners[type].indexOf(fn)
			this.listeners.splice(index, 1)

		}.bind(this);
	}

	die() {

		this.trigger('kill');

		playSound('soundBirdDeath');

		var d = this.stageHeight - this.getY() + this.getHeight();
		var a = 200; //  pixels per second
		var t = Math.sqrt(d/a);

		var tween = new Kinetic.Tween({
			node: this,
			duration: t,
			easing : Kinetic.Easings.EaseIn,
			y: this.stageHeight + this.getHeight(),
			onFinish : () => {
				this.destroy();
				this.trigger('dead');
			}
		});
		tween.play();
	}

}



