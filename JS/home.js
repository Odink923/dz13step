var character = new Image();
var nick = document.getElementById("nickname");
var tabl = document.getElementById("records");

document.getElementById("boot").addEventListener("click", function(){
    character.src = "img_game/boot.png";
})

document.getElementById("bird").addEventListener("click", function(){
   character.src = "img_game/bird.png";
})

document.getElementById("start").addEventListener("click", function(){
    if(character != undefined) {
        localStorage.setItem(`player`, nick.value);
        localStorage.setItem(`icon`, character.src);

        location.href = "game.html";
    }
})



document.addEventListener("DOMContentLoaded", function(){
    let itemPlayer = localStorage.getItem("idInfo");
    for(let i = 1; i <= itemPlayer; i++){
        var getInfoJSON = localStorage.getItem(`info${i}`);
        let getInfo = JSON.parse(getInfoJSON);
        console.log(getInfo)
        tabl.innerHTML+=`
      <tr>
        <th>${getInfo.name}</th>
        <th>${getInfo.score}</th>
      </tr>  
      `
    }

})

