/* Reset Settings On Refresh (Firefox)
Block Redirect Buttons During Play
Lives Counter
Frenzy Mode (Epilepsy Warning) */

const popup5 = document.getElementById("popBG5");

const dimensions2 = document.getElementById("widthSel");
const tarColour2 = document.getElementById("colour");
const speed2 = document.getElementById("speedSel");

const livesCounterDiv = document.getElementById("livesCounter");

const livesCounter = document.getElementById("setLC");
const resetRefresh = document.getElementById("setVRR");
const redirectBlock = document.getElementById("setBRDP");
const gridColour = document.getElementById("setGT");

/* This variable doesn't update in real time, it's used for restoring your preferred settings when you load the page.
document.cookie being changed won't affect this variable until you reload the page */

/* Credits to codebubb for this string manipulation stuff, idk
Basically what this does is split the cookies into a sort-of object so I can get the values using dot notation */
let startCookies = document.cookie
.split(';')
.map(cookie => cookie.split('='))
.reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

function whatDoYouWant() {
    popup5.style.display = "block";
}

function resetValues() {
    dimensions2.value = 10;
    tarColour2.value = "#000000";
    speed2.value = 150;
}

// 0 means off and 1 means on
let lc = 1;
let rr = 0;
let rb = 1;
let gt = 0;

if (startCookies.livesCounter === "0") {
    lc = 0;
    livesCounter.style.color = "red";
    livesCounterDiv.style.display = "none";
}

livesCounter.onclick = function() {
    if (lc === 0) {
        lc = 1;
        livesCounter.style.color = "rgb(0, 192, 0)";
        document.cookie = "livesCounter=1";
        livesCounterDiv.style.display = "block";
    } else if (lc === 1) {
        lc = 0;
        livesCounter.style.color = "red";
        document.cookie = "livesCounter=0";
        livesCounterDiv.style.display = "none";
    }
}

if (startCookies.resetRefresh === "1") {
    rr = 1;
    resetRefresh.style.color = "rgb(0, 192, 0)";
    resetValues();
}

resetRefresh.onclick = function() {
    if (rr === 0) {
        rr = 1;
        resetRefresh.style.color = "rgb(0, 192, 0)";
        document.cookie = "resetRefresh=1";
    } else if (rr === 1) {
        rr = 0;
        resetRefresh.style.color = "red";
        document.cookie = "resetRefresh=0";
    }
}

if (startCookies.redirectBlock === "0") {
    rb = 0;
    redirectBlock.style.color = "red";
}

redirectBlock.onclick = function() {
    if (rb === 0) {
        rb = 1;
        redirectBlock.style.color = "rgb(0, 192, 0)";
        document.cookie = "redirectBlock=1";
    } else if (rb === 1) {
        rb = 0;
        redirectBlock.style.color = "red";
        document.cookie = "redirectBlock=0";
    }
}

if (startCookies.gridColour === "1") {
    gt = 1;
    gridColour.style.color = "rgb(0, 192, 0)";
}

gridColour.onclick = function() {
    if (gt === 0) {
        gt = 1;
        gridColour.style.color = "rgb(0, 192, 0)";
        document.cookie = "gridColour=1";
    } else if (gt === 1) {
        gt = 0;
        gridColour.style.color = "red";
        document.cookie = "gridColour=0";
    }
}