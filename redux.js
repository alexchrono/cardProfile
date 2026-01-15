// ===================== GLOBAL VARIABLES =====================
let statsButton;
let personalityButton;
let historyButton;
let encountersButton;
let oocButton;
let isMobile = false;

let statsButtonMobile;
let personalityButtonMobile;
let historyButtonMobile;
let encountersButtonMobile;
let oocButtonMobile;

let buttonList;
let clickedButton;
let clickedId;

let clickedButtonMobile;
let clickedIdMobile;

let previousButton;
let previousClickedId;

let previousButtonMobile;
let previousClickedIdMobile;

let galleryButton;
let closeButton;

let galleryButtonMobile;
let closeButtonMobile;

let topGalleryDisplay;
let topGalleryDisplayMobile;

let threeScript;
let vantaScript;
let bgTestCover;
let bgTestCoverFront;
let vantaBack;
let vantaFront;
let topNumberEl;

let pic1 = 'https://i.ibb.co/Q3jjbsCY/first-Up-G.webp';
let pic2 = 'https://i.ibb.co/ns3bfsWq/2nd-Up-G.jpg';
let pic3 = 'https://i.ibb.co/sd7h9qZK/third-Up-G.jpg';
let pic4;
let pic5;
let pic6;
let pic7;
let pic8;
let pic9;
let pic10;

const allPics = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10];

// ===================== MOBILE DETECTION =====================
function updateIsMobile() {
    isMobile = window.innerHeight > window.innerWidth;
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ===================== GALLERY FUNCTIONS =====================
function openGallery() {
    if (isMobile) {
        topGalleryDisplayMobile.style.visibility = "visible";
        requestAnimationFrame(() => {
            topGalleryDisplayMobile.style.opacity = "1";
        });
    } else {
        topGalleryDisplay.style.visibility = "visible";
        requestAnimationFrame(() => {
            topGalleryDisplay.style.opacity = "1";
        });
    }
}

function closeGallery() {
    if (isMobile) {
        topGalleryDisplayMobile.style.opacity = "0";
        setTimeout(() => {
            topGalleryDisplayMobile.style.visibility = "hidden";
        }, 1000);
    } else {
        topGalleryDisplay.style.opacity = "0";
        setTimeout(() => {
            topGalleryDisplay.style.visibility = "hidden";
        }, 1000);
    }
}

// ===================== TAB / BUTTON HANDLER =====================
function handleButtonClick(event) {

    const btn = event.currentTarget;
    const btnId = btn.id;

    const isGalleryButton =
        btnId === "galleryButton" ||
        btnId === "galleryButtonMobile";

    // DESKTOP: gallery opens ONLY, no tab state
    if (!isMobile && isGalleryButton) {
        openGallery();
        return;
    }

    // MOBILE: gallery participates in state
    if (isMobile && isGalleryButton) {
        previousButtonMobile = clickedButtonMobile;
        previousClickedIdMobile = clickedIdMobile;

        clickedButtonMobile = btn;
        clickedIdMobile = "gallery";

        if (previousButtonMobile) {
            previousButtonMobile.classList.remove("active");
            previousButtonMobile.classList.add("inactive");
        }

        btn.classList.remove("inactive");
        btn.classList.add("active");

        openGallery();
        return;
    }

    // NORMAL TAB FLOW (desktop + mobile)
    if (clickedButton && clickedId) {
        previousButton = clickedButton;
        previousClickedId = clickedId;
    }

    clickedButton = btn;

    clickedId = isMobile
        ? btnId.replace("ButtonMobile", "")
        : btnId.replace("Button", "");

    if (previousClickedId === clickedId) return;


// NARUTO WILL THIS WORK
      if (previousButton) {
        previousButton.classList.remove("active");
        previousButton.classList.add("inactive");
    } else {
        statsButton.classList.remove("active");
        statsButton.classList.add("inactive");
    }


    clickedButton.classList.remove("inactive");
    clickedButton.classList.add("active");

    let prevTab = previousClickedId
        ? document.getElementById(
            previousClickedId + (isMobile ? "TabMobile" : "Tab")
        )
        : document.getElementById(isMobile ? "statsTabMobile" : "statsTab");

    if (prevTab) {
        prevTab.style.opacity = "0";
        setTimeout(() => {
            prevTab.style.visibility = "hidden";
        }, 600);
    }

    let currTab = document.getElementById(
        clickedId + (isMobile ? "TabMobile" : "Tab")
    );

    if (currTab) {
        currTab.style.visibility = "visible";
        requestAnimationFrame(() => {
            currTab.style.opacity = "1";
        });
    }

    console.log(`Activated: ${clickedId}`);
}

// ===================== MAIN FUNCTION =====================
function mainFunction() {
    console.log("📌 mainFunction started");

    let statsTab;
    let mercierContainerDiv;

    if (isMobile) {
        statsTab = document.getElementById("statsTabMobile");
        mercierContainerDiv = document.getElementById("mercierContainer");

        statsButton = document.getElementById("statsButtonMobile");
        personalityButton = document.getElementById("personalityButtonMobile");
        historyButton = document.getElementById("historyButtonMobile");
        encountersButton = document.getElementById("encountersButtonMobile");
        oocButton = document.getElementById("oocButtonMobile");
        galleryButton = document.getElementById("galleryButtonMobile");
        topGalleryDisplayMobile = document.getElementById("topGalleryDisplayMobile");

        buttonList = [
            statsButton,
            personalityButton,
            historyButton,
            encountersButton,
            oocButton,
            galleryButton
        ];
    } else {
        statsTab = document.getElementById("statsTab");
        mercierContainerDiv = document.getElementById("mercierContainer");

        statsButton = document.getElementById("statsButton");
        personalityButton = document.getElementById("personalityButton");
        historyButton = document.getElementById("historyButton");
        encountersButton = document.getElementById("encountersButton");
        oocButton = document.getElementById("oocButton");
        galleryButton = document.getElementById("galleryButton");
        closeButton = document.getElementById("closeButton");
        topGalleryDisplay = document.getElementById("topGalleryDisplay");

        buttonList = [
            statsButton,
            personalityButton,
            historyButton,
            encountersButton,
            oocButton,
            galleryButton
        ];
    }

    if (statsTab) {
        statsTab.style.visibility = "visible";
        statsTab.style.opacity = "1";
    }

    if (!mercierContainerDiv) return;

    buttonList.forEach(btn => {
        if (btn) btn.addEventListener("click", handleButtonClick);
    });

    if (closeButton) closeButton.addEventListener("click", closeGallery);
}

// ===================== MOBILE / DESKTOP SWITCH =====================
async function switchMobileDesktop() {
    const wasMobile = isMobile;
    updateIsMobile();
    await wait(10);
    if (wasMobile === isMobile) return;
    mainFunction();
}

// ===================== DOCUMENT READY =====================
document.addEventListener('DOMContentLoaded', () => {
    updateIsMobile();
    mainFunction();
    window.addEventListener('resize', switchMobileDesktop);
});
