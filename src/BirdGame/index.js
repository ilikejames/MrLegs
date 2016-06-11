
import { Stage, Layer } from 'konva'
import Bird from './Bird'
import {preloadSounds} from 'SoundManager'


const defaultFrequency = 8400
const defaultScale = 1
const defaultLargeScale = 8

export default class BirdGame extends Stage {

	constructor(data) {

		super(data);

		this.spawnFrequency = defaultFrequency;
		this.scaleModifier = defaultScale;
		this.kills = 0;
		this.survived = 0;


		preloadSounds(['soundBirdDeath']);

		this.layer = new Layer();
		this.add(this.layer);

		this.birds = [];

		this.createBird();


		window.addEventListener('mousemove', this.mousemove.bind(this));

		window.addEventListener('click', () => {
			if(!this.lastOver) return;
			this.lastOver.die();
			this.kills++;

			if((this.kills % 2)==0) {
				// spawn!
				this.spawnFrequency *=0.3;
				this.scaleModifier = defaultLargeScale;
				this.createBird();

				setTimeout( () => {
					// clear the large scale
					this.spawnFrequency *=(10/3);
					this.scaleModifier = defaultScale;
				}, 5000);
			}
		});

	}

	mousemove(e) {
		let o = this.layer.getIntersection( { x : e.pageX, y : e.pageY });
		this.lastOver && this.lastOver.setOver(false);
		if(o) {
			o.setOver(true);
			this.lastOver = o;
			document.documentElement.classList.add('crosshairs');
		}
		else {
			document.documentElement.classList.remove('crosshairs');
		}
	}

	createBird() {

		let bird = new Bird(this.width(), this.height(), 1, this.scaleModifier);

		this.layer.add(bird);
		this.birds.push(bird);

		bird.on('end dead', (e) => {
			if(e.type=='end') {
				this.survived++;
				//console.log('survived %d, killed %d', this.survived, this.kills);
			}
			let index = this.birds.indexOf(bird);
			this.birds.slice(index, 1);
		});

		this.layer.draw();
		bird.start();

		let nextBirdSpawn = Math.random() * this.spawnFrequency;
		setTimeout(() => this.createBird(), nextBirdSpawn);

	}
}


