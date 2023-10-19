const express = require('express');
const app = express();

app.use(express.static("public"));

let flagColors = {
  "rainbow": ["#e40303", "#ff8c00", "#ffed00", "#008026", "#24408e", "#732982"],
  "lesbian": ["#d42c00", "#fd9855", "#ffffff", "#d161a2", "#a20161"],
  "gay": ["#078d70", "#26ceaa", "#98e8c1", "#ffffff", "#7bade2", "#5049cc"],
  "bi": ["#d70071", "#9c4e97", "#0035aa"],
  "pan": ["#ff218c", "#ffd800", "#21b1ff"],
  "omni": ["#fe9ace", "#ff53bf", "#200044", "#6760fe", "#8ea6ff"],
  "asexual": ["#000000", "#a3a3a3", "#ffffff", "#800080"],
  "transgender": ["#5bcffb", "#f5abb9", "#ffffff", "#f5abb9", "#5bcffb"],
  "enby": ["#fcf431", "#ffffff", "#9d59d2", "#2c2c2c"],
  "german": ["#2c2c2c", "#dd0000", "#ffcc00"]
}

app.get('/', (req, res) => { //basic rainbow
  res.send(generatePageHTML(flagColors.rainbow));
});

app.get('/:flag', (req, res) => {
  let flag = req.params.flag.toLowerCase(); //making it case-insensitive, so /mLm is the same as /mlm for example

  if (flag == "lesbian" || flag == "wlw" || flag == "nmlnm" || flag == "sarah") {
    res.send(generatePageHTML(flagColors.lesbian));
  } 
  else if (flag == "gay" || flag == "mlm" || flag == "nwlnw" || flag == "y") {
    res.send(generatePageHTML(flagColors.gay));
  } 
  else if (flag == "bi" || flag == "bisexual") {
    res.send(generatePageHTML(flagColors.bi));
  } 
  else if (flag == "pan" || flag == "pansexual") {
    res.send(generatePageHTML(flagColors.pan));
  }
  else if (flag == "omni" || flag == "omnisexual" || flag == "arisa") {
    res.send(generatePageHTML(flagColors.omni));
  }
  else if (flag == "ace" || flag == "asexual") {
    res.send(generatePageHTML(flagColors.asexual));
  }
  else if (flag == "trans" || flag == "transgender") {
    res.send(generatePageHTML(flagColors.transgender));
  }
  else if (flag == "enby" || flag == "non-binary" || flag == "nonbinary" || flag == "theythem") {
    res.send(generatePageHTML(flagColors.enby));
  }
  else if (flag == "german" || flag == "germany") {
    res.send(generatePageHTML(flagColors.german));
  }
  else { //if user tries to go to a random flag subpage that doesn't exist,
    res.redirect('/'); //redirect them to the home page
  }
});

app.listen(process.env['PORT'], () => {
  console.log('Running!');
});

