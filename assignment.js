var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;

var engine;
var ground1;
var ball1;
var cylinder;
var hourGlass;
var square;
var ball2;

var shapeDisplayed = true;
var ballDisplayed = true;
var cylinderDisplayed = false;
var hourglassDisplayed = false;
var squareDisplayed = false;
var ball2Displayed = false;
var imageDisplayed = false;
var startTime;
var gravity = { x: 0, y: 0}; ;
var img;

var b1_x, b1_y, b1_speed;
var b2_x, b2_y, b2_speed;
var b3_x, b3_y, b3_speed;
var tri_x,tri_y, tri_speed;
var s_x,s_y, s_speed;


function preload(){
  img = loadImage('crescendo-oglogo.png');
}

function setup() {
  createCanvas(1280, 720);
  frameRate(60);

  engine = Engine.create();

  // Create shapes
  initialValue();
}


function draw() {
  background(0, 0, 255);

  Engine.update(engine);

  // Draw grounds
  fill(255);
  rectMode(CENTER);
  //rect(ground1.position.x, ground1.position.y, width, 10);
  if(shapeDisplayed){
    drawShape();
  }  

}

function initialValue(){
  ground1 = Bodies.rectangle(width / 2, height/1.5, width, 10, { isStatic: true });

  ball1 = Bodies.circle(width / 2, height /2, 50, {
    isStatic: false,
    friction: 0,
    restitution: 2,
  });

  cylinder = Bodies.rectangle(width / 2, 300, 200, 400, {
    isStatic: false,
    friction: 2,
    restitution: 1,
    angle: radians(-10),
  });

  hourGlass = Bodies.rectangle(width / 2, height /2, 100, 200, {
    isStatic: false,
    friction: 2,
    restitution: .8,
    angle: radians(-20),
  });

  square = Bodies.rectangle(width/2,height/2,width/6,width/6, {
    isStatic: false,
    friction: 0,
    restitution: 2,
    angle: radians(-20),
  });

  ball2 = Bodies.circle(width / 2, height /2, 50, {
    isStatic: false,
    friction: 0,
    restitution: 1.5,
    angle: radians(-40),
  });

  World.add(engine.world, [ground1, ball1]);

  b1_x = width / 2 + 100;
  b1_y = height / 2 - 50;
  b1_speed = 0;

  b2_x = width / 2 + 50;
  b2_y = height / 2 - 40;
  b2_speed = 0;

  b3_x = width / 2 -80;
  b3_y = height / 2 - 80;
  b3_speed = 0;

  tri_x = width / 2 +10;
  tri_y = height / 2.5 ;
  tri_speed = 0;

  s_x = width / 2 ;
  s_y = height / 2 ;
  s_speed = 0;
 
 
  startTime = millis();
}

