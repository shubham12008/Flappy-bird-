/*
#SHUBHAM.N.SHAH CREATIONS#
PROUDE TO BE A WHITEHAT CODER
*/



var flappybird, backgound_1, ground;
var imvisibleground, pipe_sensor;
var upper_pipe, lower_pipe;
var intro, playbutton, tapscreenimformation, screen_sensor, gameover, restart;
var lodingscreen, loding_sensor, ground_sensor, loding_result,flappybird_sensor;

var ground_depth;

var upperpipe_x, upperpipe_y;
var lowerpipe_x, lowerpipe_y;


var flappybirdimg, flappybird_jumpimg, backgound_1img, pipeimg, groundimg, introimg, playbuttonimg, gameoverimg;
var lodingscreenimg, lodinginfo_img, trynowimg, restartimg;

var jump_sensor = 0;

var groundgrp, pipegrp, score_sensorgrp;

var PLAY = 1;
var END = 0;
var SERVE = 3;
var gameState = 3;
var score = 0;


function preload() {

  flappybirdimg = loadImage("flappy bird gif.gif");
  flappybird_jumpimg = loadImage("flappy bird jump.gif");
  background_1img = loadImage("background.png")
  background_2img = loadImage("ground.png")
  groundimg = loadImage("ground.png");
  pipeimg = loadImage("pipe.png");
  introimg = loadImage("-intro.png");
  playbuttonimg = loadImage("play_button.png");
  tapscreenimformationimg = loadImage("tap_infromation.png");
  gameoverimg = loadImage("gameover.png");
  lodingscreenimg = loadImage("loding.gif");
  lodinginfo_img = loadImage("loding info.png");
  trynowimg = loadImage("try now.png");
  restartimg = loadImage("restart.png");

 
  flappybird_font = loadFont('FLAPPYBIRDFONTS.ttf');
}

function setup() {
  createCanvas(900, 600);

  backgound_1 = createSprite(450, 110);
  backgound_1.addImage(background_1img);

  imvisibleground = createSprite(450, 543, 900, 30);
  imvisibleground.visible = false;

  flappybird = createSprite(200, 250);
  flappybird.addImage(flappybirdimg);
  flappybird.scale = 0.80;

  playbutton = createSprite(530, 300);
  playbutton.addImage(playbuttonimg);
  playbutton.scale = 0.40;

  intro = createSprite(450, 300);
  intro.addImage(introimg);

  gameover = createSprite(450, 300);
  gameover.addImage(gameoverimg);
  gameover.visible = false;


  screen_sensor = createSprite(450, 300, 900, 600);
  screen_sensor.visible = false;

  lodingscreen = createSprite(530, 380);
  lodingscreen.addImage(lodingscreenimg);
  lodingscreen.visible = false;

  loding_sensor = createSprite(-30, 550, 50, 100);

  loding_result = createSprite(530, 530, 150, 70);
  loding_result.visible = false;
  loding_result.scale = 0.70;

  restart = createSprite(450, 430);
  restart.addImage(restartimg);
  restart.scale = 0.50;
  restart.visible = false;

flappybird_sensor = createSprite(flappybird.x,flappybird.y,1,1)
  
  ground_sensor = "no";

  groundgrp = new Group();
  pipegrp = new Group();
  score_sensorgrp = new Group();

}

