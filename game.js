// Game Variables
let velocity = {x: 0, y: 0};
const foodsound = new Audio("food.mp3");
const gameoversound = new Audio("gameover.mp3");
const movesound = new Audio("move.mp3");
const bgmusic = new Audio("Bg Music.mp3");
bgmusic.volume = 0.5;
const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");
let speed = 5;
let lastpaint = 0;
let snakebody = [{x: 10, y: 10},{x: 10, y: 10},{x: 10, y: 10}];
let food = {x: 15, y: 15};
let score = 0;


// Game Cycle
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastpaint) / 1000 < 1 / speed) {
        return;
    }
    lastpaint = ctime;
    game();
}

function Collide(sb) {
    // Collide Into Wall
    if (sb[0].x >= 25 || sb[0].x <= 0 || sb[0].y >= 25 || sb[0].y <= 0) {
        return true;
    }
}

function generatefood() {
    let a = 5;
    let b = 20;
    let newFood;
    do {
        newFood = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())};
    } while (snakebody.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    return newFood;
}

function game() {
    bgmusic.play();
    // Snake Eating
    if (snakebody[0].y === food.y && snakebody[0].x === food.x) {
        foodsound.play();
        snakebody.unshift({x: snakebody[0].x + velocity.x, y: snakebody[0].y + velocity.y});
        food = generatefood();
        score++;
        Score.innerHTML = "Score : " + score;
        speed += 0.25;
    }

    // Snake Dying
    if (Collide(snakebody)) {
       bgmusic.pause();
       localStorage.setItem('points', score);
       window.location.href = "gameover.html";
    }

    // Snake Moving
    for (let i = snakebody.length - 2; i >= 0; i--) {
        snakebody[i + 1] = {...snakebody[i]};
    }
    snakebody[0].x += velocity.x;
    snakebody[0].y += velocity.y;
    GameBoard.innerHTML = "";

    // SNAKE DISPLAY
    snakebody.forEach((e, index) => {
       const snakeelement = document.createElement("element");
       snakeelement.style.gridRowStart = e.y;
       snakeelement.style.gridColumnStart = e.x;
       snakeelement.classList.add(index === 0 ? "snakehead" : "snakebody");
       GameBoard.appendChild(snakeelement);
    });

    // FOOD DISPLAY
    const foodelement = document.createElement("element");
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add("food");
    GameBoard.appendChild(foodelement);
}

// Main Logic
window.requestAnimationFrame(main);

// Buttons
up.addEventListener("click", function() {
    if (velocity.y === 0) {
        movesound.play();
        velocity.x = 0;
        velocity.y = -1;
    }
});

down.addEventListener("click", function() {
    if (velocity.y === 0) {
        movesound.play();
        velocity.x = 0;
        velocity.y = 1;
    }
});

left.addEventListener("click", function() {
    if (velocity.x === 0) {
        movesound.play();
        velocity.x = -1;
        velocity.y = 0;
    }
});

right.addEventListener("click", function() {
    if (velocity.x === 0) {
        movesound.play();
        velocity.x = 1;
        velocity.y = 0;
    }
});

document.addEventListener("keydown", function(event) {
    switch(event.key) {
        case "w":
        case "W":
            up.click();
            break;
        case "s":
        case "S":
            down.click();
            break;
        case "a":
        case "A":
            left.click();
            break;
        case "d":
        case "D":
            right.click();
            break;
    }
});
