import{setDirection} from "./snake"

const canvas = document.getElementById('ctx');
const ctx = canvas.getContext('2d');
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
	
var music = new Audio('static/audio/Nokia_Groovy_Blues.mp3')

music.volume = 0.75;
music.loop = true; 
music.play();


var Knap = function(x,y,nr,imgPath){
	var self = {
		x:x,
		y:y,
		nr:nr,
		aktiv:0,
		image: new Image(),
		draw: function() {
			ctx.drawImage(self.image, self.x, self.y);
		},
		
			
	}
	
	self.image.src = imgPath + self.nr + self.aktiv + ".png";
	
	return self;
}

var Entity = function(x,y,maxSpd,dir,jumpHeight,ImgPath,keyUp,keyDown,keyLeft,keyRight,keyJump){
	var self = {
		x:x,
		y:y,
		spdX:0,
		spdY:0,
		maxSpd:maxSpd,
		dir:dir,
		jump:0,
		jumpX:0,
		jumping:false,
		jumpHeight:jumpHeight,
		image: new Image(),
		jumpSound: new Audio('/static/audio/jump.mp3'),
		draw: function() {
			ctx.drawImage(self.image, self.x, self.y);
		},
		upPressed:false,
		downPressed:false,
		leftPressed:false,
		rightPressed:false,
		jumpPressed:false,
		
	}
	
	self.image.src = ImgPath + self.dir + ".png";
	
	
	self.updatePosition = function(){
		self.updateSpd();
		self.updateJump();
		self.x += self.spdX;
		self.y += self.spdY + self.jumpX;
	}
	
	self.updateSpd = function(){

		var dirX = 0;
		var dirY = 0;
		var length = 0;
		if(self.rightPressed)
			dirX += 1;
		if(self.leftPressed)
			dirX -= 1;
		if(self.upPressed)
			dirY -= 1;
		if(self.downPressed)
			dirY += 1;

		length = Math.sqrt(dirX * dirX + dirY * dirY);
		if (length != 0){
			dirX /= length;
			dirY /= length;

			self.spdX = dirX * self.maxSpd;
			self.spdY = dirY * self.maxSpd;
		}
		else {
			self.spdX = 0;
			self.spdY = 0;
		}

	}
	
	self.updateJump = function(){
		if(self.jumpPressed === true && self.jump === 0){
			self.jumping = true;
			self.jumpSound.play();
		}
		if(self.jumping === true && self.jump < self.jumpHeight){
			self.jump += 1;
			self.jumpX = -1;
		}
		if(self.jump === jumpHeight){
			self.jumping = false;	
		}
		if(self.jumping === false && self.jump > 0){
			self.jump -= 1;
			self.jumpX = 1;
		}
		if(self.jumping === false && self.jump === 0){
			self.jumpX = 0;	
		}


	}
		
	document.addEventListener('keydown', function(event){
		if(event.keyCode === keyUp){
			self.upPressed = true;
			self.dir = 0;
			self.image.src = ImgPath + self.dir + ".png";
		}
		if(event.keyCode === keyDown){
			self.downPressed = true;
			self.dir = 1;
			self.image.src = ImgPath + self.dir + ".png";
		}
		if(event.keyCode === keyLeft){
			self.leftPressed = true;
			self.dir = 2;
			self.image.src = ImgPath + self.dir + ".png";
		}
		if(event.keyCode === keyRight){
			self.rightPressed = true;
			self.dir = 3;
			self.image.src = ImgPath + self.dir + ".png";
		}
		if(event.keyCode === keyJump)
			self.jumpPressed = true;
	});
	document.addEventListener('keyup', function(event){
		if(event.keyCode === keyUp)
			self.upPressed = false;
		if(event.keyCode === keyDown)
			self.downPressed = false;
		if(event.keyCode === keyLeft)
			self.leftPressed = false;
		if(event.keyCode === keyRight)
			self.rightPressed = false;
		if(event.keyCode === keyJump)
			self.jumpPressed = false;
	});

	return self;
}

var map = Entity(0,0,0,0,0,'/static/img/Nokia');

var player1 = Entity(50,50,2,1,15,'/static/img/Player',87,83,65,68,32);
	
var player2 = Entity(100,100,2,1,15,'/static/img/Player2',38,40,37,39,16);

