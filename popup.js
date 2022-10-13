// file reader api for importing settings
const reader = new FileReader();

// all of the buttons
const imSet = document.getElementById("import");

// inputs (in regular home page)
const dimensums = document.getElementById("widthSel");
const tarColourr = document.getElementById("colour");
const sped = document.getElementById("speedSel");

// popup
const popup = document.getElementById("popBG");
const innerPopup = document.getElementById("setPop");

const popup3 = document.getElementById("popBG3");
const innerPopup3 = document.getElementById("setPop3");

const popup5SortOf = document.getElementById("popBG5");

const popup6ButWorse = document.getElementById("popBG6");

const popup7 = document.getElementById("popBG7");

const mainPage = document.getElementById("mainPage");
const status = document.getElementById("status");

/* export and import buttons
i had to add an extra t onto both of them due to export and import being forbidden variable names */
const exportt = document.getElementById("save");
const importt = document.getElementById("importt");

const inputImport = document.getElementById("imporInput");

inputImport.style.opacity = 0;

const tipDiv = document.getElementById("tipClick");
const tipMessage = document.getElementById("leMessage");

// if you were using firefox, the export button would display incorrectly, so i added this fix
// just don't ask me to explain the firefox variable
const firefox = typeof InstallTrigger !== 'undefined';

if (firefox === true) {
    exportt.style.bottom = "0px";
}

// old menu for the export settings button. scrapped now
/* function exportMenu() {
    innerPopup.innerHTML = `<img src="assets/exit.png" id="exit" onclick="disappear();">
    <span style="margin-bottom: 35px; display: block;">Export As A File</span>
    <p class="impLink">
    Create a file ending in .divc or .json and paste the text from the copy button into the file :)
    </p>
    <div class="impBar">
    <button class="gridBtn" onclick="getJsonText();">Copy</button>
    </div>`
} */

// display popup when click import settings
imSet.onclick = function () {
    popup.style.display = "block";
}

/* the function that occurs when you click exit. it used to just reload the page but that doesn't work due
to it forgetting the settings you imported. it has to reload the html for the popup due to the buttons not
working after being pressed once for some reason
This function was originally only intended for the Import Settings popup but became useful for other popups too xD */
function disappear() {
    popup.style.display = "none";
    // popup2 is the fail/win one
    // popup4 is declared in game.js
    popup4.style.display = "none";
    popup5SortOf.style.display = "none";
    popup6ButWorse.style.display = "none";
    popup7.style.display = "none";

    if (firefox === false) {
        innerPopup.innerHTML = `<img src="assets/exit.png" id="exit" onclick="disappear();">
    <span style="margin-bottom: 35px; display: block;">Do you want to...</span>
    <div class="popBar1">
        <button id="save" class="popBarBtn" onclick="getJsonText();">Export<br>Settings</button>
        <label for="imporInput" id="importt" class="popBarBtn">Import<br>Settings</label>
        <input type="file" id="imporInput" style="margin: 0px; padding: 0px; width: 0px; height: 0px;" onchange="previewFile();" accept=".divc, .json">
    </div>`;
    } else if (firefox === true) {
        innerPopup.innerHTML = `<img src="assets/exit.png" id="exit" onclick="disappear();">
    <span style="margin-bottom: 35px; display: block;">Do you want to...</span>
    <div class="popBar1">
        <button id="save" class="popBarBtn" onclick="getJsonText();" style="bottom: 0px;">Export<br>Settings</button>
        <label for="imporInput" id="importt" class="popBarBtn">Import<br>Settings</label>
        <input type="file" id="imporInput" style="margin: 0px; padding: 0px; width: 0px; height: 0px;" onchange="previewFile();" accept=".divc, .json">
    </div>`;
    } else {
        alert("HOW DID THIS APPEAR? CONTACT TOMMEEBOI IMMEDIATELY!");
    }

    /* exportt.onclick = function() {
        exportMenu();
    } */

    // location.reload();
}

function getJsonText() {
    const jsonText =
        `{
    "dimensions": "${dimensums.value}",
    "colour": "${tarColourr.value}",
    "speed": "${sped.value}"
}`;

    navigator.clipboard.writeText(jsonText);

    exportt.innerHTML = "Text<br>Copied!";

    setTimeout(() => {
        exportt.innerHTML = "Export<br>Settings";
    }, 1000);
}

exportt.onclick = function () {
    getJsonText();
}

// old import menu when i sucked a little more
/* importt.onclick = function() {
    innerPopup.innerHTML = `<img src="assets/exit.png" id="exit" onclick="disappear();">
    <span style="margin-bottom: 35px; display: block;">Something Went Wrong...</span>
    <p class="impLink">
    This feature is quite complicated to code. It's currently still under development. If you want to see the latest progress, go to:<br><a href="https://github.com/Tommeeboi/Divclick/wiki/Status" target="_blank" rel="noopener" class="y">https://github.com/Tommeeboi/Divclick/wiki/Status</a>`;
} */

/* The beefy function for importing settings. Credit to Mozilla for the template code that this is based on
https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText */
function previewFile() {
    const [file] = inputImport.files;

    reader.onload = function() {
        function checkJson(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                alert(`Your file is incompatible with Divclick.
Try comparing it with this example:
{
    "dimensions": "10",
    "colour": "#000000",
    "speed": "150"
}
        `)
            }
        }

        checkJson(reader.result);

        const fixedResult = JSON.parse(reader.result);

        dimensums.value = fixedResult.dimensions;
        tarColourr.value = fixedResult.colour;
        sped.value = fixedResult.speed;
    }
    if (file) {
        reader.readAsText(file);
    }
}

// tip system
let tipMessageRNG = null;

tipDiv.onclick = function() {
    tipMessageRNG = Math.floor(Math.random() * 7 + 1);

    switch (tipMessageRNG) {
        case 1:
            tipMessage.innerHTML = "Fast clicking not registering? Try disabling <strong>Patch Out Double Clicks</strong> in settings!";
            break;
        case 2:
            tipMessage.innerHTML = "Do you keep accidentally clicking this popup? Enable <strong>Block Redirects During Play</strong> in settings!";
            break;
        case 3:
            tipMessage.innerHTML = "A strange but popular strategy is to spam at the target and get lucky. The people who use it want more lives to be added.";
            break;
        case 4:
            tipMessage.innerHTML = "If your mouse has <strong>Debounce Time</strong>, you can set it to the highest number to reduce Double Clicks!";
            break;
        case 5:
            tipMessage.innerHTML = "Too easy for you? Set the Speed to 50 and the Dimensions to 15 and try that. It took me 4 tries to pull off.";
            break;
        case 6:
            tipMessage.innerHTML = "If you're on PC, try moving your mouse on a smooth surface. I used to have to use my bumpy kitchen table.";
            break;
        case 7:
            tipMessage.innerHTML = "Set the target colour to rgb(89, 89, 89) to make it invisible. You can also enable <strong>Grid Colour Match With Target</strong> to make the grid invisible!";
            break;
    }

    popup7.style.display = "block";
}