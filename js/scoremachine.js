/*
var scoremachine = (function(){
	
	var layer;
	var hi = 0, score = 0;
	var board, lblScore, lblHi;

	function onFontLoaded() {

	}

	function add() {
		score++;

		if(hi>score) {
			hi = score;
			lblHi.setText(hi);
		}
		lblScore.setText(score);
	}

	function remove() {
		if(score>0) {
			score--;
		}
		lblScore.setText(score);
	}

	function reset() {
		score = 0;
		lblScore.setText(score);
	}

	function init(layer, image) {
		var boardWidth = 200;
		var x = layer.getWidth() - boardWidth - 20;
		var spacing = 20;

		var boardAnimation = {
			normal : [
				{
					
				}
			]
		};

		board = new Kinetic.Sprite(){
		    x: x,
		    y: 0,
		    image: image,
		    animation: 'normal',
		    animations: boardAnimation,
		    frameRate: 0
		});
		layer.add(board);

		lblHi = new Kinetic.Text({
			text : hi,
			fontFamily : 'digital_dreamregular',
			fontSize : 20,
			align : 'right'
			x : x + spacing,
			y : spacing,
			width : boardWidth/2 - (spacing*2);
			fill : '#ffffff'
		});
		layer.add(lblHi);

		lblScore = new Kinetic.Text({
			text : score,
			fontFamily : 'digital_dreamregular',
			fontSize : 20,
			align : 'right'
			x : lblHi.getX() + lblHi.getWidth() + spacing,
			y : spacing,
			width : boardWidth/2 - (spacing*2);
			fill : '#ffffff'
		});
		layer.add(lblHi);
	}

	return {
		init : init,
		add : add,
		remove : remover,
		reset : rest 
	};


})();
*/