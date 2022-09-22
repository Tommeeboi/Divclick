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

const mainPage = document.getElementById("mainPage");
const status = document.getElementById("status");

/* export and import buttons
i had to add an extra t onto both of them due to export and import being forbidden variable names */
const exportt = document.getElementById("save");
const importt = document.getElementById("importt");

const inputImport = document.getElementById("imporInput");

inputImport.style.opacity = 0;

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
*/
function disappear() {
    popup.style.display = "none";
    popup3.style.display = "none";

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
    "sped": "150"
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

function goToGithub() {
    popup3.style.display = "block";
}