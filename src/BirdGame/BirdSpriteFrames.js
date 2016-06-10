const birdSprite = {
  "flight": [
    {
      "x": 0,
      "y": 0,
      "width": 200,
      "height": 210
    },
    {
      "x": 200,
      "y": 0,
      "width": 200,
      "height": 210
    },
    {
      "x": 400,
      "y": 0,
      "width": 200,
      "height": 210
    },
    {
      "x": 600,
      "y": 0,
      "width": 200,
      "height": 210
    },
    {
      "x": 0,
      "y": 210,
      "width": 200,
      "height": 210
    },
    {
      "x": 200,
      "y": 210,
      "width": 200,
      "height": 210
    },
    {
      "x": 400,
      "y": 210,
      "width": 200,
      "height": 210
    },
    {
      "x": 600,
      "y": 210,
      "width": 200,
      "height": 210
    }
  ]
}

var a = birdSprite.flight.reduce( (acc, x) => {
	acc.push(x.x);
	acc.push(x.y);
	acc.push(x.width);
	acc.push(x.height);
	return acc;
}, [])

// console.log(JSON.stringify(a));
export default { flight : a }