//parameter "flag"
function generatePageHTML(flagColors) {
  return `<!DOCTYPE html>
<html>
<head>
  <title>Pride Space</title>
  <meta property="og:title" content="Pride Space"/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="https://pridespace.ga"/>
  <meta property="og:description" content="some pride snake thing flying through space idk. use your cursor (on laptop/PC) or finger (on touchscreen) to change the direction/size of the snake"/>
  <meta property="og:image" content="/assets/favicon.ico"/>
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300');
    * {
      margin: 0px;
      font-family: 'Montserrat';
    }

    body {
      overscroll-behavior: contain;
    }

    a {
      color: inherit;
      font-weight: bold;
    }
    
    #canvas {
      width: 100vw;
      height: 100vh;
      background-color: black;
    }

    .hidden {
      display: none;
    }
  </style>
  <link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <!-- Load the Paper.js library -->
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.15/paper-full.min.js"></script>
  <!-- Define inlined PaperScript associate it with myCanvas -->
  <script type="text/paperscript" canvas="canvas">
    var playing = false;

    var mousePos = view.center + [view.bounds.width / 3, 100];
    var position = view.center;
    
    function onFrame(event) {
    	position += (mousePos - position) / 10;
    	var vector = (view.center - position) / 10;
    	moveStars(vector * 3);
    	moveRainbow(vector, event);
    }
    
    function onMouseMove(event) {
    	mousePos = event.point;
    }
    
    var moveStars = new function() {
    	// The amount of stars we want to place
    	var count = 20;
    
    	// Create a star "Symbol", which we will use to place instances of later:
    	var path = new Path.Circle({
    		center: [0, 0],
    		radius: 5,
    		fillColor: 'white',
    		strokeColor: 'black'
    	});
    
    	var star = new Symbol(path);
    
    	// Place the instances of the star:
    	for (var i = 0; i < count; i++) {
    		// The center position is a random point in the view:
    		var starPosition = Point.random() * view.size;
    		var placed = star.place(starPosition);
    		placed.scale(i / count + 0.01);
    		placed.data = {
    			vector: new Point({
    				angle: Math.random() * 360,
    				length : (i / count) * Math.random() / 5
    			})
    		};
    	}
    
    	var vector = new Point({
    		angle: 45,
    		length: 0
    	});
    
    	function keepInView(item) {
    		var position = item.position;
    		var viewBounds = view.bounds;
    		if (position.isInside(viewBounds))
    			return;
    		var itemBounds = item.bounds;
    		if (position.x > viewBounds.width + 5) {
    			position.x = -item.bounds.width;
    		}
    
    		if (position.x < -itemBounds.width - 5) {
    			position.x = viewBounds.width;
    		}
    
    		if (position.y > viewBounds.height + 5) {
    			position.y = -itemBounds.height;
    		}
    
    		if (position.y < -itemBounds.height - 5) {
    			position.y = viewBounds.height
    		}
    	}
    
    	return function(vector) {
    		// For-loop through the active layer's children and change the position of the placed stars:
    		var layer = project.activeLayer;
    		for (var i = 0; i < count; i++) {
    			var item = layer.children[i];
    			var size = item.bounds.size;
    			var length = vector.length / 10 * size.width / 10;
    			item.position += vector.normalize(length) + item.data.vector;
    			keepInView(item);
    		}
    	};
    };
    
    var moveRainbow = new function() {
    	var paths = [];
    	var colors = ${JSON.stringify(flagColors)};
    	for (var i = colors.length - 1; i >= 0; i--) {
    		var path = new Path({
    			fillColor: colors[i]
    		});
    		paths.push(path);
    	}
    
    	var count = 30;
    	var group = new Group(paths);
    	var headGroup;
    	var eyePosition = new Point();
    	var eyeFollow = (Point.random() - 0.5);
    	var blinkTime = 200;
    	function createHead(vector, count) {
    		var eyeVector = (eyePosition - eyeFollow);
    		eyePosition -= eyeVector / 4;
    		if (eyeVector.length < 0.00001)
    			eyeFollow = (Point.random() - 0.5);
    		if (headGroup)
    			headGroup.remove();
    		var top = paths[0].lastSegment.point;
    		var bottom = paths[paths.length - 1].firstSegment.point;
    		var radius = (bottom - top).length / 2;
    		var circle = new Path.Circle({
    			center: top + (bottom - top) / 2,
    			radius: radius,
    			fillColor: 'black'
    		});
    		circle.scale(vector.length / 100, 1);
    		circle.rotate(vector.angle, circle.center);
    
    		innerCircle = circle.clone();
    		innerCircle.scale(0.5);
    		innerCircle.fillColor = (count % blinkTime < 3)
    			|| (count % (blinkTime + 5) < 3) ? 'black' : 'white';
    		if (count % (blinkTime + 40) == 0)
    			blinkTime = Math.round(Math.random() * 40) + 200;
    		var eye = circle.clone();
    		eye.position += eyePosition * radius;
    		eye.scale(0.15, innerCircle.position);
    		eye.fillColor = 'black';
    		headGroup = new Group(circle, innerCircle, eye);
    	}
    
    	return function(vector, event) {
    		var vector = (view.center - position) / 10;
    
    		if (vector.length < 5)
    			vector.length = 5;
    		count += vector.length / 100;
    		group.translate(vector);
    		var rotated = vector.rotate(90);
    		var middle = paths.length / 2;
    		for (var j = 0; j < paths.length; j++) {
    			var path = paths[j];
    			var swing = playing ? Math.sin(event.count / 2) * vector.length : 1;
    			var unitLength = vector.length * (2 + Math.sin(event.count / 10)) / 2;
    			var length = (j - middle) * unitLength + swing;
    			var top = view.center + rotated.normalize(length);
    			var bottom = view.center + rotated.normalize(length + unitLength);
    			path.add(top);
    			path.insert(0, bottom);
    			if (path.segments.length > 200) {
    				var index = Math.round(path.segments.length / 2);
    				path.segments[index].remove();
    				path.segments[index - 1].remove();
    			}
    			path.smooth();
    		}
    		createHead(vector, event.count);
    	}
    }
  </script>
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="/script.js" defer></script>
</head>
<body>
	<canvas id="canvas" resize></canvas>
</body>
</html>`;
}
