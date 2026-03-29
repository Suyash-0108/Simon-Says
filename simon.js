let gameSeq = [];
let userSeq = [];

let highScore = 0;

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        level = 0;
        gameSeq = [];
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 200);
}

function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(() => btn.classList.remove("user-flash"), 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randClr = btns[randIdx];
    let randBtn = document.querySelector(`.${randClr}`);

    gameSeq.push(randClr);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highScore) {
            highScore = level;
        }

        h2.innerHTML = `Game Over! Your Score: <b>${level}</b><br>High Score: <b>${highScore}</b><br>Press any key to restart`;

        document.body.style.backgroundColor = "red";

        setTimeout(() => {
            document.body.style.backgroundColor = "#0b0b14";
        }, 800);

        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));

function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}
