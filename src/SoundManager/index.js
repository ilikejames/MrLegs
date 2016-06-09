
import _ from 'lodash';


let cachedSounds = {};

export function preloadSounds(sounds) {
	// for(var i=0, sound; sound=sounds[i]; i++){
	// 	var s = document.getElementById(sound);
	// 	if(s && s.play) {
	// 		s.volume = 0;
	// 		s.play();
	// 		cachedSounds[sound] = s;
	// 		setTimeout(_.partial(function(s){
	// 			s.pause();
	// 			s.volume=0.2;
	// 		}, s), 10);
	// 	}
	// }
}

export function playSound(soundId) {
	// var sound = cachedSounds[soundId];
	// if(! (sound && sound.play)) return;
	// if(!sound.paused){
	// 	sound.currentTime=0;
	// }
	// sound.play();
}

