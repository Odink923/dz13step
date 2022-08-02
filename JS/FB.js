var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var bird = new Image();
var boot = new Image();
var background = new Image();
var foreground = new Image();
var pipeUp = new Image();
var pipeDown = new Image();
var sale_persent = new Image();
var game_lose = new Image();
var winner = new Image();
var upAudio = new Audio();
var pointsAudio = new Audio();
var game_relode_but = document.getElementById('game_relode_but');

bird.src = "img_game/bird.png";
boot.src = "img_game/boot.png";
background.src = "img_game/background.png";
foreground.src = "img_game/fg.png";
pipeUp.src = "img_game/down.png";
pipeDown.src = "img_game/up.png";
sale_persent.src = "img_game/sale.png";
game_lose.src = "img_game/lose.png";
winner.src = "img_game/win.png";
upAudio.src = "audio_game/fly.mp3";
pointsAudio.src = "audio_game/score.mp3";

var character = new Image();
let icon = localStorage.getItem("icon");
character.src = icon;
var nick_ = localStorage.getItem("player");
let item = 1;

var distance = 90;
var xb = 10;
var yb = 150;
var grav = 2;
var points = 0;
var pipes = [];
pipes[0] = {
  x: canvas.width,
  y: 0
}

document.addEventListener("keydown", function(event) {
  if(event.code == 'Space'){
    yb -= 40;
    // upAudio.play();
  }
  if(event.code == 'ArrowUp'){
    yb -= 40;
    // upAudio.play();
  }
})

document.getElementById("exit").addEventListener("click", function(){
  location.href = "index.html";
})

function draw() {
  context.drawImage(background, 0, 0);
  for (var i = 0; i < pipes.length; i++) {
    context.drawImage(pipeUp, pipes[i].x, pipes[i].y);
    context.drawImage(sale_persent, pipes[i].x, pipes[i].y + 270, 50, 50);
    context.drawImage(pipeDown, pipes[i].x, pipes[i].y + pipeUp.height + distance);
    pipes[i].x--;
    if(pipes[i].x == 125){
      pipes.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      })
    }
    if(yb + character.height >= canvas.height - foreground.height ||
      xb + character.width >= pipes[i].x && xb <= pipes[i].x + pipeUp.width &&
      (yb + character.height >= pipes[i].y + pipeUp.height + distance || yb <= pipes[i].y + pipeUp.height)
      ){
      // location.reload();
      let info = {
        name : nick_,
        score: points
      };
      let infoJSON = JSON.stringify(info);
      let iTemp = localStorage.getItem("idInfo");
      item = Number(iTemp) + 1;
      localStorage.setItem(`info${item}`, infoJSON);
      localStorage.setItem("idInfo", item);
      return context.drawImage(game_lose, 0, 0);
    }
    if(pipes[i].x + 10 == 10){
      points++;
      pointsAudio.play();
    }
    if(points == 10){
      return context.drawImage(winner, 0, 0);
    }

  }
  context.drawImage(foreground, 0, canvas.height - foreground.height);
  context.drawImage(character, xb, yb, 38, 26);
  yb = yb + grav;
  context.fillStyle = "#d9cb0f";
  context.font = "25px Verdana"
  context.fillText(`Score: ${points}`, 10 ,canvas.height - 30)
  // context.drawImage(sale_persent, 10, canvas.height - 30, 50, 50);
  requestAnimationFrame(draw);
}

pipeDown.onload = draw;

game_relode_but.onclick = function() {
  location.reload();
}
