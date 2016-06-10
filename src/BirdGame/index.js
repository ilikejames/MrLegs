
import { Stage, Layer, Rect, Sprite} from 'kinetic'
import Bird from './Bird'

import imageData from './BirdImageData'
import animations from './BirdSpriteFrames'


export default class BirdGame extends Stage {

	constructor(data) {

		console.log('BirdGame', data);
		super(data);

		this.layer = new Layer();
		this.add(this.layer);


		this.birds = [];

		let bird = new Bird(data.width-200, data.height, 10);
		this.layer.add(bird);
		this.birds.push(bird);
		bird.start();


		this.layer.draw();
	}
}