var knapImgPath = '/static/img/knap'
var knap1 = Knap(150,315,1,knapImgPath);
var knap2 = Knap(225,315,2,knapImgPath);
var knap3 = Knap(300,315,3,knapImgPath);
var knap4 = Knap(150,355,4,knapImgPath);
var knap5 = Knap(225,355,5,knapImgPath);
var knap6 = Knap(300,355,6,knapImgPath);
var knap7 = Knap(150,395,7,knapImgPath);
var knap8 = Knap(225,395,8,knapImgPath);
var knap9 = Knap(300,395,9,knapImgPath);
var knap10 = Knap(150,435,10,knapImgPath);
var knap11 = Knap(225,435,11,knapImgPath);
var knap12 = Knap(300,435,12,knapImgPath);
	
requestAnimationFrame(gameLoop)
	
function gameLoop() {
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	checkKnapCol(player1);
	checkKnapCol(player2);
	updatePosition();
	draw();
	requestAnimationFrame(gameLoop);
	
}
	
function checkKnapCol(player){
	checkKnapCol2(player,knap1);
	checkKnapCol2(player,knap2);
	checkKnapCol2(player,knap3);
	checkKnapCol2(player,knap4);
	checkKnapCol2(player,knap5);
	checkKnapCol2(player,knap6);
	checkKnapCol2(player,knap7);
	checkKnapCol2(player,knap8);
	checkKnapCol2(player,knap9);
	checkKnapCol2(player,knap10);
	checkKnapCol2(player,knap11);
	checkKnapCol2(player,knap12);
}
	
function checkKnapCol2(player,knap){
	
	if(player.x + 16 >= knap.x
	   && player.x + 0 <= knap.x + 50
	   && player.y + 16 >= knap.y
	   && player.y + 8 <= knap.y + 25
	   && player.jumping === false
	   && player.jump === 1){
		
			knap.aktiv = 1;
			knap.image.src = knapImgPath + knap.nr + knap.aktiv + ".png";	
		
			if(knap === knap2) setDirection('up');
			if(knap === knap8) setDirection('down');
			if(knap === knap4) setDirection('left');
			if(knap === knap6) setDirection('right');
		
			if(knap != knap1){
				knap1.aktiv = 0;
				knap1.image.src = knapImgPath + knap1.nr + knap1.aktiv + ".png";	
			}
			if(knap != knap2){
				knap2.aktiv = 0;
				knap2.image.src = knapImgPath + knap2.nr + knap2.aktiv + ".png";	
			}
			if(knap != knap3){
				knap3.aktiv = 0;
				knap3.image.src = knapImgPath + knap3.nr + knap3.aktiv + ".png";	
			}
			if(knap != knap4){
				knap4.aktiv = 0;
				knap4.image.src = knapImgPath + knap4.nr + knap4.aktiv + ".png";	
			}
			if(knap != knap5){
				knap5.aktiv = 0;
				knap5.image.src = knapImgPath + knap5.nr + knap5.aktiv + ".png";	
			}
			if(knap != knap6){
				knap6.aktiv = 0;
				knap6.image.src = knapImgPath + knap6.nr + knap6.aktiv + ".png";	
			}
			if(knap != knap7){
				knap7.aktiv = 0;
				knap7.image.src = knapImgPath + knap7.nr + knap7.aktiv + ".png";	
			}
			if(knap != knap8){
				knap8.aktiv = 0;
				knap8.image.src = knapImgPath + knap8.nr + knap8.aktiv + ".png";	
			}
			if(knap != knap9){
				knap9.aktiv = 0;
				knap9.image.src = knapImgPath + knap9.nr + knap9.aktiv + ".png";	
			}
			if(knap != knap10){
				knap10.aktiv = 0;
				knap10.image.src = knapImgPath + knap10.nr + knap10.aktiv + ".png";	
			}
			if(knap != knap11){
				knap11.aktiv = 0;
				knap11.image.src = knapImgPath + knap11.nr + knap11.aktiv + ".png";	
			}
			if(knap != knap12){
				knap12.aktiv = 0;
				knap12.image.src = knapImgPath + knap12.nr + knap12.aktiv + ".png";	
			}
	}
}
	
	
function updatePosition() {
	player1.updatePosition();	
	player2.updatePosition();	
}
	
function draw() {
	map.draw();
	knap1.draw();
	knap2.draw();
	knap3.draw();
	knap4.draw();
	knap5.draw();
	knap6.draw();
	knap7.draw();
	knap8.draw();
	knap9.draw();
	knap10.draw();
	knap11.draw();
	knap12.draw();
	player1.draw();
	player2.draw();

}
