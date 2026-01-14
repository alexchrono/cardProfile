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
let galleryButton;
let closeButton;
let topGalleryDisplay;
let threeScript;
let vantaScript;
let bgTestCover;
let bgTestCoverFront;
let vantaBack;
let vantaFront;

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
    }, 1000);
}

function handleButtonClick(event) {
    if (event.currentTarget.id === "galleryButton") return;

    if (clickedButton && clickedId) {
        previousButton = clickedButton;
        previousClickedId = clickedId;
    }

    clickedButton = event.currentTarget;
    clickedId = clickedButton.id.replace("Button", "");

    if (previousClickedId === clickedId) return;

    if (previousButton) {
        previousButton.classList.remove("active");
        previousButton.classList.add("inactive");
    } else {
        statsButton.classList.remove("active");
        statsButton.classList.add("inactive");
    }

    clickedButton.classList.remove("inactive");
    clickedButton.classList.add("active");

    if (previousClickedId) {
        const prevTab = document.getElementById(previousClickedId + "Tab");
        if (prevTab) {
            prevTab.style.opacity = "0";
            setTimeout(() => {
                prevTab.style.visibility = "hidden";
            }, 600);
        }
    } else {
        const prevTab = document.getElementById("statsTab");
        if (prevTab) {
            prevTab.style.opacity = "0";
            setTimeout(() => {
                prevTab.style.visibility = "hidden";
            }, 600);
        }
    }

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
    document.getElementById("statsTab").style.opacity = "1";

    const mercierContainerDiv = document.getElementById('mercierContainer');
    if (!mercierContainerDiv) return;

    statsButton = document.getElementById("statsButton");
    personalityButton = document.getElementById("personalityButton");
    historyButton = document.getElementById("historyButton");
    encountersButton = document.getElementById("encountersButton");
    oocButton = document.getElementById("oocButton");

    buttonList = [statsButton, personalityButton, historyButton, encountersButton, oocButton];

    const missingButtons = buttonList.filter(btn => !btn);
    if (missingButtons.length > 0) {
        console.error("Some buttons were not found in the DOM:", missingButtons);
        return;
    }

    buttonList.forEach(btn => btn.addEventListener("click", handleButtonClick));

    bgTestCover = document.getElementById("bgTestCover");
    bgTestCoverFront = document.getElementById("bgTestCoverFront");

    setTimeout(() => {
        threeScript = document.createElement('script');
        threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
        threeScript.onload = () => {
            vantaScript = document.createElement('script');
            vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js";
            vantaScript.onload = () => {
                if (bgTestCover && window.VANTA && window.VANTA.FOG) {
                    vantaBack = VANTA.FOG({
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
                    console.log("VANTA Back Fog initialized ✅");
                } else {
                    console.error("Cannot initialize BACK VANTA Fog!");
                }

                if (bgTestCoverFront && window.VANTA && window.VANTA.FOG) {
                    vantaFront = VANTA.FOG({
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
                    console.log("VANTA Front Fog initialized ✅");
                } else {
                    console.error("Cannot initialize FRONT VANTA Fog!");
                }
            };
            document.body.appendChild(vantaScript);
        };
        document.body.appendChild(threeScript);
    }, 500);
}

function switchMobileDesktop() {
    const mercierContainerDiv = document.getElementById('mercierContainer');
    if (!mercierContainerDiv) return;
    if (window.innerHeight > window.innerWidth) {
        mercierContainerDiv.style.width = '100%';
        mercierContainerDiv.style.height = '100%';
    } else {
        mercierContainerDiv.style.width = '';
        mercierContainerDiv.style.height = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    mainFunction();
    window.addEventListener('resize', switchMobileDesktop);
    galleryButton = document.getElementById("galleryButton");
    closeButton = document.getElementById("closeButton");
    topGalleryDisplay = document.getElementById("topGalleryDisplay");
    galleryButton.addEventListener("click", openGallery);
    closeButton.addEventListener("click", closeGallery);
});
