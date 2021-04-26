// Each time this function is called a GameObject
// is create based on the arguments
// In JavaScript you can consider everything an Object
// including functions
// Author Dawid Jerdonek


// get a handle to the canvas context
var canvas = document.getElementById("game");

// get 2D context for this canvas
var context = canvas.getContext("2d");

//Used for animation
var currentFrame = 0;
var frames = 6;
var initial = new Date().getTime();
var current; // current time

//Used for enemy animation
var enemyCurrentFrame = 0;
var enemyFrames = 6;
var enemyInitial = new Date().getTime();
var enemyCurrent; // current time

var gameWon = false;
var gameLost = false;
var pauseInput = false;
var drawWeapons = false;

var enemyRandom = 0; //Randomly chooses the enemy attack or defence
var playerChoice = 0; 

var defenceOrOffence = 1; //If 0 player is attacking if 1 player is defending

//Background
var backImage = new Image();
backImage.src = "./img/backgroundPrototype.jpg"

//Weapon HUD
var weaponBarImage = new Image();
weaponBarImage.src = "./img/weaponBar.png"

//Health bar images
var healthBarImage = new Image();
healthBarImage.src = "./img/health-bar.png"

var playerHealthBarImage = new Image();
playerHealthBarImage.src = "./img/player-health-bar.png"

//Future Offence Icons
var particleRifle = new Image();
particleRifle.src = "./img/future/offence/particle-rifle.png"
var grenade = new Image();
grenade.src = "./img/future/offence/Plasma_grenade.png"
var plasmaBlade = new Image();
plasmaBlade.src = "./img/future/offence/Plasma_Sword.png"

//Future Defence Icons
var bubbleShield = new Image();
bubbleShield.src = "./img/future/defence/buggle_shield.png"
var omniBlade = new Image();
omniBlade.src = "./img/future/defence/Omni-blade-absorb-magic.png"
var redShield = new Image();
redShield.src = "./img/future/defence/red-future-shield.png"

//Fantasy Offence Icons
var crystalBlade = new Image();
crystalBlade.src = "./img/fantasy/offence/Crystalblade.png"
var crossbow = new Image();
crossbow.src = "./img/fantasy/offence/heavy-crossbow-right.png"
var magicOrb = new Image();
magicOrb.src = "./img/fantasy/offence/magic-orb.png"

//Fantasy Defence Icons
var crystalShield = new Image();
crystalShield.src = "./img/fantasy/defence/Crystal Shield.png"
var magicShield = new Image();
magicShield.src = "./img/fantasy/defence/magic-shield.png"
var physicalShield = new Image();
physicalShield.src = "./img/fantasy/defence/reinforced-shield.png"

//Audio
var deathSound = document.getElementById("sound_of_death");
var music = document.getElementById("sound_of_battle");
var complete = document.getElementById("win_sound");
var counter = 0; //Used for stopping sounds


//Healthbar1 positions
var barX = 50;
var barY = 10;

//HealthBar2 positions
var barTwoX = 450;
var barTwoY = 10;

music.play();

//Game objects, player and enemy
function GameObject(name, img, width, health, x, y) 
{
    this.name = name;
	this.img = new Image(); // Setup image
    this.img.src = img;
	this.width = width;
    this.health = health;
    this.x = x; //Will = to the value we assign
    this.y = y; //Will = to the value we assign
}

// GamerInput (Left, Right, Up, Down)
function GamerInput(input) {
    this.action = input;
}

// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input

// Default Player
var player = new GameObject("Player", "./img/finalPlayer.png", 384, 300, 150, 220);

// Gameobjects is a collection of the Actors within the game
var gameobjects = [player, new GameObject("NPC", "./img/enemyFinal.png", 384, 300, 500, 150)];

