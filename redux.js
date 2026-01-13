// let buttonSelected = "stats";
let statsButton;
let personalityButton;
let historyButton;
let encountersButton;
let oocButton;
let buttonList;
let clickedButton;
let clickedId;
let previousButton;
let previousClickedId;
let prevTab;
let currTab;

// Grab all buttons by ID in mainFunction after DOM is ready

function handleButtonClick(event) {
    // ONLY FROM THE SECOND CLICK WILL WE HAVE PREVIOUS BUTTON AND PREVIOUS CLICKED
    if (clickedButton && clickedId){
    previousButton = clickedButton;
    previousClickedId = clickedId;
    }

    // WE WILL ALWAYS UPDATE WHAT WE FREAKING CLICKED
    clickedButton = event.currentTarget;
    clickedId = clickedButton.id.replace("Button", ""); // e.g., statsButton -> stats







    // If the same button is clicked again, do nothing.  AT FIRST IT IS STATS. AFTER WE MUST CHANGE

    if (previousClickedId === clickedId) {
        console.log(`${clickedId} button was clicked but already selected`);
        return;
    }



    // ===== Switch for button-specific actions =====
    // switch (clickedId) {
    //     case "stats":
    //         doStatsFunction();
    //         break;
    //     case "personality":
    //         doPersonalityFunction();
    //         break;
    //     case "history":
    //         doHistoryFunction();
    //         break;
    //     case "encounters":
    //         doEncountersFunction();
    //         break;
    //     case "ooc":
    //         doOOCFunction();
    //         break;
    //     default:
    //         console.warn("Unknown button clicked:", clickedId);
    // }

    // ===== Update button classes efficiently =====


    //CHAT GPT NARUTO THIS IS THE PART YOU NEED TO DOUBLE CHECK
    if (!previousButton) {
        statsButton.classList.remove("active");
        statsButton.classList.add("inactive");

        previousButton = statsButton;
        previousClickedId = "stats";
        // previousButton.style.visibility="hidden"


    }
    else {
        previousButton.classList.remove("active");
        previousButton.classList.add("inactive");
    }
    clickedButton.classList.remove("inactive");
    clickedButton.classList.add("active");


    // ===== Update tab visibility efficiently =====
    if (previousClickedId) {
        if (previousClickedId==="stats"){
            prevTab = document.getElementById("info");
            if (prevTab) {
                prevTab.style.opacity = "0";
                prevTab.style.visibility = "hidden";

            }
        }
        else {
            console.log('')
            prevTab = document.getElementById(previousClickedId + "Tab");
        if (prevTab){
            prevTab.style.visibility = "visible";
                prevTab.style.opacity = "1";


            }
        }

    }

    if (clickedId==="stats"){
        currTab = document.getElementById("info");
            if (currTab) currTab.style.visibility = "hidden";

    } else {
        console.log(`WE ARE GOING TO GRAB',${clickedId}Tab`)
        console.log('we are gong to make that visible')
    currTab = document.getElementById(clickedId + "Tab");
    console.log('did we grab it?',currTab)
    if (currTab) currTab.style.visibility = "visible";

    }


    console.log(`Activated: ${clickedId}`);
}


function mainFunction() {
    console.log('🚀 mainFunction() started');

    const mercierContainerDiv = document.getElementById('mercierContainer');
    if (!mercierContainerDiv) return;

    const defaultWidth = getComputedStyle(mercierContainerDiv).width;
    const defaultHeight = getComputedStyle(mercierContainerDiv).height;

    let isMobile = false;


    statsButton = document.getElementById("statsButton");
    personalityButton = document.getElementById("personalityButton");
    historyButton = document.getElementById("historyButton");
    encountersButton = document.getElementById("encountersButton");
    oocButton = document.getElementById("oocButton");

    buttonList = [statsButton, personalityButton, historyButton, encountersButton, oocButton];

    const missingButtons = buttonList.filter(btn => !btn);
    if (missingButtons.length > 0) {
        console.error("Some buttons were not found in the DOM:", missingButtons);
        return; // stop here if any button is missing
    }





    function isMobileView() {
        return window.innerHeight > window.innerWidth;
    }

    function switchMobileDesktop() {
        if (isMobileView()) {
            isMobile = true;
            mercierContainerDiv.style.width = '100%';
            mercierContainerDiv.style.height = '100%';
        } else {
            isMobile = false;
            mercierContainerDiv.style.width = defaultWidth;
            mercierContainerDiv.style.height = defaultHeight;
        }
    }

    switchMobileDesktop();
    window.addEventListener('resize', switchMobileDesktop);

    // ============================
    // Attach generic button handler
    // ============================


    // Attach the handler to all buttons
    buttonList.forEach(btn => btn.addEventListener("click", handleButtonClick));
}

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', mainFunction);
