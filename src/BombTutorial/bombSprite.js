function getBombRow(start, end, y, width, height) {
	var o = [];
	for(var cols=start; cols<end; cols++) {
		o.push({
			x : cols*width,
			y : y,
			width: width,
			height : height
		});
	}
	return o;
}


const bomb = {
	unlit : [
		{
			x : 0,
			y : 680,
			width : 161,
			height : 320
		}
	],
	burning : getBombRow(1, 3, 686, 161, 320),
	explode : getBombRow(0, 3, 0, 357, 341).concat(getBombRow(0, 3, 342, 357, 341))
};


export default bomb
