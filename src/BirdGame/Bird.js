
import Kinetic from 'Kinetic'
import animations from './BirdSpriteFrames'
import birdImage from './BirdImageData'


const speedMod = 1
const sprite = {
	width : 400,
	height : 150
}

const image = new Image();
image.src=birdImage;


export default class Bird extends Kinetic.Sprite {

	constructor(stageWidth, stageHeight, frequency) {

		let index =  Math.floor(Math.random() * 12) + 4; // + (_originalSpawnFrequency/_spawnFrequency)
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
			frameRate : 8,
			frameIndex : index,
			stroke : 'black',
			strokeWidth : 5
		}

		super(data);

		let tween = new Kinetic.Tween({
			node: this,
			duration: duration,
			x: -sprite.width,
			onFinish : function() {
				this.node.destroy();
				this.destroy();
				//_birdCount--;
				//spawnIfCan();
			}
		});
		tween.play();
	}

	get width() {
		return this.scale * spriteWidth;
	}

}



