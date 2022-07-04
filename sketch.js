const Engine = Matter.Engine; //mecanismo
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint; //ligaçao

var engine, world;

var ground, platform;
var box1, box2, box3, box4, box5;
var log1, log2, log3, log4, log5;
var pig1,pig2;
var bird, slingshot;
var backgroundImg;
var refresh;
var btnMute, music;
var bg = "sprites/bg.png";
var pontuacao = 0;

var gameState = "onSling";

function preload() {
    //getBackgroundImg();

    music = loadSound("sprites/music.mp3");
}

function setup(){
    canvas = createCanvas(1000,500);

    engine = Engine.create();
    world = engine.world;

    ground = new Ground(500,height,1000,20);
    platform = new Ground(150,height - 80,300,170);

    box1 = new Box(700,450,70,70);
    box2 = new Box(920,450,70,70);
    pig1 = new Pig(810, 420);
    log1 = new Log(810,400,300, PI/2);

    box3 = new Box(700,350,70,70);
    box4 = new Box(920,350,70,70);
    pig2 = new Pig(810, 330);
    log3 =  new Log(810,300,300, PI/2);

    box5 = new Box(810,250,70,70);
    log4 = new Log(750,250,150, PI/7);
    log5 = new Log(860,250,150, -PI/6);

    bird = new Bird(200,250);

    slingshot = new SlingShot(bird.body,{x:200, y:175});

    refresh = createImg("sprites/menu_refresh.png");
    refresh.position(500,35);
    refresh.size(50,50);
    refresh.mouseClicked(restart);

    btnMute = createImg("sprites/mute.png");
    btnMute.position(900,35);
    btnMute.size(50,50);
    btnMute.mouseClicked(silence);

    music.play();
    //music.setVolume();
}

function draw(){
    if(backgroundImg)
    background(backgroundImg);
    
    text("pontuaçao"+pontuacao,500,500)

    Engine.update(engine);

    ground.display();
    platform.display();

    box1.display();
    box2.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig2.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();

    slingshot.display();
}

//puxar o sling
function mouseDragged(){
    if(gameState !== "launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX, y: mouseY})
    }
}
 
//soltar o sling
function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function restart(){
    window.location.reload();
}

function silence(){
    if (music.isPlaying()){
        music.stop();
    }
    else {
        music.play();
    }
    //music.stop();
    //music.play();
}

async function getTime(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var jason = await response.json();
    var datatime = jason.datatime;
    var hora = datatime.slice(11,13);
    if (hora >= 06 && hora <= 18){
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }
    backgroundImg = loadImage(bg);
    //console.log(jason);
}
