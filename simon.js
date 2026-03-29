let gameSeq=[];
let userSeq=[];
let score=[];

let btns=["yellow", "red", "purple", "green"];

let started=false;
let level=0;

let h2=document.querySelector('h2');

document.addEventListener("keypress", function(){
    if(started==false){
        console.log("Game is started");
        started=true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove('flash');
    },200);
}

function userFlash(btn){
    btn.classList.add("user-flash");
    setTimeout(function(){
        btn.classList.remove("user-flash")
    },200);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*4);
    let randClr=btns[randIdx];
    let randbtn=document.querySelector(`.${randClr}`);
    gameSeq.push(randClr);
    console.log(gameSeq);   
    gameFlash(randbtn);
    score.push(level);
    
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>Press any key to restart.`;
         document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
             document.querySelector("body").style.backgroundColor="white";
        },1000);
        reset();
    }
}


function btnPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function getHighScore(){
    return Math.max(...score);
}

function reset(){
    started=false;
    level=0;
    gameSeq=[];
    userSeq=[];
    h2.innerHTML= `High Score: <b>${getHighScore()}</b><br>Press any key to start.`;
}

