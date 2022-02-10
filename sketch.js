var balloon,balloonImage1,balloonImage2;
var database;
var balloonPosition;
var height;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1500,700);
  
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPosition = database.ref("Balloon/height"); 
  balloonPosition.on("value", readPosition, showError);
     
}

function updateHeight(x,y){
  database.ref('Balloon/height').set({
   'x': height.x + x,
   'y': height.y + y
  })
}

function readPosition(data){
   height = data.val();
   balloon.x = height.x;
   balloon.y =  height.y
}

function showError() {
  console.log("Error in writing to the database");
}
    


// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(-5,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(5,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,-5);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,5);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
  