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
let galleryButton;
let closeButton;
let topGalleryDisplay;
let threeScript;
let bgTestCover;
let vantaScript;
let bgTestCoverExists;


function openGallery() {
    topGalleryDisplay.style.visibility = "visible";
    requestAnimationFrame(() => {
        topGalleryDisplay.style.opacity = "1";
    });
}

function closeGallery() {
    topGalleryDisplay.style.opacity = "0";
    setTimeout(() => {
        topGalleryDisplay.style.visibility = "hidden";
    }, 1000); // match CSS transition
}


function handleButtonClick(event) {

    if (event.currentTarget.id === "galleryButton") return;


    // Save previous ONLY if we already had one
    if (clickedButton && clickedId) {
        previousButton = clickedButton;
        previousClickedId = clickedId;
    }

    // Update current
    clickedButton = event.currentTarget;
    clickedId = clickedButton.id.replace("Button", "");




    // Block double-click on same button
    if (previousClickedId === clickedId) {
        return;
    }

    // ======================
    // BUTTON CLASS TOGGLING
    // ======================
    if (previousButton) {
        previousButton.classList.remove("active");
        previousButton.classList.add("inactive");
    }
    else {
        statsButton.classList.remove("active");
        statsButton.classList.add("inactive");

    }

    clickedButton.classList.remove("inactive");
    clickedButton.classList.add("active");

    // ======================
    // TAB VISIBILITY
    // ======================

    // HIDE previous tab
    if (previousClickedId) {
        const prevTab = document.getElementById(previousClickedId + "Tab");
        if (prevTab) {
            prevTab.style.opacity = "0";

            setTimeout(() => {
            prevTab.style.visibility = "hidden";
        }, 600); // must match CSS transition time

        }
    }
    else {
        const prevTab = document.getElementById("statsTab");
        if (prevTab) {
            prevTab.style.opacity = "0";


            setTimeout(() => {
            prevTab.style.visibility = "hidden";
        }, 600); // must match CSS transition time
        }

    }


    // SHOW current tab
    const currTab = document.getElementById(clickedId + "Tab");
    if (currTab) {
        currTab.style.visibility = "visible";
        requestAnimationFrame(() => {
        currTab.style.opacity = "1";
    });
    }

    console.log(`Activated: ${clickedId}`);
}



function mainFunction() {










            document.getElementById("statsTab").style.visibility = "visible";

    //         requestAnimationFrame(() => {
    //     currTab.style.opacity = "1";
    // });
            document.getElementById("statsTab").style.opacity = "1";




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
            // mercierContainerDiv.style.width = defaultWidth;
            // mercierContainerDiv.style.height = defaultHeight;
            return
        }
    }

    switchMobileDesktop();
    window.addEventListener('resize', switchMobileDesktop);

    // ============================
    // Attach generic button handler
    // ============================


    // Attach the handler to all buttons
    buttonList.forEach(btn => btn.addEventListener("click", handleButtonClick));






        setTimeout(() => {
        console.log("Starting dynamic script injection for VANTA...");

        // Dynamically load Three.js first
        threeScript = document.createElement('script');
        threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
        threeScript.onload = () => {
            console.log("Three.js loaded ✅");

            // Now load VANTA Fog
            vantaScript = document.createElement('script');
            vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js";
            vantaScript.onload = () => {
                console.log("VANTA Fog loaded ✅");

                // Check variables before initializing
                bgTestCover = document.getElementById("bgTestCover");
                console.log("bgTestCover exists?", bgTestCover);
                console.log("VANTA exists?", window.VANTA);
                console.log("VANTA.FOG exists?", (window.VANTA && window.VANTA.FOG));

                if (bgTestCover && window.VANTA && window.VANTA.FOG) {
                    VANTA.FOG({
                        el: "#bgTestCover",
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200,
                        minWidth: 200,
                        highlightColor: 0x9d9d9d,
                        midtoneColor: 0x989898,
                        lowlightColor: 0x000000,
                        baseColor: 0x000000,
                        blurFactor: 0.52,
                        speed: 0.70,
                        zoom: 0.90,
                    });
                    console.log("VANTA Fog initialized ✅");
                } else {
                    console.error("Cannot initialize VANTA Fog — missing element or library!");
                }

                 if (bgTestCoverFront && window.VANTA && window.VANTA.FOG) {
                    VANTA.FOG({
                        el: "#bgTestCoverFront",
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200,
                        minWidth: 200,
                        highlightColor: 0x9d9d9d,
                        midtoneColor: 0x989898,
                        lowlightColor: 0x000000,
                        baseColor: 0x000000,
                        blurFactor: 0.52,
                        speed: 0.70,
                        zoom: 0.90,
                    });
                    console.log("VANTA Fog initialized ✅");
                } else {
                    console.error("Cannot initialize VANTA Fog — missing element or library!");
                }
            };
            document.body.appendChild(vantaScript);
        };
        document.body.appendChild(threeScript);

    }, 500); // half-second delay

}

// Initialize after DOM is ready
// document.addEventListener('DOMContentLoaded', mainFunction);


// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {

  // Give a small delay before starting script loading

    mainFunction();
    window.addEventListener('resize', () => switchMobileDesktop());
    galleryButton = document.getElementById("galleryButton");
closeButton = document.getElementById("closeButton");
topGalleryDisplay = document.getElementById("topGalleryDisplay");

galleryButton.addEventListener("click", openGallery);
closeButton.addEventListener("click", closeGallery);

// setTimeout(() => {
//     const bgTestCover = document.getElementById("bgTestCover");
//     if (bgTestCover) {
//         console.log('BG TEST COVER IS FOUND, lets see if vanta fog exists', VANTA.FOG);
//         if (VANTA && VANTA.FOG) {
//             VANTA.FOG({
//                 el: "#bgTestCover",
//                 mouseControls: true,
//                 touchControls: true,
//                 gyroControls: false,
//                 minHeight: 200,
//                 minWidth: 200,
//                 highlightColor: 0x9d9d9d,
//                 midtoneColor: 0x989898,
//                 lowlightColor: 0x000000,
//                 baseColor: 0x000000,
//                 blurFactor: 0.52,
//                 speed: 0.70,
//                 zoom: 0.90,
//             });
//         } else {
//             console.error("VANTA.FOG is still undefined!");
//         }
//     } else {
//         console.error("VANTA: #bgTestCover element not found!");
//     }
// }, 500); // half a second delay




});
