// remember: innerWidth, innerHeight
const grid = document.getElementById("grid");
const dimensions = document.getElementById("widthSel");
const tarColour = document.getElementById("colour");
const speed = document.getElementById("speedSel")

const popup2 = document.getElementById("popBG2");
const failMessage = document.getElementById("failMessage");
const didHeDoIt = document.getElementById("didHeDoIt");
let failDecider = null;
let winDecider = null;

// submit, play, and submit 'n play buttons
const submit = document.getElementById("submit");
const play = document.getElementById("play");
const subPlay = document.getElementById("subPlay");

// Dimensions Settings. Scroll to line 112 for the actual game
let oldDiv = null;
let newDiv = null;

/* The j variable is how many squares there will be.
The gud variable is how wide and tall the squares should be. Why is it called gud? I... I don't know */
let j = 100;
let gud = 53;
let targetColour = null;
let correctColour = null;

let lives = 3;
let active = false;

function subEvent() {
    grid.innerHTML = "";

    targetColour = tarColour.value;

    if (dimensions.value === '5') {
        j = 25;
        gud = 106;
    } else if (dimensions.value === '6') {
        j = 36;
        gud = 85;
    } else if (dimensions.value === '7') {
        j = 49;
        gud = 75;
    } else if (dimensions.value === '8') {
        j = 64;
        // i had to. i just had to.
        gud = 69;
    } else if (dimensions.value === '9') {
        j = 81;
        gud = 60;
    } else if (dimensions.value === '10') {
        j = 100;
        gud = 53;
    } else if (dimensions.value === '11') {
        j = 121;
        gud = 50;
    } else if (dimensions.value === '12') {
        j = 144;
        gud = 47;
    } else if (dimensions.value === '13') {
        j = 169;
        gud = 45;
    } else if (dimensions.value === '14') {
        j = 196;
        gud = 40;
    } else if (dimensions.value === '4') {
        j = 16;
        gud = 130;
    } else if (dimensions.value === '3') {
        j = 9;
        gud = 170;
    } else if (dimensions.value === '15') {
        j = 225;
        gud = 36;
    } else if (dimensions.value < 3) {
        dimensions.value = '3';
        j = 9;
        gud = 170;
    } else if (dimensions.value > 15) {
        dimensions.value = '15';
        j = 225;
        gud = 36;
    }

    if (speed.value < 50) {
        speed.value = 50;
    } else if (speed.value > 1000) {
        speed.value = 1000;
    }

    grid.style.gridTemplateColumns = `repeat(${dimensions.value}, ${gud}px)`;
    grid.style.gridTemplateRows = `repeat(${dimensions.value}, ${gud}px)`;

    for (let i = 0; i < j; i++) {
        ii = i + 1;

        oldDiv = document.getElementById(`u${i}`);

        newDiv = document.createElement("div");

        newDiv.setAttribute("death", "true");

        newDiv.setAttribute("id", `u${ii}`);

        newDiv.style.width = `${gud - 3}px`;
        newDiv.style.height = `${gud - 3}px`;

        /* newDiv.onmousedown = function() {
            // sorry for hoisting the function, i can't be bothered anymore
            check(document.getElementById(`u${i + 1}`));
        } */

        grid.insertBefore(newDiv, oldDiv);
    }
    
    correctColour = tarColour.value;
}

submit.onclick = function() {
    subEvent();
}

grid.style.gridTemplateColumns = "repeat(10, 53px)";
grid.style.gridTemplateRows = "repeat(10, 53px)";

function check(square) {
    if (square.attributes.death.value === "true") {
        if (lives > 0) {
            lives -= 1;
        } else {
            failDecider = Math.floor(Math.random() * 4 + 1);

            switch (failDecider) {
                case (1):
                failMessage.innerText = "That's rough, mate!";
                break;
                case (2):
                failMessage.innerText = "A brother has fallen.";
                break;
                case (3):
                failMessage.innerText = "Player was slain by Moving Square";
                break;
                case (4):
                failMessage.innerText = "It's me again! Fail Screen!";
                break;
                default:
                failMessage.innerText = "((MESSAGE ERROR))";
                break;
            }

            didHeDoIt.innerHTML = `You were not able to smack the target.
            <br>
            <br>
            Getting game ready...`;

            popup2.style.display = "block";

            setTimeout(() => {
                popup2.style.display = "none";
            }, 2000);

            target.style.backgroundColor = "initial";
            target.attributes.death.value = "true";

            target = null;

            lives = 3;

            active = false;
        }
    } else if (square.attributes.death.value === "false") {
        winDecider = Math.floor(Math.random() * 6 + 1);

            switch (winDecider) {
                case (1):
                failMessage.innerText = "GG! :)";
                break;
                case (2):
                failMessage.innerText = "Ya caught dat liddle sneaky bugger!";
                break;
                case (3):
                failMessage.innerText = "He's been told.";
                break;
                case (4):
                failMessage.innerText = "Congratulations, champion!";
                break;
                case (5):
                failMessage.innerText = "You like did it and stuff.";
                break;
                case (6):
                failMessage.innerText = "This is one of the moments ever!";
                break;
                default:
                failMessage.innerText = "((MESSAGE ERROR))";
                break;
            }

            didHeDoIt.innerHTML = `You successfully smacked the target!
            <br>
            <br>
            Getting game ready...`;

            popup2.style.display = "block";

            setTimeout(() => {
                popup2.style.display = "none";
            }, 2000);

            target.style.backgroundColor = "initial";
            target.attributes.death.value = "true";

            target = null;

            lives = 3;

            active = false;
    }
}

for (let i = 0; i < j; i++) {
    ii = i + 1;

    oldDiv = document.getElementById(`u${i}`);

    newDiv = document.createElement("div");

    newDiv.setAttribute("id", `u${ii}`);

    newDiv.setAttribute("death", "true");

    newDiv.style.width = "50px";
    newDiv.style.height = "50px";

    grid.insertBefore(newDiv, oldDiv);
}

// Welcome... to the game mechanics!
let dead = false;
let squareSelector = null;
let target = null;
let rng = 0;
let interval = null;

function playEvent() {
    active = true;
    interval = speed.value;

    for (let q = 1; q <= j; q++) {
        document.getElementById(`u${q}`).onmousedown = function() {
            if (active === true) {
                check(document.getElementById(`u${q}`));
            }
        }
    }

    function action() {
        rng = Math.floor(Math.random() * 4);

        if (rng === 0) {
            if (squareSelector <= j - 1) {
                squareSelector += 1;
            }
        } else if (rng === 1) {
            if (squareSelector >= 2) {
                squareSelector -= 1;
            }
        } else if (rng === 2) {
            if (squareSelector <= j - 11) {
                squareSelector += Number(dimensions.value);
            }
        } else if (rng === 3) {
            if (squareSelector >= 11) {
                squareSelector -= Number(dimensions.value);
            }
        } else {
            alert("Broken.");
        }

        target.style.backgroundColor = "initial";
        target.attributes.death.value = "true";

        target = document.getElementById(`u${squareSelector}`);

        target.style.backgroundColor = correctColour;
        target.attributes.death.value = "false";

        setTimeout(() => {
            action();
        }, interval);
    }
    
    if (targetColour === null) {
        alert("Click Submit First! (Or Submit & Play)");
    } else {
        squareSelector = Math.floor(Math.random() * j);

        target = document.getElementById(`u${squareSelector}`);

        target.style.backgroundColor = correctColour;
        target.attributes.death.value = "false";

        action();
    }
}

play.onclick = function() {
    playEvent();
}

subPlay.onclick = function() {
    subEvent();
    playEvent();
}