function draw() {



  background("225");

  if (gameState === SERVE) {
    flappybird.x = 530;
    flappybird.y = 270;

    score = 0;

    gameover.visible = false;

    intro.x = 450;
    intro.y = 300;
    playbutton.visible = true;
    flappybird.visible = true;
    restart.visible = false;



    create_ground();
  }

  if (flappybird_sensor.isTouching(score_sensorgrp)) {
    score = score + 1/3;
  }

  if (gameState === SERVE && ground_sensor === "no" && keyDown("space") || mousePressedOver(playbutton)) {
    loding_result.visible = true;

  }


  if (gameState === SERVE && ground_sensor === "yes" && keyDown("space") ||
    gameState === SERVE && ground_sensor === "yes" && mousePressedOver(playbutton)) {
    playbutton.visible = false;


    gameState = PLAY;
  }
  create_ground();
  flappybird.x = 200;





  if (gameState === PLAY) {
    intro.y = intro.y - 5;
    restart.x = 900;
    restart.y = 900;
    flappybird.depth = 11;
    pipegrp.setdepthEach = 11;
    lodingscreen.visible = false;
    loding_result.visible = false;



    if (gameState === PLAY && keyDown("space") || mousePressedOver(screen_sensor)) {
      jump_sensor = 5;
    }

    if (gameState === PLAY && jump_sensor === 5 && keyDown("space") || mousePressedOver(screen_sensor)) {
      flappybird.velocityY = -10;
      flappybird.addImage(flappybird_jumpimg);
    } else {

      flappybird.addImage(flappybirdimg);
    }

    if (gameState === PLAY && jump_sensor === 5) {
      flappybird.velocityY = flappybird.velocityY + 1.3
    }

    flappybird.collide(imvisibleground);

    create_pipe();


    if (flappybird.isTouching(pipegrp) || flappybird.isTouching(imvisibleground)) {

      gameState = END;


    }
  }

  if (gameState === END) {

    gameover.visible = true;
    pipegrp.destroyEach();
    score_sensorgrp.destroyEach();
    flappybird.velocityY = 0;
    flappybird.visible = false;
    restart.visible = true;

    restart.x = 450;
    restart.y = 430;

  }




  if (mousePressedOver(restart)) {
    restart_game();
  }



  flappybird.depth = intro.depth + 5;
  playbutton.depth = intro.depth + 5;

  if (ground_sensor === "yes") {
    loding_result.addImage(trynowimg);
    lodingscreen.visible = false;
  }

  if (ground_sensor === "no") {
    loding_result.addImage(lodinginfo_img);
    lodingscreen.visible = true;
  }


  drawSprites();

  draw_score();

}

function create_ground() {
  if (World.frameCount % 3 == 0) {
    var ground = createSprite(1000, 590);
    ground.addImage(groundimg);
    ground.velocityX = -10;
    groundgrp.add(ground);
    ground.lifetime = 170;

    console.log(ground.depth);


    ground.depth = intro.depth - 3;
    ground_depth = ground.depth;

    if (groundgrp.isTouching(loding_sensor)) {
      ground_sensor = "yes";
    }


  }
}


function create_pipe() {
  if (World.frameCount % 100 == 0) {



    upperpipe_x = 1100;
    upperpipe_y = Math.round(random(600, 755));

    var upper_pipe = createSprite(upperpipe_x, upperpipe_y);
    upper_pipe.addImage(pipeimg);
    upper_pipe.velocityX = -4;
    upper_pipe.scale = 0.70;
    pipegrp.add(upper_pipe);
    upper_pipe.depth = flappybird.depth
    upper_pipe.lifetime = 290;
    upper_pipe.depth = ground_depth + 5;

    upperpipe_x = 1100;
    upperpipe_y = Math.round(random(600, 755));

    var lower_pipe = createSprite(1100, Math.round(random(-20, -200)));
    lower_pipe.addImage(pipeimg);
    lower_pipe.velocityX = -4;
    lower_pipe.scale = 0.70;
    lower_pipe.rotateToDirection = -90;
    pipegrp.add(lower_pipe);
    lower_pipe.lifetime = 290;
    lower_pipe.depth = ground_depth + 5;


    var pipe_sensor = createSprite(1160, 300, 10, 500);
    pipe_sensor.velocityX = -4;
    pipe_sensor.lifetime = 290;
    pipe_sensor.visible = false;
    score_sensorgrp.add(pipe_sensor);

    console.log(lower_pipe.y);



  }


}

function restart_game() {
  gameState = SERVE;

}

function draw_score() {


  if (gameState === PLAY) {
    textFont(flappybird_font);
    textSize(60);
    fill("WHITE");
    textStyle(BOLD);
    strokeWeight(10);
    stroke(51);
    text(round (score), width / 2, 100);
  }

  if (gameState === END) {
    textFont(flappybird_font);
    textAlign(CENTER); 
    textSize(60);
    fill("WHITE");
    textStyle(BOLD);
    strokeWeight(10);
    stroke(51);
    text(round (score), 450, 250);

  }
}
