var ghost1, ghostImage;
var tower, towerImg;
var door, doorImg, doorG;
var climber, climberImg, climberG;
var invisibleBlockGroup, invisibleBlock;
var ghosts;
var distance = 0;
var gameState = "play";

function preload(){
  towerImg = loadImage("Images/tower.png");
  doorImg = loadImage("Images/door.png");
  climberImg = loadImage("Images/climber.png");
  ghostImg = loadImage("Images/ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  
  doorG = new Group();
  climberG = new Group();
  invisibleBlockGroup = new Group();

  ghost1 = createSprite(200,200,50,50);
  ghost1.addImage("ghost1",ghostImg);
  ghost1.scale = 0.3

  ghosts = [ghost1];
}

function draw(){
  background(towerImg);
  
  if(gameState === "play"){
    
    var index = 0;
    var x = 0;
    var y;

    index = index + 1;
    x = x + 200;
    y = 600-distance;
    ghosts[index-1].y = y;//0
    camera.position.x = 600/2;
    camera.position.y = ghosts[index-1].y;
  
  if(keyDown("left_arrow")){
    ghost1.x = ghost1.x -5;
     }
  if(keyDown("right_arrow")){
    ghost1.x = ghost1.x +5;
     }
  if(keyDown(32)){
    ghost1.velocityY = -5;
    distance += 5; 
  }
  
  if(climberG.isTouching(ghost1)){
    ghost1.velocityY = 0
  }
  if(frameCount%60 === 0){
    spawnDoor();
    tower.y = 400;
  }
  drawSprites();
  if(invisibleBlockGroup.isTouching(ghost1) || ghost1.y>600){
    ghost1.destroy();
    gameState = "end";
  }
  
     } else if(gameState === "end"){
       stroke("yellow");
       fill("yellow");
       textSize(30);
       text("Game Over",230,250);
       
     }
  
  
  
  
  
  
}

function spawnDoor(){
      door = createSprite(200,-50);
      door.addImage(doorImg);
      door.velocityY = 1;
      door.x = Math.round(random(120,400));
      door.lifetime = 600;
    
      climber = createSprite(200,10);
      climber.addImage(climberImg);
      climber.x = door.x;
      climber.velocityY = 1
      climber.lifetime = 600;
    
      invisibleBlock = createSprite(200,15);
      invisibleBlock.width = climber.width;
      invisibleBlock.height = 2;
      invisibleBlock.x = door.x;
      invisibleBlock.velocityY = 1;
      invisibleBlock.debug = true;
      invisibleBlockGroup.add(invisibleBlock);
    
      ghost1.depth = door.depth;
      ghost1.depth = ghost1.depth+1;
    
      doorG.add(door);
      climberG.add(climber);
}

