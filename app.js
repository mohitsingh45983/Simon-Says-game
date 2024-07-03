let userSeq = [];
let gameSeq = [];

let level = 0;
let maxScore = 0;
let started = false;

let h4 = document.querySelector("h4");

let colors = ["red","yellow","green","purple"];

// press any key to start the game 
document.addEventListener("keypress",function(){
    if(started == false)
    {
        started = true;
        console.log("Game is started");
        levelUp();
    }
}) ;

function btnFlash(btn)
{
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },100);
}


function levelUp()
{
    userSeq = [];
    level++;

    h4.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random()*3);
    let randomColor = colors[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    // console.log(randomIdx);
    // console.log(randomColor);
    // console.log(randomBtn);
    btnFlash(randomBtn);

    gameSeq.push(randomColor);
    console.log("game Sequence = ",gameSeq);
}

function checkAns(idx){

    if(userSeq[idx] == gameSeq[idx])
    {
        if(userSeq.length == gameSeq.length)
        {
           setTimeout(levelUp,1000);
        }
    }
    else{
        if(maxScore < level)
        {
            maxScore = level;
        }
        
        h4.innerHTML = `GAME OVER! Your score was <b> ${level} </b>.Max-Score ${maxScore} <br>Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress(){
    console.log("Buttton was pressed");
    let btn = this;
    btnFlash(btn);
    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);
    console.log("User Sequence = ",userSeq);

    checkAns(userSeq.length -1);
}

let btns = document.querySelectorAll(".btn");
for(btn of btns)
{
    btn.addEventListener("click",btnPress);
}

function reset()
{
    level = 0;
    started = false;
    gameSeq = [];
    userSeq = [];
}