function drawShape(){

  if (ballDisplayed) {
    fill(0, 0, 255);
    push();
    translate(ball1.position.x, ball1.position.y);
    stroke(255);
    strokeWeight(5);
    drawBall1(0,0,width/3); 
    
    pop();

    
    b1_speed += 0.02; 
    b1_y += b1_speed;

    b2_speed += 0.05; 
    b2_y += b2_speed;

    b3_speed += 0.03; 
    b3_y += b3_speed;

    tri_speed -= 0.02; 
    tri_y += tri_speed;

    // Draw b1 and b2
    fill('gold');
    noStroke();
    circle(b1_x, b1_y, width / 24); // Adjust size of b1

    fill('#add8e6');
    circle(b2_x, b2_y, width / 50); // Adjust size of b2
    circle(b2_x-10, b2_y-30, width / 50);

    

    fill(0,0,255);
    stroke('gold');
    strokeWeight(3);
    circle(b3_x, b3_y, width / 32); // Adjust size of b2
    circle(b3_x+50, b3_y+30, width / 32);

    triangle(tri_x,tri_y,tri_x -20,tri_y-30,tri_x+20,tri_y-30);

    
    // Check if ball has completed bouncing
    if (millis() - startTime > 1200) { // e.g., 1.5 seconds delay
      ballDisplayed = false;
      cylinderDisplayed = true;
      
      World.remove(engine.world, ball1);
      World.add(engine.world, cylinder);

      startTime = millis(); // Reset the timer
    }
  }

  if (cylinderDisplayed) {
    // Draw cylinder
    push();
    translate(cylinder.position.x, cylinder.position.y);
    rotate(cylinder.angle);
    stroke(255);
    strokeWeight(5);
    drawCylinder(0, 0, 120, 240);
    pop();

    if (millis() - startTime > 1500) { // e.g., 1.5 seconds delay
      cylinderDisplayed = false;
      hourglassDisplayed = true;
      
      World.remove(engine.world, cylinder);
      World.add(engine.world, hourGlass);

      startTime = millis(); // Reset the timer
    }
  }

  if (hourglassDisplayed) {
    // Draw hourglass
    push();
    translate(hourGlass.position.x, hourGlass.position.y);
    rotate(hourGlass.angle);
    stroke(255);
    strokeWeight(5);
    drawHourglass(0, 0);
    pop();

     
    b1_y += b1_speed;
    b1_speed -= 0.02;
    b1_x += b1_speed;

    b2_speed -= 0.05;
    b2_y += b2_speed;
    b2_speed -= 0.03;
    b2_x += b2_speed;

    tri_speed += 0.04; 
    tri_y += tri_speed;

    s_speed += 0.01;
    s_y += s_speed;
    s_x-= s_speed;

    fill (255);
    noStroke();
    circle(b2_x-25,b2_y-15,width/50);

    noFill();
    stroke('gold');
    circle(b1_x-80,b1_y+50,width/40);

    stroke('#add8e6');
    triangle(tri_x-10,tri_y+200,tri_x -30,tri_y+230,tri_x+10,tri_y+230);

    stroke(255);
    rect(s_x-20, s_y+130,30);

    if (millis() - startTime > 1500) { // e.g., 1.5 seconds delay
      hourglassDisplayed = false;
      squareDisplayed = true;
      
      World.remove(engine.world, hourGlass);
      World.add(engine.world, square);

      startTime = millis(); // Reset the timer
    }
  }

  if (squareDisplayed){
    push();
    translate(square.position.x, square.position.y);
    rotate(square.angle);
    stroke('yellow');
    strokeWeight(5);
    drawSquare(0, 0,width/6);
    gravity = { x: -0.001, y: -0.03}; 
    Body.applyForce(square, square.position, gravity);
    pop();
    
    b1_speed += 0.01;
    b1_y += b1_speed;
    b1_speed += 0.005;
    b1_x += b1_speed;

    b2_speed =0;
    b2_speed +=0.001;
    b2_y += b2_speed;

    tri_speed -= 0.03; 
    tri_y += tri_speed;

    s_speed -= 0.02;
    s_y += s_speed;
    s_speed += 0.003;
    s_x-= s_speed;

    noFill();
    stroke('gold');
    circle(b1_x-120,b1_y-120,width/25);

    stroke('#add8e6');
    triangle(tri_x-60,tri_y-10,tri_x -80,tri_y-40,tri_x-40,tri_y-40);

    fill(255);
    noStroke();
    rect(s_x+60,s_y-50,30);

    fill('gold');
    circle(b2_x-10,b2_y-70,width/60);

    if (millis() - startTime > 1500) { // e.g., 1.5 seconds delay
      squareDisplayed = false;
      ball2Displayed = true;

      World.remove(engine.world, square);
      World.add(engine.world, ball2);

      startTime = millis(); // Reset the timer
    }

  }

  if (ball2Displayed){
    push();
    translate(ball2.position.x, ball2.position.y);
    rotate(ball2.angle);
    stroke(255);
    strokeWeight(5);
    drawBall2(0, 0,width/6);
    gravity = { x: -0.001, y: -0.003};
    Body.applyForce(ball2, ball2.position, gravity);
    pop();

    b1_speed += 0.02; 
    b1_y += b1_speed;
    b1_speed += 0.001;
    b1_x -= b1_speed;
    
    b2_speed += 0.018;
    b2_x -= b2_speed*2;


    b3_speed -= 0.001; 
    b3_y += b3_speed;
    b3_speed -= 0.01;
    b3_x -= b3_speed;

    fill('#add8e6');
    circle(b1_x-100,b1_y-140,width/60);
    circle(b3_x +150,b3_y-50,width/60);

    fill ('gold');

    circle(b3_x +140,b3_y-90,width/60);
    circle(b2_x+20,b2_y-40,width/60);



    if (millis() - startTime > 1500) { // e.g., 1.5 seconds delay
      ball2Displayed = false;      
      World.remove(engine.world, ball2);

      imageDisplayed = true;

      startTime = millis(); // Reset the timer
    }
  }

  if(imageDisplayed){
    image(img, width/2.5, height/2.5);
    if(millis() - startTime > 1500){
      imageDisplayed = false;
      initialValue();
      ballDisplayed = true;
    }
  }
  
}


function drawBall1(x,y,w){
  ellipse(x,y,w);

}

function drawCylinder(x, y, r, h) {
  let topY = y - h / 2;
  let bottomY = y + h / 2;

  fill(0, 0, 255);
  ellipse(x, topY, r * 2, r * 2);
  ellipse(x, bottomY, r * 2, r * 2);

  line(x - r, topY, x - r, bottomY);
  line(x + r, topY, x + r, bottomY);
}

function drawHourglass(x, y) {
  let x1 = x -150;
  let y1 = y -200;
  let x2 = x + 150;
  let y2 = y - 200;
  let x3 = x;
  let y3 = y;

  fill(0, 0, 255);
  triangle(x1, y1, x2, y2, x3, y3);

  y1 = y + 200;
  y2 = y + 200;
  fill(0, 0, 255);
  triangle(x1, y1, x2, y2, x3, y3);

  let sBallX = 0;
  let sBally = -20;
  let bSize = 20;
  noStroke();
  fill('#add8e6');
  
  for(let i=0; i<4; i++){
    circle(sBallX,sBally,bSize);
    sBallX-=15;
    sBally-=20;

  }

  sBallX = 10;
  sBally = -45;
  for(let i=0; i<2;i++){
    circle(sBallX,sBally,bSize);
    sBallX-=15;
    sBally-=20;
    
  }
}

function drawSquare(x, y, w) {
  fill(0,0,255);
  rect(x, y, w);

  noStroke();
  fill (255);
  circle(x+50,w/(-2),w/6);

  stroke('blue');
  strokeWeight(5);
  circle(x+50,w/(-2),w/18);

  stroke('#add8e6');
  noFill();
  circle(w/(-2),y+80,w/10);

}

function drawBall2(x,y,w){
  noFill();
  circle(x,y,w);

  circle(w/2.2,w/5,w/6);
}

