
import { Stage, Layer } from 'kinetic'
import Bird from './Bird'
import {preloadSounds} from 'SoundManager'


export default class BirdGame extends Stage {

	constructor(data) {

		console.log('BirdGame', data);
		super(data);

		preloadSounds(['soundBirdDeath']);

		this.layer = new Layer();
		this.add(this.layer);

		this.birds = [];

		setInterval(this.createBird.bind(this), 1000);

		// setInterval(function() {
		// 	var index = Math.floor(Math.random() * this.birds.length);
		// 	this.birds[index].die();
		// }.bind(this), 3000);
	}

	createBird() {

		console.log('createBird');

		let bird = new Bird(this.width(), this.height(), 2);
		this.layer.add(bird);
		this.birds.push(bird);
		bird.subscribe('end', () => {
			let index = this.birds.indexOf(bird);
			this.birds.slice(index, 1);
			console.log('end')
		});
		bird.start();


		this.layer.draw();
	}
}
