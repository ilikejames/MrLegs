
import {Sprite, Tween, Easings} from 'konva'
import animations from './BirdSpriteFrames'
import birdImage from './BirdImageData'
import {playSound} from 'SoundManager'

const sprite = {
	width : 200,
	height : 400,
	frame : 8
}

const strokeWidth = 1;

const image = new Image();
image.src=birdImage;



export default class Bird extends Sprite {

	constructor(stageWidth, stageHeight, frequency=1, scaleMultiplier = 1) {

		let speed = Math.floor(Math.random() * 12) + 4 + frequency;
		let frameRate = Math.floor(Math.random() * 12) + 4 + frequency;
		let scale = 1.8 / speed * scaleMultiplier;
		let y = Math.floor(Math.random() * (stageHeight - sprite.height));

		super({
			x : stageWidth,
			y,
			image,
			scale : { x : scale, y : scale },
			animation : 'flight',
			animations,
			frameRate : frameRate,
			fill : 'transparent',
			strokeWidth : strokeWidth/scale,
			frameIndex : Math.floor(Math.random() * sprite.frames)
		})

		this.stageHeight = stageHeight;
		this.stageWidth = stageWidth;

	}

	get width() {
		return this.scale * spriteWidth;
	}

	start() {

		if(!this.tween) {
			this.tween = new Tween({
				node: this,
				duration: this.stageWidth / (this.attrs.scaleX * sprite.width),
				x: -sprite.width * this.attrs.scaleX,
				onFinish : () => {
					this.destroy();
					this.fire('end', null);
				}
			});
		}

		super.start()
		this.tween.play();
	}

	pause() {
		super.stop();
		this.tween.pause();
	}

	setOver(is) {
		if(is && !this.isDying) {
			// this.setStroke('#aaaaaa');
			this.setStroke('rgba(0,0,0,0.4');
			//this.setScale({ x : this.attrs})
		}
		else {
			this.setStroke('transparent');
		}

	}

	die() {

		this.fire('kill', null);

		playSound('soundBirdDeath');

		var d = this.stageHeight - this.getY() + this.getHeight();
		var a = 200; //  pixels per second
		var t = Math.sqrt(d/a);

		super.stop();
		this.isDying = true;

		this.setOver(false);

		this.tween = new Tween({
			node: this,
			duration: t,
			easing : Easings.EaseIn,
			y: this.stageHeight + this.getHeight(),
			onFinish : () => {
				this.destroy();
				this.fire('dead', null);
			}
		});
		this.tween.play();
	}

}



