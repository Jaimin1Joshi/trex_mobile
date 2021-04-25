var trex , trexrunning , edges , ground , groundimg , ground2, randomno, cloud , clouimg, obstacle,  o1,o2,o3,o4,o5,o6, count, gamestate, cloudgrp, obstaclegrp,play,end,trexcrashimg, overobj,restartobj,overimg,restartimg, hicount,jumpsd,diesd,cpsd;
function preload(){
  trexrunning = loadAnimation("trex1.png","trex3.png","trex4.png");// to load images
  groundimg = loadImage("ground2.png");
  cloudimg =loadImage("cloud.png");
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  trexcrashimg= loadAnimation("trex_collided.png");
  overimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
  jumpsd = loadSound("jump.mp3");
  diesd = loadSound("die.mp3");
  cpsd = loadSound("checkPoint.mp3");
}

function setup() {// to add before draw procedures
   //test = createSprite(80,50,20,20);
  //console.log(test.x);
  createCanvas(windowWidth,windowHeight);
  //test = createSprite(80,50,20,20);
  trex = createSprite (50,height-90,20,50);
  trex.addAnimation("run",trexrunning);
  trex.addAnimation("crash",trexcrashimg);
  // scaling image 
  trex.scale = 0.5;
    edges=createEdgeSprites();
  ground = createSprite(width/2,height -85,width,10);
  // to add image
  ground.addImage("ground",groundimg);
  
  ground2 = createSprite(width/2,height-55,width,10);
  // to make invisible ground
  ground2.visible = false;
 //creating repeated backgroung
  ground.x = ground.width/2;
  
  //random = Math.round(random(1,100));
  //console.log(random);
  count =0;
  hicount=0;
  
  play=1;
  end=0;
  
  gamestate =play;
  //grouping clouds and obtascles
  obstaclegrp=new Group();
  cloudgrp=new Group();
  overobj = createSprite(width/2,height/2,30,30);
  overobj.addImage("crash",overimg);
  overobj.visible = false;
  restartobj = createSprite(width/2,height/3,30,30);
  restartobj.visible = false;
  restartobj.addImage("replay",restartimg);
  restartobj.scale=0.5;
  trex.setCollider("rectangle",0,0,110,110);
//trex.debug=true;
  
  
}
function draw(){
  background("lightblue");
  // scoreboard
  text(count ,width-50,15);
  text("HI:" + hicount,width-100,15);
  if(gamestate===play){
    trex.changeAnimation("run",trexrunning);
    if((keyDown("space") || touches.length>0) && trex.y>height-100){
    trex.setVelocity(0,-10);
      console.log(height);
    jumpsd.play();
    }
    trex.velocityY=trex.velocityY+0.5;
    
    ground.velocityX = -10;
    if (ground.x<0) {
    ground.x = ground.width/2;}
    
    clouds();
    spawnobstacle();
    
    count = count + Math.round(getFrameRate()/60);
    
     /*if(count % 100 ===0 ) && (count {
       
     }*/
  if(count>0 && count % 100 === 0){
    cpsd.play();
  
  }
    if(trex.isTouching(obstaclegrp)){
      gamestate=end;
      diesd.play();
    }
  }
  else if(gamestate===end){
    ground.setVelocity(0,0); 
    cloudgrp.setVelocityXEach(0);
    obstaclegrp.setVelocityXEach(0);
    obstacle.lifetime= -14;
    cloud.lifetime= -14;
    trex.velocityY=0;
    trex.changeAnimation("crash", trexcrashimg);
    overobj.visible = true;
restartobj.visible = true;
    
    if(count > hicount){
      hicount=count;
      
    }
    if(mousePressedOver(restartobj)){
      
      
      obstaclegrp.destroyEach();
      cloudgrp.destroyEach();
      overobj.visible = false;
      restartobj.visible = false;
      gamestate=play;
      count=0;
    }

  }
   /*if(keyDown("shift")){
      gamestate= "play";
    }*/
  
 //console.log(gamestate);
  
  //trex.collide(edges[2]);
  trex.collide(ground2);  
  
    //console.log(frameCount);
  
  
  
  
  drawSprites();
}
function clouds() {
  if (frameCount % 60 === 0){
   
  cloud = createSprite(width+20,height-300,10,10);
     cloud.addImage("cloudimg", cloudimg);
     cloud.scale =1.3;
    cloud.y=Math.round(random(height-500,30));
    cloud.x=Math.round(random(width-20,580));
cloud.setVelocity(-2,0); 
cloud.depth = trex.depth;
    trex.depth=trex.depth +1;
    cloud.lifetime=220;
    cloudgrp.add(cloud);
    }
}
function spawnobstacle(){
  if (frameCount % 60 === 0){
    obstacle = createSprite(600,height-80,10,10);
    obstacle.setVelocity(-10,0);
    randomno = Math.round(random(1,6));
    switch(randomno){
        case 1: obstacle.addImage(o1);
        break;
        case 2:obstacle.addImage(o2);
        break;
        case 3:obstacle.addImage(o3);
        break;
        case 4:obstacle.addImage(o4);
        break;
        case 5:obstacle.addImage(o5);
        break;
        case 6:obstacle.addImage(o6);
        break;
    }
    obstacle.scale=0.5
    obstacle.lifetime=200;
    obstaclegrp.add(obstacle);
    if(count>0 && count % 100 === 0){
    
    obstaclegrp.setVelocityXEach( obstaclegrp.setVelocityXEach() - count/100);}
    //obstacle.debug=true;
  }
}
