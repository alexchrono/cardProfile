let buttonSelected = "stats";
let statsButton
let personalityButton
let historyButton
let encountersButton
let oocButton
let buttonList

// Grab all buttons by ID




function handleButtonClick(event) {
    const clickedButton = event.currentTarget;           // The button clicked
    const clickedId = clickedButton.id.replace("Button", ""); // statsButton -> stats

    if (buttonSelected === clickedId) {
        console.log(`${clickedId} button was clicked but already selected`);
        return;
    }

    buttonSelected = clickedId;

    switch (clickedId) {
    case "stats":
        doStatsFunction();
        break;
    case "personality":
        doPersonalityFunction();
        break;
    case "history":
        doHistoryFunction();
        break;
    case "encounters":
        doEncountersFunction();
        break;
    case "ooc":
        doOOCFunction();
        break;
    default:
        console.warn("Unknown button clicked:", clickedId);
}



    // Update classes for all buttons
    buttonList.forEach(btn => {
        if (btn === clickedButton) {
            btn.classList.add("active");
            btn.classList.remove("inactive");
        } else {
            btn.classList.remove("active");
            btn.classList.add("inactive");
        }
    });

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
