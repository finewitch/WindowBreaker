
var  gameFunctions = {
	
	brick :0,
	windows: 0,
	object: 0,
	score: 0,

	//preaload,informations about assets
	preload: function() {
		//mobile phones
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		//loading assets
		game.load.image('background', 'img/background.png');
		game.load.image('ground', 'img/ground.png');
		game.load.image('brick','img/brick.png');
		//sheets
		game.load.spritesheet('windows','img/windows.png',82,74);
	},
	//create
	create: function(){
		//adding sprites
		game.add.sprite(0, 0, 'background');
		game.add.sprite(0, 292, 'ground');
		brick = game.add.sprite(120,120,'brick');
		brick.anchor.set(0.5,0.5);
		//enable physics for the brick padle
		game.physics.enable(brick, Phaser.Physics.ARCADE);
		//displaying scores
		myFont = { font: "bold 56px Arial", fill: "#037A88", stroke: "#FFF", strokeThickness: 12 };
		scoreText = game.add.text(20, 20, gameFunctions.score, myFont);
		//enable gamePhysics
	    game.physics.startSystem(Phaser.Physics.ARCADE);
	    //create group of objects in a loop
		windows = game.add.group();
		game.time.events.loop(500, gameFunctions.spawnWindow);
	},
	update: function(){
		this.brick.x = game.input.x;
		this.brick.y = game.input.y;
		//when objects meet invoke function crash
		game.physics.arcade.collide(brick, this.windows, gameFunctions.crash);
		this.windows.forEach(function(object) {
		    	if(object.y >= game.world.height) {
		    		alert('GAME OVER!\n\nYour score: '+ gameFunctions.score);
		    		location.reload();
		    	}
	})
	}.bind(this),	
	spawnWindow: function(){
		var randomX = game.rnd.integerInRange(0,640-82);
		var randomGravity = game.rnd.integerInRange(200,2000);
		var randomFrame= game.rnd.integerInRange(0,2);
		object = game.add.sprite(randomX,-100, 'windows', randomFrame);
		//enable physics for the windows objects
		game.physics.enable(object, Phaser.Physics.ARCADE);
		object.body.gravity.y = randomGravity;
		windows.add(object);
	}.bind(gameFunctions),
	crash:function(brick, object) {
		object.destroy();
		gameFunctions.score +=10;
		scoreText.setText(gameFunctions.score);
		game.camera.shake(0.01, 200);
	}.bind(this)
		
}
var game = new Phaser.Game(640, 960, Phaser.CANVAS, null, 
	{ 	preload: gameFunctions.preload, 
		create: gameFunctions.create,
		update: gameFunctions.update,
	});
