
import _ from 'lodash';


let cachedSounds = {};


export function preloadSounds(sounds) {

	sounds.forEach( x => {
		let s = document.getElementById(x);
		if(s && s.play) {
			s.volume = 0;
			s.play();
			cachedSounds[x] = s;
			setTimeout( () => {
				s.pause();
				s.currentTime=0;
				s.volume=0.2;
			}, 10);
		}
	});

}

export function playSound(soundId) {
	var sound = cachedSounds[soundId];
	if(! (sound && sound.play)) return;
	if(!sound.paused){
		sound.currentTime=0;
	}
	sound.play();
}

