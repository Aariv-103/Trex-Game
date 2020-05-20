var trex,trexrunningImage,trexcollidedImage,groundImage,ground,
    invisibleground,gm,gmImage,r,rImage,cloud,cloudImage,obstacle,
    ob1Image,ob2Image,ob3Image,ob4Image,ob5Image,ob6Image,cloudsGroup,
    obstaclesGroup,bird,birdImage,birdsGroup,score = 0,PLAY = 1, END = 0,
    gameState = PLAY,count = 0,Hi = 0;
    localStorage["HighestScore"] = 0;

function preload() {
  trexrunningImage = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  groundImage = loadImage("ground2.png");
  
  gmImage = loadImage("gameOver.png");
  
  rImage = loadImage("restart.png");
  
  cloudImage = loadImage("cloud.png");
  
  ob1Image = loadImage("obstacle1.png");
  
  ob2Image = loadImage("obstacle2.png");
  
  ob3Image = loadImage("obstacle3.png");
  
  ob4Image = loadImage("obstacle4.png");
  
  ob5Image = loadImage("obstacle5.png");
  
  ob6Image = loadImage("obstacle6.png");
  
  trexcollidedImage = loadAnimation("trex_collided.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,150,20,50);
  trex.addAnimation("trex",trexrunningImage);
  trex.addAnimation("trex_collided",trexcollidedImage);
  trex.scale = 0.5;
  
  ground = createSprite(200,175,400,10);
  ground.addImage("ground",groundImage);
  ground.velocityX = -(6 + 3*score/100);
  
  
  invisibleground = createSprite(200,185,400,10);
  invisibleground.visible = false;
  
  gm = createSprite(300,25,10,10);
  gm.addImage("gm",gmImage);
  gm.scale = 0.5;
  gm.visible = false;
  
  r = createSprite(300,75,10,10);
  r.addImage("r",rImage);
  r.scale = 0.5;
  r.visible = false;
  
  cloudsGroup = new Group();
  
  obstaclesGroup = new Group();
  
  birdsGroup = new Group();
  
  score = 0;
 }

function draw() {
  background(180);
  
  //console.log(score);
  
  
  textSize(15);
  fill('blue');
  text("Score: "+ score, 500, 25);
  var count = localStorage["HieghestScore"];
  text("Hi: "+ count, 400, 25);
  trex.collide(invisibleground);
  
  
  
  if(gameState === PLAY){
   
     score = score + Math.round(getFrameRate()/60);
  
  if(keyDown("space") && trex.y>=150) {
      trex.velocityY = -12;
    } 
    
    trex.velocityY =  trex.velocityY + 0.8;
  
    if(ground.x<0) {
       ground.x = ground.width/2;
    }
  
  if(score >= 500){
     spawnbirds();
  }
  spawnClouds();
  spawnObstacles();
    
  //End the game when trex is touching the obstacle
    if(obstaclesGroup.isTouching(trex)){
     // playSound("jump.mp3");
      gameState = END;
      // playSound("die.mp3");
   }
 }  
  
  else if(gameState === END) {
    gm.visible = true;
    r.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex_collided",trexcollidedImage);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(r)) {
       reset();
  }}
             
 drawSprites(); 
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,125,40,10);
    cloud.y = Math.round(random(50,100));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
     cloud.lifetime = 200;
    
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    //console.log(rand);    
    switch(rand) {
      case 1:obstacle.addImage(ob1Image);
        break;
      case 2:obstacle.addImage(ob2Image);
        break;
      case 3:obstacle.addImage(ob3Image);
        break;
      case 4:obstacle.addImage(ob4Image);
        break;
      case 5:obstacle.addImage(ob5Image);
        break;
      case 6:obstacle.addImage(ob6Image);
        break;
             default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    
    obstaclesGroup.add(obstacle);
  }
}

function spawnbirds() {
  //write code here to spawn the clouds
  
  if (frameCount % 60 === 0) {
    var bird = createSprite(600,125,100,110);
    bird.y = Math.round(random(125,175));
    bird.addImage(cloudImage);
    bird.scale = 0.5;
    bird.velocityX = -(6 + 3*score/100);
    
     //assign lifetime to the variable
     bird.lifetime = 100;

     birdsGroup.add(bird);
  }
 
}

function reset(){
  gameState = PLAY;
  
  gm.visible = false;
  r.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("trex",trexrunningImage);
  
  if(localStorage["HighestScore"]<score){ 
      localStorage["HighestScore"] = score;
  }
    console.log("check"+localStorage["HighestScore"]);
  
  ground.velocityX = -(6 + 3*score/100);
  
  score = 0;
  
}


