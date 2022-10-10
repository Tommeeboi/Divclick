const warning = document.getElementById("updateWarning");
const popup6 = document.getElementById("popBG6");

function warningInYourFace() {
    popup6.style.display = "block";
}

const example = `# Divclick
A website game using no Javascript Libraries or images! (apart from the links at the top of the page)

Created in 6 months (including a 2 month break) by Tommeeboi (Me). I'm a one man army.

## How To Run
It's very easy, don't worry.

WARNING: This only works for PC/Mac users. Mobile devices can't run this properly (Androids can't, dunno about everything else.)

1. Download this repository
2. Unzip it
3. Inside the unzipped copy, open index.html in your browser

Divclick is still in Beta, so expect lots of bugs and new features.

If you want to suggest a new feature, be sure to create an issue!

## Releases
Beta v0.0 (22/09/2022): First Beta! Introduces the ability to change the speed of the target, as well as bugfixes and improvements

Beta v0.1 (26/09/2022): "Click submit first" is now a proper popup. Also fixed the link to the Status, and added comments to game.js. I originally finished this release on 23/09 but forgot to publish it xD

Beta v0.2 (26/09/2022): Fixed Github Button, and added bugfixes and improvements

Beta v0.3 (04/10/2022):

1. Added Settings Menu, with a lives counter and other new features
2. Changed one of the victory messages to make the site family-friendly :skull:
3. Added a new victory message
4. Bugfixes and improvements

I have also implemented some mobile optimization, which forces the user to rotate their device horizontally if the width is below 900px. I am aware that some tablets/iPads are not able to use Divclick at all, and I will make some extra optimizations to allow those devices to use Divclick in the near future

Beta v0.4 (06/10/2022):

1. Added a new update system, like the old one from Cat Club
2. Fixed Lives Counter going into negative numbers
3. Bugfixes and improvements

Beta v0.5 (06/10/2022): Fixed links to home page not working properly

Beta v0.6 (10/10/2022):

1. Added better optimization for iPads and Tablets
2. Block Redirects During Play now hides update warning
3. When Block Redirects During Play is active, clicking Play without submitting no longer removes the redirects
4. The number inputs no longer have the stupid arrows >:)
5. Bugfixes and improvements (I know, shocking)`;

/* jQuery is required for this to work
This grabs the contents of the raw README.md from the Github repository, and compares it with the template README.
If they are different, the update thingo appears */
let different = false;

$.ajax({
    url: 'https://raw.githubusercontent.com/Tommeeboi/Divclick/master/README.md',
    type: 'GET',
    success: function(res) {
        let data = $.parseHTML(res);

        if (data[0].data !== example) {
            warning.style.display = "block";

            different = true;
        }
    }
});