// Process keyboard input event
function input(event) 
{

    if (event.type === "keydown") {
        switch (event.keyCode) {
            case 37:
                gamerInput = new GamerInput("Left");
                break; //Left key
            case 38:
                gamerInput = new GamerInput("Up");
                break; //Up key
            case 39:
                gamerInput = new GamerInput("Right");
                break; //Right key
            case 40:
                gamerInput = new GamerInput("Down");
                break; //Down key
            default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } 
	else 
	{
        gamerInput = new GamerInput("None"); //No Input
    }
}

function update() 
{
	healthBar();
	healthBarTwo();
	winLoss();
}

// Draw GameObjects to Console
// Modify to Draw to Screen

function draw() 
{
	// Clear Canvas
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	context.drawImage(backImage, -44, 0, backImage.width, backImage.height);
	context.drawImage(weaponBarImage, 0, 361);

	if(defenceOrOffence == 0) //0 is for ATTACK
	{
		if(gameLost === false && gameWon === false)
		{
			//Future Offence
			context.drawImage(particleRifle,10,425, 150,75);
			context.drawImage(grenade,195,417, 75,75);
			context.drawImage(plasmaBlade,300,415, 80,90);
			
			//Fantasy Defence
			context.drawImage(crystalShield,670,417, 75,75);
			context.drawImage(magicShield,420,417, 75,75);
			context.drawImage(physicalShield,540,415, 75,75);
			
			//Icons 
			context.drawImage(crystalShield,34, 371, 29, 29);
			context.drawImage(magicShield,135, 373, 30, 30);
			context.drawImage(physicalShield,211, 372, 30, 30);
			context.drawImage(crystalShield,246, 373, 29, 29);
			context.drawImage(magicShield,325, 373, 30, 30);
			context.drawImage(physicalShield,361, 372, 30, 30);
			
			if(drawWeapons === true)
			{
				
				//Enemy
				if(enemyRandom == 1)
				{
					context.drawImage(magicShield,400,160, 140,180); 
				}
				else if(enemyRandom == 2)
				{
					context.drawImage(physicalShield,445,220, 80,90); 
				}
				else if(enemyRandom == 3)
				{
					context.drawImage(crystalShield,405,180, 100,175); 
				}
				
				//Player
				if(playerChoice == 1)
				{
					context.drawImage(particleRifle,210,255, 120,45);
				}
				else if(playerChoice == 2)
				{
					context.drawImage(grenade,230,275, 30,30);
				}
				else if(playerChoice == 3)
				{
					context.drawImage(plasmaBlade,210,225, 150,75);
				}
			}		
		}
	}
	else if(defenceOrOffence == 1) //1 is for DEFENCE
	{
		if(gameWon === false && gameLost === false)
		{
			//Future Defence
			context.drawImage(omniBlade,10,415, 150,75);
			context.drawImage(bubbleShield,195,418, 75,75);
			context.drawImage(redShield,310,418, 75,75);
			
			//Fantasy Offence
			context.drawImage(crystalBlade,645,420, 150,75);
			context.drawImage(crossbow,440,415, 75,75);
			context.drawImage(magicOrb,532,412, 90,90);
			
			//Icons 
			context.drawImage(magicOrb,35, 370, 30, 30);
			context.drawImage(crossbow,100, 373, 30, 30);
			context.drawImage(crossbow,210, 373, 30, 30);
			context.drawImage(crystalBlade,244,373, 40,30);
			context.drawImage(crystalBlade,320,373, 40,30);
			context.drawImage(magicOrb,363, 372, 30, 30);
			
			if(drawWeapons === true)
			{
				//Enemy
				if(enemyRandom == 1)
				{
					context.drawImage(crossbow,460,220, 80,80); 
				}
				else if(enemyRandom == 2)
				{
					context.drawImage(magicOrb,485,250, 40,40); 
				}					
				else if(enemyRandom == 3)
				{
					context.drawImage(crystalBlade,360,220, 200,100); 
				}
					
				
				//Player
				if(playerChoice == 1)
				{
					context.drawImage(omniBlade,220,250, 120,45);
				}
				else if(playerChoice == 2)
				{
					context.drawImage(bubbleShield,130,190, 150,150);
				}
				else if(playerChoice == 3)
				{
					context.drawImage(redShield,230,205, 100,140);
				}
			}
		}
	}

	if(gameLost === false)
	{	
		// Iterate through all GameObjects
		for (i = 0; i < gameobjects.length - 1; i++) 
		{
			if (gameobjects[i].health > 0) 
			{
				//console.log("Image :" + gameobjects[i].img);
				healthBar();
				// Draw each player GameObject  (img, width, health, x, y)
								//Image which we use - Allow image to animate using current frame    -    - draw using the width of each frame - the height of the image - position x       - position y     -
				context.drawImage(gameobjects[i].img, gameobjects[i].x, gameobjects[i].y, 110, 120);

			}
		}
	}
	
	if(gameWon === false)
	{	
		for (i = 1; i < gameobjects.length; i++) 
		{
			if (gameobjects[i].health > 0) 
			{
				healthBarTwo();
				// Draw each enemy GameObject  (img, width, health, x, y)
				context.drawImage(gameobjects[i].img, gameobjects[i].x, gameobjects[i].y, 150, 200)

			}
		}
		
	}	
	
	if(gameWon === true)
	{
		context.font = "30px Georgia";
		context.fillText("YOU WIN", 332, 300);
	}
	if(gameLost === true)
	{
		context.font = "30px Georgia";
		context.fillText("YOU LOSE", 326, 300);
	}
}

function gameloop() 
{
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

// Draw a HealthBar on Canvas, used to indicate players health
function healthBar() 
{
	var width = 300;
	var height = 20;
	var max = 300;
	var val = gameobjects[0].health;

	// Draw the fill
	if(gameobjects[0].health >= 100)
	{
		context.fillStyle = "#00FF00";
	}
	else if(gameobjects[0].health < 100)
	{
	context.fillStyle = "#FF0000";
	}
	var fillVal = Math.min(Math.max(val / max, 0), 1);
	context.fillRect(barX, barY , fillVal * width, height);
	
	//Draw Frame
	context.drawImage(playerHealthBarImage, barX - 20, barY - 10 , 340,45);
}

//2nd HealthBar 
function healthBarTwo() 
{
	var width = 300;
	var height = 20;
	var max = 300;
	var val = gameobjects[1].health;

	// Draw the fill
	if(gameobjects[1].health >= 100)
	{
		context.fillStyle = "#00FF00";
	}
	else if(gameobjects[1].health < 100)
	{
	context.fillStyle = "#FF0000";
	}
	var fillVal = Math.min(Math.max(val / max, 0), 1);
	context.fillRect(barTwoX , barTwoY, fillVal * width, height);
	
	//Draw Frame
	context.drawImage(healthBarImage, barTwoX - 20, barTwoY - 10 , 340,45);
}

function onPageLoad() 
{

   
    var url = document.location.href;
    var search = window.location.search;
	
	var result = url.split("="); // Splits string based on =
	//alert(url);
    //alert(search);
	//alert(result[0]);
	alert(result[1]);
}

function enemyChoose()
{
	enemyRandom = Math.floor((Math.random() * 3) + 1);
}


function buttonOnClick1() //Defence OmniBlade, Attack PlasmaRifle
{
	playerChoice = 1;
	if(pauseInput === false)
	{
		pauseInput = true;
		enemyChoose();
		drawWeapons = true;
		draw();
		setTimeout(battle1,3000);
		
	}
}

function buttonOnClick2() //Defence Bubble Shield,Attack Grenade
{
	playerChoice = 2;
	if(pauseInput === false)
	{
		pauseInput = true;
		enemyChoose();
		drawWeapons = true;
		draw();
		setTimeout(battle2,3000);
		
	}
}

function buttonOnClick3() //Defence Power Shield, Attack Plasma Blade
{
	playerChoice = 3;
	if(pauseInput === false)
	{
		pauseInput = true;
		enemyChoose();
		drawWeapons = true;
		draw();
		setTimeout(battle3,3000);
		
	}
}

function battle1() //resets input and shows animation
{

		if(defenceOrOffence == 0) //0 is for ATTACK
		{
			if(gameLost === false)
			{
				if(enemyRandom == 1)
				{

					gameobjects[1].health = gameobjects[1].health - 5; //Element Rifle vs Magic Shield
				}
		
				if(enemyRandom == 2)
				{
					//context.drawImage(particleRifle,10,425, 150,75);

					gameobjects[1].health = gameobjects[1].health - 25; //Element Rifle vs Reinforced Shield
				}
		
				if(enemyRandom == 3)
				{
					//context.drawImage(particleRifle,10,425, 150,75);
					
					gameobjects[1].health = gameobjects[1].health - 60; //Element Rifle vs Crystal Shield
				}
			}
			
			defenceOrOffence = 1;
		}
		else if(defenceOrOffence == 1) //1 is for DEFENCE
		{
			if(gameWon === false)
			{
				if(enemyRandom == 1)
				{

					gameobjects[0].health = gameobjects[0].health - 60; //MultiBlade vs Crossbow
				}
		
				if(enemyRandom == 2)
				{

					gameobjects[0].health = gameobjects[0].health - 5; //MultiBlade vs Magic Orb
				}
		
				if(enemyRandom == 3)
				{

					gameobjects[0].health = gameobjects[0].health - 25; //MultiBlade vs Crystal Blade
				}
			}
			
			defenceOrOffence = 0;
		}
		
	pauseInput = false;
	drawWeapons = false;
}

function battle2() //resets input and shows animation
{
		if(defenceOrOffence == 0) //0 is for ATTACK
		{
			if(gameLost === false)
			{
				if(enemyRandom == 1)
				{
					gameobjects[1].health = gameobjects[1].health - 25; //Grenade vs Magic Shield
				}
			
				if(enemyRandom == 2)
				{
					gameobjects[1].health = gameobjects[1].health - 60; //Grenade vs Reinforced Shield
				}
			
				if(enemyRandom == 3)
				{

					gameobjects[1].health = gameobjects[1].health - 5; //Grenade vs Crystal Shield
				}

			}
			
			defenceOrOffence = 1;
		}
		else if(defenceOrOffence == 1) //1 is for DEFENCE
		{
			if(gameWon === false)
			{
				if(enemyRandom == 1)
				{
					gameobjects[0].health = gameobjects[0].health - 5; //Bubble Shield vs Crossbow
				}
			
				if(enemyRandom == 2)
				{
					gameobjects[0].health = gameobjects[0].health - 25; //Bubble Shield vs Magic Orb
				}
			
				if(enemyRandom == 3)
				{
					gameobjects[0].health = gameobjects[0].health - 60; //Bubble Shield vs Crystal Blade
				}
			}
			
			defenceOrOffence = 0;
		}
	pauseInput = false;
	drawWeapons = false;
}

function battle3() //resets input and shows animation
{
	if(defenceOrOffence == 0) //0 is for ATTACK
		{
			if(gameLost === false)
			{
				if(enemyRandom == 1)
				{
					gameobjects[1].health = gameobjects[1].health - 60; //Plasma Blade vs Magic Shield
				}
			
				if(enemyRandom == 2)
				{
					gameobjects[1].health = gameobjects[1].health - 5; //Plasma Blade vs Reinforced Shield
				}
			
				if(enemyRandom == 3)
				{
					gameobjects[1].health = gameobjects[1].health - 25; //Plasma Blade vs Crystal Shield
				}
			}
			
			defenceOrOffence = 1;

		}
		else if(defenceOrOffence == 1) //1 is for DEFENCE
		{
			
			if(gameWon === false)
			{
				if(enemyRandom == 1)
				{
					gameobjects[0].health = gameobjects[0].health - 25; //PowerShield vs Crossbow
				}
			
				if(enemyRandom == 2)
				{
					gameobjects[0].health = gameobjects[0].health - 60; //PowerShield vs Magic Orb
				}
			
				if(enemyRandom == 3)
				{
					gameobjects[0].health = gameobjects[0].health - 5; //PowerShield vs Crystal Blade
				}
			}
			
			defenceOrOffence = 0;
		}
	pauseInput = false;
	drawWeapons = false;
}

function winLoss() //Check for win or loss condition
{
	if (gameobjects[0].health < 1)
	{
		loss();
	}
	
	if (gameobjects[1].health < 1)
	{
		win();
	}
	
}

function loss()
{
	if(counter == 0) 
	{
		music.pause();
		deathSound.play();
		counter++;
	}
	gameLost = true;
}

function win()
{
	if(counter == 0) 
	{
		music.pause();
		deathSound.play();
		complete.play();
		counter++;
	}
	gameWon = true;
}


// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);



